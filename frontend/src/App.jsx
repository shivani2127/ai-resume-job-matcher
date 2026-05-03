import { useState } from "react";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!resume || !jobDesc) {
      setError("Please upload resume and enter job description.");
      return;
    }
  
    setLoading(true);
    setError("");
    setResult(null);
  
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("job_description", jobDesc);
  
      const response = await fetch("https://ai-resume-job-matcher-1-uuc0.onrender.com/match", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong");
    }
  
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI Resume Matcher</h1>
        <p style={styles.subtitle}>
          Upload your resume and compare it with a job description.
        </p>

        <label style={styles.label}>Upload Resume</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          style={styles.input}
        />

        <label style={styles.label}>Job Description</label>
        <textarea
          placeholder="Paste job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          rows={7}
          style={styles.textarea}
        />

        <button onClick={handleSubmit} style={styles.button}>
          {loading ? "Analyzing..." : "Match Resume"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.resultCard}>
            <h2 style={styles.score}>Match Score: {result.match_score}/10</h2>

            <div>
              <h3>Resume Skills</h3>
              <div style={styles.skillsBox}>
                {result.resume_skills?.map((skill, index) => (
                  <span key={index} style={styles.skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3>Job Skills</h3>
              <div style={styles.skillsBox}>
                {result.job_skills?.map((skill, index) => (
                  <span key={index} style={styles.skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3>Missing Skills</h3>
              <div style={styles.skillsBox}>
                {result.missing_skills?.length > 0 ? (
                  result.missing_skills.map((skill, index) => (
                    <span key={index} style={styles.missingSkill}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <p>No missing skills found.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "760px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    marginTop: "16px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    resize: "vertical",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "12px",
    textAlign: "center",
  },
  resultCard: {
    marginTop: "30px",
    padding: "20px",
    background: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  score: {
    color: "#2563eb",
    marginBottom: "20px",
  },
  skillsBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "16px",
  },
  skill: {
    background: "#e0ecff",
    color: "#1d4ed8",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "13px",
  },
  missingSkill: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "13px",
  },
};

export default App;