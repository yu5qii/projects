"""
The Naked Truth — Targeted LoRA Fine-Tuning Workflow
Fine-tunes TinyLlama 1.1B on contrasting news article pairs to explicitly isolate
shared facts versus partisan omissions using QLoRA (4-bit PEFT).
"""

import os
import json
import argparse
from typing import Dict, Any

def create_prompt(sample: Dict[str, Any]) -> str:
    """Formats a training sample into the TinyLlama Chat template."""
    return f"""<|system|>
You are a strictly neutral Fact Extraction and Cross-Examination Engine for "The Naked Truth".
Your task is to analyze two contrasting news articles on the exact same event and extract:
1. THE CONSENSUS: verified facts agreed upon by BOTH publications.
2. LEFT OUT BY SOURCE A: Facts reported by Source B that Source A omitted.
3. LEFT OUT BY SOURCE B: Facts reported by Source A that Source B omitted.
Strip all adjectives and emotional spin. Return valid JSON only.</s>
<|user|>
Article A:
{sample['article_a']}

Article B:
{sample['article_b']}

Extract consensus facts and omissions in JSON.</s>
<|assistant|>
{sample['output']}</s>"""

def train(
    dataset_path: str = "dataset_contrastive_news.jsonl",
    output_dir: str = "./lora_adapter",
    model_id: str = "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    epochs: int = 3,
    batch_size: int = 2,
    learning_rate: float = 2e-4,
):
    try:
        import torch
        from datasets import load_dataset
        from transformers import (
            AutoModelForCausalLM,
            AutoTokenizer,
            BitsAndBytesConfig,
            TrainingArguments,
        )
        from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training, TaskType
        from trl import SFTTrainer
    except ImportError as e:
        print(f"[!] Required ML libraries not found: {e}")
        print("To run LoRA fine-tuning, install: pip install torch transformers datasets peft trl bitsandbytes accelerate")
        return

    print(f"[*] Loading dataset from {dataset_path}...")
    dataset = load_dataset("json", data_files=dataset_path, split="train")

    print(f"[*] Initializing tokenizer and base model {model_id}...")
    tokenizer = AutoTokenizer.from_pretrained(model_id, use_fast=True)
    tokenizer.pad_token = tokenizer.eos_token

    # 4-bit QLoRA Quantization Configuration
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.float16,
        bnb_4bit_use_double_quant=True,
    )

    base_model = AutoModelForCausalLM.from_pretrained(
        model_id,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=True,
    )

    base_model = prepare_model_for_kbit_training(base_model)

    # Targeted LoRA Adapter Configuration
    lora_config = LoraConfig(
        r=16,
        lora_alpha=32,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type=TaskType.CAUSAL_LM,
    )

    model = get_peft_model(base_model, lora_config)
    model.print_trainable_parameters()

    # Training Arguments
    training_args = TrainingArguments(
        output_dir=output_dir,
        num_train_epochs=epochs,
        per_device_train_batch_size=batch_size,
        gradient_accumulation_steps=4,
        warmup_ratio=0.05,
        learning_rate=learning_rate,
        fp16=True,
        logging_steps=5,
        save_strategy="epoch",
        optim="paged_adamw_8bit",
        lr_scheduler_type="cosine",
        report_to="none",
    )

    trainer = SFTTrainer(
        model=model,
        train_dataset=dataset,
        formatting_func=lambda s: [create_prompt(ex) for ex in s],
        max_seq_length=1536,
        tokenizer=tokenizer,
        args=training_args,
    )

    print("[*] Starting targeted LoRA fine-tuning...")
    trainer.train()

    print(f"[*] Saving fine-tuned LoRA adapter to {output_dir}...")
    model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)
    print("[✓] LoRA fine-tuning complete. Ready to serve via TinyLlamaService.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="LoRA Fine-Tuning for Contrastive News Extraction")
    parser.add_argument("--dataset", default="dataset_contrastive_news.jsonl", help="Path to contrastive news JSONL")
    parser.add_argument("--output_dir", default="./lora_adapter", help="Output directory for LoRA adapter")
    parser.add_argument("--epochs", type=int, default=3, help="Training epochs")
    parser.add_argument("--batch_size", type=int, default=2, help="Batch size per device")
    parser.add_argument("--lr", type=float, default=2e-4, help="Learning rate")

    args = parser.parse_args()
    train(
        dataset_path=args.dataset,
        output_dir=args.output_dir,
        epochs=args.epochs,
        batch_size=args.batch_size,
        learning_rate=args.lr,
    )
