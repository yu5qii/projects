# The Naked Truth (Anti-Echo Chamber News Reader)

> An interactive, kinetic 3D WebGL web application engineered to pierce through media polarization. It analyzes any news article URL, locates counterpart coverage from the opposite political bias, and uses AI to distill undeniable consensus facts while exposing blindspots and omitted facts.

---

## 🎯 Architecture Overview

### Frontend Architecture
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** CSS Modules with SCSS (Sass) — Strictly no Tailwind
- **3D WebGL Engine:** Three.js, React Three Fiber (R3F), and `@react-three/drei`
- **Animations & Physics:** GSAP (quickTo mouse lerping, kinetic slam-in animations)
- **State Management:** Zustand (`src/lib/store.ts`) bridging DOM overlay actions with 3D Canvas camera/shard animations

```
src/
├── app/
│   ├── layout.tsx                # Master layout with Canvas / DOM split & scanlines
│   └── page.tsx                  # Main single-page interactive reader
├── components/
│   ├── canvas/                   # R3F WebGL Components ONLY
│   │   ├── GlassShards.tsx       # Chaotic echo-chamber shards assembling into truth crystal
│   │   ├── MediaNoiseParticles.tsx # Ambient media static particle cloud
│   │   └── Scene.tsx             # Canvas wrapper, lights, PerformanceMonitor & camera rig
│   └── dom/                      # React HTML / SCSS Components ONLY
│       ├── AnalysisStepTracker.tsx # Dynamic kinetic progress scanner
│       ├── ConsensusDashboard.tsx  # Three-column fact matrix & source comparison
│       ├── Header.tsx            # Cyber header with live engine status
│       ├── LensCursor.tsx        # GSAP-powered custom "Lens of Truth" cursor
│       └── UrlInputForm.tsx      # URL submission form with Gen-Z quick presets
├── lib/
│   └── store.ts                  # Zustand state synchronization
└── styles/
    └── globals.scss              # Cyberpunk high-contrast dark theme & resets
```

### Backend Architecture
- **Framework:** FastAPI (Python)
- **Scraping Engine:** Trafilatura & BeautifulSoup4
- **Database & Cache:** SQLAlchemy (PostgreSQL) & Redis
- **AI Engine:** LangChain strictly instructed to return factual JSON without adjectives or opinion framing

```
backend/
├── api/
│   └── routes/
│       └── analysis.py           # Analysis controllers & endpoints
├── models/
│   ├── db_models.py              # SQLAlchemy database tables
│   └── schemas.py                # Pydantic schemas
├── services/
│   ├── bias_engine.py            # Publisher bias & domain scoring
│   ├── llm_processor.py          # Neutral fact-extraction prompt engine
│   └── scraper.py                # Trafilatura / BS4 scraping service
├── main.py                       # FastAPI application entrypoint
└── requirements.txt              # Python dependencies
```

---

## 🚀 Getting Started

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Run Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend Setup
```bash
# Create and activate python virtual environment
python -m venv venv
venv\Scripts\activate   # Windows
# or: source venv/bin/activate  # macOS/Linux

# Install backend dependencies
pip install -r backend/requirements.txt

# Run FastAPI server
uvicorn backend.main:app --reload --port 8000
```
API Documentation will be accessible at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 🕹️ Interactive Features
1. **The "Lens of Truth" Cursor:** The default OS cursor is hidden. A GSAP-powered floating orb cursor follows the pointer. Hovering over biased cards causes jitter and warning chromatic split; hovering over verified consensus facts clarifies and magnifies the facts.
2. **Kinetic Camera & Shard Assembly:** Pasting a URL or clicking a preset triggers `isAnalyzing: true`. The 3D camera zooms in dynamically, and the chaotic glass shards assemble into an aligned geometric truth crystal.
3. **Three-Column Consensus Dashboard:** Displays:
   - **Omitted by Source A:** Verified facts mentioned by the opposing source but omitted by Source A.
   - **The Consensus:** 4–7 undeniable bullet-point facts present in BOTH publications.
   - **Omitted by Source B:** Facts present in Source A but ignored by Source B.
