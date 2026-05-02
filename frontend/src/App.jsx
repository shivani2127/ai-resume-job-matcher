import { useState } from "react";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDesc);

    const response = await fetch("http://127.0.0.1:8000/match", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Resume Matcher</h1>

      <input type="file" onChange={(e) => setResume(e.target.files[0])} />

      <br />
      <br />

      <textarea
        placeholder="Enter job description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={5}
        cols={40}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>Match Resume</button>

      {result && (
        <div>
          <h3>Match Score: {result.match_score}/10</h3>

          {result.missing_skills?.length > 0 && (
            <>
              <h4>Missing Skills:</h4>
              <ul>
                {result.missing_skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;