"""
Robust main.py for RepurposeScore API (cleaned encoding + minor fixes)

This file contains:
- A FastAPI-based server path (used when FastAPI & dependencies import correctly).
- A fallback lightweight HTTP server (using Python's stdlib http.server) if the runtime is missing the `ssl` module or FastAPI can't be imported.
- Clear instructions for running in both modes.
- Simple, testable scoring logic (compute_score_and_evidence) with builtin test cases that run when executed as a script.

Why this change was made:
- Fixed character encoding issues (replaced corrupted sequences with hyphens/em-dashes).
- Removed redundant imports and improved small logic/validation.
- Improved fallback server by adding CORS headers and stricter payload validation.

How to run:
- Preferred (if your environment has FastAPI & uvicorn and supports ssl):
  1. python -m venv venv
  2. source venv/bin/activate   # Windows: venv\\Scripts\\activate
  3. pip install fastapi uvicorn pydantic
  4. uvicorn main:app --reload --port 8000

- Fallback (if FastAPI fails to import due to missing ssl or other dependency issues):
  Simply run:
    python main.py
  This will run a lightweight built-in HTTP server on port 8000 (no SSL) and also execute builtin tests and examples on the console.

Endpoints (both modes):
POST /score  - accepts JSON {"molecule": "DrugName", "disease": "DiseaseName"}
GET  /health - returns {"status": "ok"}

Notes:
- This is still a single-file app for convenience. For production split into modules, add authentication, logging, and proper error handling, and run behind a production server with HTTPS.
- analysisId is a UUID4 hex string.
"""

from typing import List, Tuple
from uuid import uuid4
import json
import sys
import traceback

# ---------- Core logic (unchanged, testable) ----------
DUMMY_TRIALS = [
    {"registryId": "NCT0001", "molecule": "Metformin", "disease": "Alzheimer", "status": "Completed", "phase": "Phase-3", "summary": "Reduced cognitive decline in small cohort."},
    {"registryId": "NCT0002", "molecule": "Hydroxychloroquine", "disease": "COVID-19", "status": "Completed", "phase": "Phase-3", "summary": "No significant benefit observed."},
    {"registryId": "NCT0003", "molecule": "Metformin", "disease": "Parkinson", "status": "Ongoing", "phase": "Phase-2", "summary": "Early biomarker improvement."},
    {"registryId": "NCT0004", "molecule": "Ivermectin", "disease": "COVID-19", "status": "Ongoing", "phase": "Phase-2", "summary": "Recruiting."},
    {"registryId": "NCT0005", "molecule": "Metformin", "disease": "Alzheimer", "status": "Ongoing", "phase": "Phase-2", "summary": "Repurposing study - metabolic pathway targets."},
]

DUMMY_COMPANIES = [
    {"company": "NeuroGenix", "trialId": "NCT9001", "disease": "Alzheimer", "molecule": "NGX-100"},
    {"company": "GloboPharm", "trialId": "NCT9002", "disease": "Alzheimer", "molecule": "GXP-201"},
    {"company": "RepurCo", "trialId": "NCT9003", "disease": "Parkinson", "molecule": "RPR-77"},
]

positive_words = ["reduced", "improvement", "benefit", "positive", "biomarker"]


def compute_score_and_evidence(molecule: str, disease: str) -> Tuple[float, str, List[str], List[dict], List[dict]]:
    """
    Compute a dummy repurposing score and return (score, verdict, highlights, trials, competitors).
    Rules (simple & explainable):
      - base prior 0.2
      - each matching trial (by molecule OR disease) adds +0.15, capped at +0.5
      - Phase contributions: Phase-3 +0.2, Phase-2 +0.08, Phase-1 +0.03
      - Completed trials +0.03
      - Competitors for the disease penalize score
      - Positive words in trial summaries add small boosts (cumulative per trial)
    """
    base_score = 0.2
    evidence = []

    matching_trials = []
    for t in DUMMY_TRIALS:
        if (t["molecule"].lower() == molecule.lower()) or (t["disease"].lower() == disease.lower()):
            matching_trials.append(t)

    if matching_trials:
        add_from_trials = min(0.15 * len(matching_trials), 0.5)
        base_score += add_from_trials
        evidence.append(f"Found {len(matching_trials)} related trial(s) in registry supporting investigation.")
    else:
        evidence.append("No existing trials found that directly link the molecule and disease.")

    phase_bonus = 0.0
    for t in matching_trials:
        ph = t.get("phase", "").lower()
        status = t.get("status", "").lower()
        if "phase-3" in ph:
            phase_bonus += 0.2
            evidence.append(f"Phase-3 trial found (registry {t['registryId']}) - stronger clinical evidence.")
        elif "phase-2" in ph:
            phase_bonus += 0.08
            evidence.append(f"Phase-2 trial found (registry {t['registryId']}) - moderate evidence.")
        elif "phase-1" in ph:
            phase_bonus += 0.03
        if "completed" in status:
            phase_bonus += 0.03

    base_score += phase_bonus

    competitors_for_disease = [c for c in DUMMY_COMPANIES if c["disease"].lower() == disease.lower()]
    competitor_penalty = 0.0
    if competitors_for_disease:
        n = len(competitors_for_disease)
        if n == 1:
            competitor_penalty = -0.03
        elif n == 2:
            competitor_penalty = -0.06
        else:
            competitor_penalty = -0.12
        evidence.append(f"{n} competitor program(s) target the same disease - may reduce repurposing attractiveness.")

    base_score += competitor_penalty

    for t in matching_trials:
        s = t.get("summary", "").lower()
        # cumulative: count every positive word match once per trial
        matched_any = False
        for pw in positive_words:
            if pw in s:
                base_score += 0.03
                evidence.append(f"Trial {t['registryId']} summary contains positive signal: '{pw}'.")
                matched_any = True
        # matched_any is not used further, but retained for clarity

    score = max(0.0, min(1.0, round(base_score, 3)))

    if score >= 0.75:
        verdict = "High potential - recommend further development"
    elif score >= 0.45:
        verdict = "Moderate potential - further investigation warranted"
    else:
        verdict = "Low potential - deprioritize"

    # Build highlights (2-5 bullets)
    seen = set()
    highlights = []
    for e in evidence:
        if e not in seen:
            highlights.append(e)
            seen.add(e)
        if len(highlights) >= 5:
            break
    if not highlights:
        highlights = ["No direct evidence found in trial registry."]

    returned_trials = []
    for t in matching_trials[:5]:
        returned_trials.append({
            "registryId": t["registryId"],
            "status": t["status"],
            "phase": t["phase"],
            "summary": t["summary"],
        })

    returned_competitors = []
    comps = [c for c in DUMMY_COMPANIES if c["disease"].lower() == disease.lower()]
    if len(comps) < 3:
        comps = comps + [c for c in DUMMY_COMPANIES if c["disease"].lower() != disease.lower()]
    for c in comps[:3]:
        returned_competitors.append({
            "company": c["company"],
            "trialId": c["trialId"],
            "note": f"Sponsor of {c.get('molecule', 'investigational compound')} for {c['disease']}",
        })

    return score, verdict, highlights, returned_trials, returned_competitors


# ---------- Attempt to import FastAPI & uvicorn, but handle failures gracefully ----------
USE_FASTAPI = False

try:
    # Attempt to import ssl first to detect environments lacking it
    # Note: ssl may be unavailable in some sandboxed runtimes; catching broad exceptions here
    import ssl  # ensure environment supports SSL
    try:
        from fastapi import FastAPI, HTTPException
        from pydantic import BaseModel, Field
        from fastapi.middleware.cors import CORSMiddleware
        USE_FASTAPI = True
    except Exception:
        USE_FASTAPI = False
except Exception:
    # ssl import failed -> likely sandboxed environment. We'll fall back.
    USE_FASTAPI = False


if USE_FASTAPI:
    # Define Pydantic models and FastAPI app
    from fastapi import FastAPI, HTTPException
    from pydantic import BaseModel, Field
    from fastapi.middleware.cors import CORSMiddleware
    from typing import List

    app = FastAPI(title="RepurposeScore API",
                  description="Dummy microservice that scores drug repurposing potential",
                  version="0.1")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    class ScoreRequest(BaseModel):
        molecule: str = Field(..., example="Metformin")
        disease: str = Field(..., example="Alzheimer")

    class Trial(BaseModel):
        registryId: str
        status: str
        phase: str
        summary: str

    class Competitor(BaseModel):
        company: str
        trialId: str
        note: str

    class ScoreResponse(BaseModel):
        molecule: str
        disease: str
        repurposeScore: float
        overallVerdict: str
        analysisId: str
        trials: List[Trial]
        competitors: List[Competitor]
        evidenceHighlights: List[str]

    @app.post("/score", response_model=ScoreResponse)
    def score_endpoint(req: ScoreRequest):
        # stricter validation for empty / whitespace-only strings
        if not req.molecule or not req.molecule.strip() or not req.disease or not req.disease.strip():
            raise HTTPException(status_code=400, detail="molecule and disease are required non-empty strings")

        score, verdict, highlights, trials, competitors = compute_score_and_evidence(req.molecule, req.disease)

        response = {
            "molecule": req.molecule,
            "disease": req.disease,
            "repurposeScore": score,
            "overallVerdict": verdict,
            "analysisId": uuid4().hex,
            "trials": trials,
            "competitors": competitors,
            "evidenceHighlights": highlights,
        }

        return response

    @app.get("/health")
    def health():
        return {"status": "ok"}


# ---------- Fallback: simple HTTP server if FastAPI unavailable ----------
else:
    from http.server import BaseHTTPRequestHandler, HTTPServer
    from urllib.parse import urlparse

    class SimpleHandler(BaseHTTPRequestHandler):
        def _set_headers(self, code=200, ct="application/json"):
            self.send_response(code)
            self.send_header('Content-type', ct)
            # Add CORS headers so frontends/postman can call the fallback server
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

        def do_OPTIONS(self):
            self._set_headers(200)

        def do_GET(self):
            parsed = urlparse(self.path)
            if parsed.path == '/health':
                self._set_headers(200)
                self.wfile.write(json.dumps({"status": "ok"}).encode())
                return
            # default
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "not found"}).encode())

        def do_POST(self):
            parsed = urlparse(self.path)
            if parsed.path != '/score':
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "not found"}).encode())
                return
            length = int(self.headers.get('Content-Length', 0))
            raw = self.rfile.read(length).decode('utf-8')
            try:
                payload = json.loads(raw)
                molecule = payload.get('molecule')
                disease = payload.get('disease')
                if (not molecule) or (not isinstance(molecule, str)) or (not molecule.strip()):
                    raise ValueError('molecule is required and must be a non-empty string')
                if (not disease) or (not isinstance(disease, str)) or (not disease.strip()):
                    raise ValueError('disease is required and must be a non-empty string')
            except Exception as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": str(e)}).encode())
                return

            score, verdict, highlights, trials, competitors = compute_score_and_evidence(molecule, disease)
            response = {
                "molecule": molecule,
                "disease": disease,
                "repurposeScore": score,
                "overallVerdict": verdict,
                "analysisId": uuid4().hex,
                "trials": trials,
                "competitors": competitors,
                "evidenceHighlights": highlights,
            }
            self._set_headers(200)
            self.wfile.write(json.dumps(response).encode())

    def run_fallback_server(port=8000):
        print("FastAPI unavailable or ssl missing. Running fallback HTTP server on port {}".format(port))
        server_address = ('', port)
        httpd = HTTPServer(server_address, SimpleHandler)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('Shutting down fallback server')
            httpd.server_close()


# ---------- Builtin tests / CLI mode ----------

def run_tests():
    tests = [
        ("Metformin", "Alzheimer"),
        ("Ivermectin", "COVID-19"),
        ("UnknownDrug", "RareDisease"),
        ("Metformin", "Parkinson"),
    ]
    print("Running builtin compute tests:\n")
    for mol, dis in tests:
        score, verdict, highlights, trials, competitors = compute_score_and_evidence(mol, dis)
        out = {
            "molecule": mol,
            "disease": dis,
            "repurposeScore": score,
            "overallVerdict": verdict,
            "analysisId": uuid4().hex,
            "trials": trials,
            "competitors": competitors,
            "evidenceHighlights": highlights,
        }
        print(json.dumps(out, indent=2))
        print('-' * 60)


if __name__ == '__main__':
    # If FastAPI is available, start uvicorn if invoked directly (but only if uvicorn is installed).
    if USE_FASTAPI:
        try:
            import uvicorn
            print("Starting FastAPI app with uvicorn on http://0.0.0.0:8000 (use Ctrl+C to stop)")
            uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
        except Exception:
            print("FastAPI available but uvicorn not installed or failed to start. Falling back to CLI tests.")
            traceback.print_exc()
            run_tests()
    else:
        # Run tests and start fallback server
        run_tests()
        try:
            run_fallback_server(8000)
        except Exception:
            print("Unable to start fallback server in this environment.")
            traceback.print_exc()
