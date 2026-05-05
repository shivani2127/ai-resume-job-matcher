import os
import json
import google.generativeai as genai



def get_ai_resume_analysis(resume_text: str, job_description: str):
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return {
            "ai_summary": "Gemini API key not configured.",
            "ai_recommendations": []
        }

    genai.configure(api_key=api_key)

    model = genai.GenerativeModel("gemini-2.5-flash")

    prompt = f"""
You are an expert technical recruiter.

Compare this resume with the job description.

Return ONLY valid JSON with:
{{
  "ai_summary": "short summary",
  "ai_recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}}

Resume:
{resume_text[:5000]}

Job Description:
{job_description[:5000]}
"""

    response = model.generate_content(
        contents=prompt
    )

    try:
        text = response.text.strip()

        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception:
        return {
            "ai_summary": response.text[:200],
            "ai_recommendations": []
        }