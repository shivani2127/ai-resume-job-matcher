SKILLS = [
    "python", "java", "javascript", "c++",
    "sql", "mysql", "postgresql", "mongodb",
    "fastapi", "django", "flask", "node.js",
    "react", "html", "css",
    "machine learning", "deep learning", "tensorflow", "pytorch",
    "pandas", "numpy", "scikit-learn",
    "aws", "docker", "git",
    "rest api"
]

def extract_skills(text):
    text = text.lower()
    found_skills = []

    for skill in SKILLS:
        if skill in text:
            found_skills.append(skill)

    return found_skills


def get_missing_skills(resume_text, job_description):
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    missing = []

    for skill in job_skills:
        if skill not in resume_skills:
            missing.append(skill)

    return resume_skills, job_skills, missing