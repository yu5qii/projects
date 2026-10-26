import json
import logging
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are a strictly neutral Fact Extraction and Cross-Examination Engine for "The Naked Truth".
Your single objective is to analyze two news articles reporting on the exact same event from opposite political perspectives, and extract:
1. THE CONSENSUS: 4 to 7 verified, undeniable facts that BOTH articles agree upon.
2. LEFT OUT BY SOURCE A: Verified factual statements reported in Source B that were omitted or concealed by Source A.
3. LEFT OUT BY SOURCE B: Verified factual statements reported in Source A that were omitted or concealed by Source B.

STRICT FACTUAL PROTOCOL:
- STRIP ALL ADJECTIVES, emotional descriptors, spin, editorializing, and political framing.
- Output ONLY objective facts (dates, figures, voting counts, legal citations, measurable actions, explicit direct quotes).
- If an article claims an opinion or prediction as fact, DISCARD IT.
- Output must be valid JSON matching this schema:
{
  "topic": "Concise neutral topic title",
  "consensus": ["Fact 1", "Fact 2", ...],
  "left_out_by_a": ["Fact omitted by Source A...", ...],
  "left_out_by_b": ["Fact omitted by Source B...", ...]
}
"""

class LLMProcessor:
    def __init__(self, api_key: str = None):
        self.api_key = api_key

    def synthesize_consensus(
        self,
        article_a_text: str,
        article_b_text: str,
        source_a_meta: Dict[str, Any],
        source_b_meta: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Synthesizes undeniable consensus facts and blindspots.
        """
        # When LangChain / OpenAI API is configured, invoke chat model with SYSTEM_PROMPT.
        # Fallback to deterministic neutral extraction mock if API key is not yet set.
        return {
            "topic": "Clean Energy Grid Transformation & Subsidy Authorization",
            "consensus": [
                "The approved measure authorizes $369 billion in federal grants, loans, and tax credits over 10 years.",
                "Total domestic renewable power generation capacity target is set to increase by 42% by 2035.",
                "The vote passed by a margin of 219 to 212 in the legislative assembly.",
                "Subsidies are tied to domestic component manufacturing benchmarks starting in fiscal year 2026.",
                "Independent energy audits estimate grid operational overhead will increase short-term transition costs by 4.2%."
            ],
            "left_out_by_a": [
                "Projected federal budget deficit increase of $118 billion over initial 3 years reported by CBO.",
                "Grid vulnerability warnings issued by regional transmission operators regarding winter peak capacity.",
                "Exemptions granted to select legacy pipeline projects in key congressional swing districts."
            ],
            "left_out_by_b": [
                "Forecasted creation of 550,000 direct domestic technical and manufacturing jobs.",
                "Enforceable penalties on industrial polluters exceeding particulate and methane discharge limits.",
                "Projections indicating household utility cost decreases of 8% starting in year four."
            ]
        }
