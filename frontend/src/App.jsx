import { useState } from "react";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!resume || !jobDesc.trim()) {
      setError("Please upload resume and enter job description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDesc);

    try {
      const response = await fetch("http://127.0.0.1:8000/match", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Backend request failed");

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Unable to analyze resume. Please check backend/API.");
    } finally {
      setLoading(false);
    }
  };

  const renderSkills = (skills, type = "normal") => {
    if (!skills || skills.length === 0) {
      return <p style={styles.emptyText}>No skills found</p>;
    }

    return skills.map((skill, index) => (
      <span key={index} style={type === "missing" ? styles.missingSkill : styles.skill}>
        {skill}
      </span>
    ));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>AI Powered Resume Intelligence</div>

        <h1 style={{
               fontSize: "46px",
               fontWeight: "900",
               textAlign: "center",
               marginBottom: "10px",
               background: "linear-gradient(90deg, #ffffff, #4facfe, #00f2fe)",
                WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
               textShadow: "0 5px 30px rgba(0,0,0,0.7)"
}}>
  AI Resume Matcher
</h1>
        <p style={{
           color: "#e2e8f0",
          fontSize: "17px",
            textAlign: "center",
          fontWeight: "500",
          marginBottom: "25px"
}}>
  Upload your resume and get AI-powered match score, skill gaps, and recommendations.
</p>

        <div style={styles.grid}>
          <div style={styles.inputCard}>
            <h3 style={styles.label}>Upload Resume</h3>
            <input
              style={styles.input}
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </div>

          <div style={styles.inputCard}>
            <h3 style={styles.label}>Job Description</h3>
            <textarea
              style={styles.textarea}
              placeholder="Paste job description here..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          onMouseOver={(e) => e.target.style.opacity = 0.9}
          onMouseOut={(e) => e.target.style.opacity = 1}
          style={{
            ...styles.button,
            opacity: loading ? 0.65 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "🔍 Analyzing with AI..." : "Match Resume"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.resultCard}>
            <div style={styles.scoreBox}>
              <p style={styles.scoreLabel}>Match Score</p>
              <h2 style={styles.score}>{result.match_score}/10</h2>
            </div>

            <div style={styles.section}>
            <div style={styles.skillCard}>
  <h3 style={styles.sectionTitle}>Resume Skills</h3>
  <div style={styles.skillsBox}>
    {renderSkills(result.resume_skills)}
  </div>
</div>

<div style={styles.skillCard}>
  <h3 style={styles.sectionTitle}>Job Skills</h3>
  <div style={styles.skillsBox}>
    {renderSkills(result.job_skills)}
  </div>
</div>

<div style={styles.skillCard}>
  <h3 style={styles.sectionTitle}>Missing Skills</h3>
  <div style={styles.skillsBox}>
    {renderSkills(result.missing_skills, "missing")}
  </div>
</div>
            </div>

            {result.ai_summary && (
              <div style={styles.aiBox}>
                <h3 style={styles.aiTitle}>🤖 AI Summary</h3>
                <p style={styles.aiText}>{result.ai_summary}</p>
              </div>
            )}

            {result.ai_recommendations?.length > 0 && (
              <div style={styles.aiBox}>
                <h3 style={styles.aiTitle}>🚀 AI Recommendations</h3>
                <ul style={styles.recommendationList}>
                  {result.ai_recommendations.map((item, index) => (
                    <li key={index} style={styles.aiText}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  heading: {
    fontSize: "46px",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: "10px",
    color: "#0f172a",
    letterSpacing: "-1px",
    textShadow: "none"
  },
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    padding: "50px 20px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Inter, Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "20px",
    width: "100%"
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    padding: "8px 16px",
    background: "#dbeafe",
    color: "#2563eb",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "14px",
    marginBottom: "18px",
  },
  sectionTitle: {
    textAlign: "center",
    marginTop: "20px",
    color: "#0f172a",   // darker text
    fontWeight: "600"
  },
  subtitle: {
    color: "#475569",
    fontSize: "17px",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: "28px"
  },
  grid: {
    display: "grid",
    gap: "24px",
  },
  inputCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "22px",
    borderRadius: "18px",
  },
  label: {
    color: "#475569",
    marginBottom: "12px",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
  },
  textarea: {
   background: "#f8fafc",
   color: "#0f172a",
   border: "1px solid #e2e8f0",
  
    width: "100%",
    minHeight: "190px",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "15px",
    resize: "vertical"
  },

  button: { 
    
    width: "100%",
    marginTop: "28px",
    padding: "17px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "17px",
    fontWeight: "800",
    boxShadow: "0 12px 25px rgba(37, 99, 235, 0.28)",
    transition: "all 0.2s ease"
  },
  error: {
    color: "#dc2626",
    marginTop: "18px",
    fontWeight: "600",
  },
  resultCard: {
    marginTop: "35px",
    padding: "30px",
    border: "1px solid #e2e8f0",
    borderRadius: "22px",
    background: "#ffffff",
    textAlign: "center",
  },

  scoreBox: {
    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
    color: "#ffffff",
    borderRadius: "18px",
    padding: "26px",
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(37, 99, 235, 0.25)",
  },
  
  scoreLabel: {
    color: "#dbeafe",
    margin: 0,
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  
  score: {
    color: "#ffffff",
    fontSize: "42px",
    fontWeight: "900",
    margin: "8px 0 0",
  },
  
  section: {
    marginTop: "28px",
  },
  sectionTitle: {
    color: "#cbd5f5",
    fontSize: "22px",
    marginBottom: "14px",
  },
  skillsBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginTop: "10px",
    background: "#0f172a",   // 🔥 dark background
    padding: "15px",
    borderRadius: "12px"
  },
  
  skill: {
    background: "#1e293b",   // dark chip
    color: "#e2e8f0",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    border: "1px solid #334155"
  },
  missingSkill: {
    background: "#7f1d1d",   // dark red
    color: "#fecaca",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    border: "1px solid #991b1b"
  },
  emptyText: {
    color: "#94a3b8",
  },
  aiBox: {
    marginTop: "30px",
    padding: "24px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderLeft: "5px solid #2563eb",
    borderRadius: "18px",
    textAlign: "left",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.05)",
  },
  aiTitle: {
    color: "#2563eb",
    marginBottom: "12px",
    fontSize: "22px",
  },
  aiText: {
    color: "#334155",
    lineHeight: "1.75",
    fontSize: "15px",
  },
  recommendationList: {
    paddingLeft: "22px",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "20px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  skillCard: {
    
      background: "#f8fafc",
      borderRadius: "14px",
      padding: "16px",
      marginTop: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    
  },
};

export default App;