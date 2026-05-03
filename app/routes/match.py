from fastapi import APIRouter, UploadFile, File, Form
from app.services.matcher_service import calculate_match_score
from app.services.skill_service import get_missing_skills
from app.utils.pdf_parser import extract_text_from_pdf

router = APIRouter()

@router.post("/match")
async def match_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    contents = await resume.read()

    with open("temp.pdf", "wb") as f:
        f.write(contents)

    text = extract_text_from_pdf("temp.pdf")

    resume_skills, job_skills, missing = get_missing_skills(text, job_description)

    score = calculate_match_score(resume_skills, job_skills)
    return {
    "match_score": score,
    "resume_skills": resume_skills,
    "job_skills": job_skills,
    "missing_skills": missing
}