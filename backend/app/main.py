from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, applications, stats
from .database import engine
from . import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="JobTrackr API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",        # Docker nginx (port 80)
        "http://localhost:80",     # explicit port form
        "http://localhost:3000",   # Vite dev server
        "http://localhost:5173",   # Vite alternative port
    ],
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