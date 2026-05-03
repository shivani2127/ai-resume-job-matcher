from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_match_score(resume_skills, job_skills):
    if not job_skills:
        return 0

    matched_skills = set(resume_skills) & set(job_skills)
    score = (len(matched_skills) / len(job_skills)) * 10

    return round(score, 2)