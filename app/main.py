from fastapi import FastAPI
from app.routes.match import router as match_router

app = FastAPI(
    title="AI Resume Job Matcher",
    description="API to match resume with job description",
    version="1.0.0"
)

# Include routes
app.include_router(match_router)


# Home route (health check)
@app.get("/")
def home():
    return {"message": "AI Resume Job Matcher API is running 🚀"}