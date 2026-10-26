from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class ArticleAnalysisRecord(Base):
    __tablename__ = "article_analyses"

    id = Column(Integer, primary_key=True, index=True)
    submitted_url = Column(String(1024), nullable=False, index=True)
    topic = Column(String(256), nullable=False)
    source_a_meta = Column(JSON, nullable=False)
    source_b_meta = Column(JSON, nullable=False)
    consensus_facts = Column(JSON, nullable=False)
    left_out_by_a = Column(JSON, nullable=False)
    left_out_by_b = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
