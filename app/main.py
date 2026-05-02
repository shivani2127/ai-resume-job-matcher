from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.match import router as match_router

app = FastAPI(
    title="AI Resume Job Matcher",
    description="API to match resume with job description",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(match_router)

@app.get("/")
def home():
    return {"message": "AI Resume Job Matcher API is running 🚀"}