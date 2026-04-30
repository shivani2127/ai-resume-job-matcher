from fastapi import FastAPI, UploadFile, File, Form
from app.services.matcher_service import calculate_match_score
from app.services.skill_service import get_missing_skills
from app.utils.pdf_parser import extract_text_from_pdf
import shutil
import os

app = FastAPI()

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.get("/")
def home():
    return {"message": "AI Resume Job Matcher API is running"}


@app.post("/match")
async def match_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    file_path = f"{UPLOAD_FOLDER}/{resume.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    resume_text = extract_text_from_pdf(file_path)
    score = calculate_match_score(resume_text, job_description)

    resume_skills, job_skills, missing = get_missing_skills(
        resume_text,
        job_description
    )

    return {
        "match_score": score,
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "missing_skills": missing,
        "suggestions": [
            f"Add or improve this skill: {skill}" for skill in missing
        ]
    }