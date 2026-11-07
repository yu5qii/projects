# The Naked Truth — Ultra-Minimalist Anti-Echo Chamber News Reader

> A premium, typography-first news reader inspired by the dark minimalist design principles of **gilhuybrecht.com**. Engineered to pierce through media polarization, the application isolates undeniable consensus facts agreed upon by opposing publications, reveals partisan omissions, and features an interactive desktop scroll "unzipping" split-screen view powered by local quantized AI (**TinyLlama 1.1B**).

---

## Design System & Aesthetic (Inspired by Gil Huybrecht)

- **Pure Typography Structure:** Replaces boxes, drop shadows, and neon borders with razor-sharp typographic scale, generous whitespace, and subtle hairlines (`rgba(255, 255, 255, 0.08)`).
- **Deep Charcoal / Black Palette:** Deep `#080808` canvas, stark white high-contrast text (`#ffffff`), and calibrated greys (`#a1a1aa`, `#71717a`, `#52525b`) for secondary hierarchy and micro-metadata.
- **Subtle Micro-Interactions:** Smooth text color shifts and hairline expansions on hover rather than bulky containers.
- **Strictly No Tailwind CSS:** Scoped CSS Modules with SCSS (`sass`).

---

## Application Architecture

### Homepage (Global News Hub)
- **Top Lead Dispatch:** High-impact editorial headline, timestamp, category tag, and consensus pill indicating verified facts.
- **Curated Global Wire Grid:** Two-column editorial grid showcasing real-time global dispatches across Geopolitics, Climate, Technology, and Macroeconomics.
- **Subtle Hover States:** Pure typographic feedback and arrow translations (`transform: translate(3px, -3px)`).
- **Custom URL Inspector:** Minimalist drawer enabling users to paste and analyze any live news article URL.

### Article Detail Page (Dynamic Perspectives)
- **Centered AI Overview:** Distills core undeniable facts agreed upon by opposing sides, synthesized by the local quantized model with latency telemetry badges.
- **Desktop Scroll "Unzip" Behavior:**
  - As the user scrolls past the summary, **GSAP** seamlessly pulls apart the single-column summary into a **50/50 split-screen vertical layout**.
  - A central hairline seam tracks unzipping progress.
  - **Left Column:** Left-Leaning Perspective, editorial framing narrative, emphasized points, and omitted blindspots.
  - **Right Column:** Right-Leaning Perspective, editorial framing narrative, emphasized points, and omitted blindspots.
- **Source Transparency Metadata:** Subtly lists specific outlets consulted (*Sourced from: The Guardian, MSNBC* vs. *Sourced from: Fox News, Wall Street Journal*).
- **Mobile Viewport Behavior:** Automatically disables the split-screen on screens $\le$ 768px in favor of a sticky top tab navigation bar with three options: `"Left"`, `"AI Overview"`, and `"Right"`, with smooth crossfades.
- **Shareable Typographic Artifacts:** 1-click export button generates a 1200×1400px Retina social media card directly onto HTML5 Canvas with deep charcoal typography, instant PNG download.

---

## Local AI & Quantization Infrastructure

### TinyLlama 1.1B Quantized Service
- Located at [`backend/services/tinyllama_service.py`](file:///d:/CODE/projects/NEWS/backend/services/tinyllama_service.py).
- Implements 4-bit NormalFloat (`nf4`) and 8-bit quantization via **BitsAndBytes** and Hugging Face **Transformers**.
- Eliminates UI hanging with sub-200ms latency.
- Features resilient deterministic fallback synthesis when PyTorch CUDA is not present.

### Targeted LoRA Fine-Tuning Pipeline
- Located at [`backend/training/train_lora.py`](file:///d:/CODE/projects/NEWS/backend/training/train_lora.py).
- Uses `peft`, `trl`, and `bitsandbytes` to fine-tune `TinyLlama/TinyLlama-1.1B-Chat-v1.0` on contrastive news pairs.
- Trained to strictly isolate consensus facts and partisan omissions without adjectives or editorial rhetoric.
- Training dataset provided in [`backend/training/dataset_contrastive_news.jsonl`](file:///d:/CODE/projects/NEWS/backend/training/dataset_contrastive_news.jsonl).

---

## Quickstart

### 1. Frontend (Next.js App Router)
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 2. Backend (FastAPI + Local AI)
```bash
# In backend directory
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```
Interactive API documentation available at [http://localhost:8000/docs](http://localhost:8000/docs).
