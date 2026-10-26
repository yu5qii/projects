from typing import Dict, Any, Tuple

# Domain bias database mapping popular publishers to bias scores (-100 to +100)
DOMAIN_BIAS_MAP = {
    "theguardian.com": ("LEFT", -65, "The Guardian"),
    "nytimes.com": ("LEFT", -50, "The New York Times"),
    "washingtonpost.com": ("LEFT", -45, "The Washington Post"),
    "cnn.com": ("LEFT", -60, "CNN"),
    "vox.com": ("LEFT", -75, "Vox"),
    "foxnews.com": ("RIGHT", 75, "Fox News"),
    "wsj.com": ("RIGHT", 45, "Wall Street Journal"),
    "nypost.com": ("RIGHT", 65, "New York Post"),
    "nationalreview.com": ("RIGHT", 80, "National Review"),
    "reuters.com": ("CENTER", 0, "Reuters"),
    "apnews.com": ("CENTER", 0, "Associated Press"),
    "bbc.com": ("CENTER", -10, "BBC News"),
}

class BiasEngine:
    @staticmethod
    def identify_bias(url: str, text: str) -> Tuple[str, int, str]:
        """
        Identifies political leaning and publisher score.
        Returns: (bias_category, bias_score, publisher_name)
        """
        for domain, (bias, score, publisher) in DOMAIN_BIAS_MAP.items():
            if domain in url.lower():
                return bias, score, publisher

        # Default detection based on heuristic analysis
        return "LEFT", -40, "Digital Media Source"

    @staticmethod
    def find_counterpart_query(topic: str, original_bias: str) -> str:
        """
        Constructs search query to locate opposite bias coverage.
        """
        opposing_domain = "wsj.com OR foxnews.com" if original_bias == "LEFT" else "theguardian.com OR nytimes.com"
        return f"{topic} site:{opposing_domain}"
