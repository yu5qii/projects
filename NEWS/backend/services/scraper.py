import logging
from typing import Optional, Dict, Any
import trafilatura
from bs4 import BeautifulSoup
import httpx

logger = logging.getLogger(__name__)

class ScraperService:
    @staticmethod
    def extract_article(url: str) -> Optional[Dict[str, Any]]:
        """
        Scrapes and extracts clean main-text and metadata from news URL
        using trafilatura with BeautifulSoup fallback.
        """
        try:
            downloaded = trafilatura.fetch_url(url)
            if not downloaded:
                # Fallback to direct httpx request
                headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) NakedTruth/1.0"}
                resp = httpx.get(url, headers=headers, timeout=10.0, follow_redirects=True)
                downloaded = resp.text

            text = trafilatura.extract(downloaded, include_comments=False, include_tables=False)
            metadata = trafilatura.extract_metadata(downloaded)

            title = metadata.title if metadata and metadata.title else "News Report"
            author = metadata.author if metadata and metadata.author else "Unknown"

            if not text:
                soup = BeautifulSoup(downloaded, "html.parser")
                paragraphs = [p.get_text() for p in soup.find_all("p")]
                text = "\n".join(paragraphs)

            return {
                "title": title,
                "author": author,
                "text": text,
                "url": url,
            }
        except Exception as e:
            logger.error(f"Error scraping {url}: {e}")
            return None
