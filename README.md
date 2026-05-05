# 🚀 AI Resume Job Matcher

AI-powered Resume Matcher using **FastAPI, React, and Gemini API** that analyzes resumes against job descriptions and provides intelligent insights.

---

## 🌐 Live Demo
Frontend: https://ai-resume-job-matcher-xi.vercel.app  
Backend: https://ai-resume-job-matcher-1-uuc0.onrender.com  

---

## 🔥 Features

- 📄 Extracts text from PDF resumes
- 🎯 Matches resume with job description
- 📊 Calculates match score (%)
- 🧠 Identifies missing skills
- 🤖 AI-generated summary (Gemini API)
- 🚀 AI-powered recommendations

---

## ⚙️ Tech Stack

- **Frontend:** React, Vite
- **Backend:** FastAPI (Python)
- **AI:** Google Gemini API
- **NLP:** Basic keyword + TF-IDF (sklearn)
- **PDF Parsing:** PyMuPDF
- **Deployment:** Vercel + Render

---

## 🧠 How it Works

1. Upload resume (PDF)
2. Paste job description
3. Backend extracts text
4. NLP matches skills
5. Gemini generates AI insights

---

## 🚀 How to Run Locally

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
