from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.routes.analysis import router as analysis_router

app = FastAPI(
    title="The Naked Truth - Anti-Echo Chamber News Engine",
    description="Cross-examines polarizing news coverage and isolates consensus facts without media spin.",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "online", "service": "The Naked Truth Backend"}
