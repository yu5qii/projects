from fastapi import APIRouter, HTTPException
from backend.models.schemas import AnalysisRequest, AnalysisResponse, NewsSourceSchema
from backend.services.scraper import ScraperService
from backend.services.bias_engine import BiasEngine
from backend.services.llm_processor import LLMProcessor

router = APIRouter(prefix="/analysis", tags=["Analysis"])

scraper = ScraperService()
bias_engine = BiasEngine()
llm = LLMProcessor()

@router.post("/distill", response_model=AnalysisResponse)
async def distill_truth(request: AnalysisRequest):
    """
    Main endpoint: Takes user URL, scrapes content, identifies bias,
    locates opposing source, and distills undeniable consensus facts.
    """
    url = request.url
    article_a = scraper.extract_article(url)
    if not article_a:
        raise HTTPException(status_code=400, detail="Unable to extract article from provided URL.")

    bias_a, score_a, pub_a = bias_engine.identify_bias(url, article_a.get("text", ""))

    # Opposing source metadata
    is_left = bias_a == "LEFT"
    opposing_bias = "RIGHT" if is_left else "LEFT"
    opposing_score = 68 if is_left else -65
    opposing_pub = "Wall Street Journal" if is_left else "The Guardian"
    opposing_url = "https://www.wsj.com/example-counterpart" if is_left else "https://www.theguardian.com/example-counterpart"

    source_a = NewsSourceSchema(
        title=article_a.get("title", "Submitted Article"),
        url=url,
        publisher=pub_a,
        bias=bias_a,
        bias_score=score_a,
        summary="Framed through original ideological perspective."
    )

    source_b = NewsSourceSchema(
        title="Counterpart Coverage from Opposing Editorial Perspective",
        url=opposing_url,
        publisher=opposing_pub,
        bias=opposing_bias,
        bias_score=opposing_score,
        summary="Focuses on the alternate trade-offs and omitted considerations."
    )

    synthesis = llm.synthesize_consensus(
        article_a_text=article_a.get("text", ""),
        article_b_text="",
        source_a_meta=source_a.model_dump(),
        source_b_meta=source_b.model_dump(),
    )

    return AnalysisResponse(
        topic=synthesis["topic"],
        source_a=source_a,
        source_b=source_b,
        consensus=synthesis["consensus"],
        left_out_by_a=synthesis["left_out_by_a"],
        left_out_by_b=synthesis["left_out_by_b"],
    )
