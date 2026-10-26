from typing import List, Literal, Optional
from pydantic import BaseModel, HttpUrl, Field

class AnalysisRequest(BaseModel):
    url: str = Field(..., description="The URL of the news article to analyze")

class NewsSourceSchema(BaseModel):
    title: str
    url: str
    publisher: str
    bias: Literal["LEFT", "RIGHT", "CENTER"]
    bias_score: int = Field(..., ge=-100, le=100, description="-100 for far-left to +100 for far-right")
    summary: str

class AnalysisResponse(BaseModel):
    topic: str
    source_a: NewsSourceSchema
    source_b: NewsSourceSchema
    consensus: List[str] = Field(..., description="4-7 undeniable bullet-point facts present in BOTH articles")
    left_out_by_a: List[str] = Field(..., description="Facts present in Source B but omitted by Source A")
    left_out_by_b: List[str] = Field(..., description="Facts present in Source A but omitted by Source B")
