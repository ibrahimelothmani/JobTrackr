from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, applications, stats

app = FastAPI(title="JobTrackr API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(applications.router)
app.include_router(stats.router)

@app.get("/health")
def health():
    return {"status": "ok"}