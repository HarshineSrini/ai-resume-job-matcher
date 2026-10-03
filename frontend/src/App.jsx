import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file || !jobDescription.trim()) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setFile(null);
    setJobDescription("");
    setResult(null);
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="hero">
        <div className="badge">AI POWERED</div>

        <h1>AI Resume Job Matcher</h1>

        <p>
          Analyze your resume against a job description and discover
          your matched and missing skills.
        </p>
      </header>

      <main>

        {/* Input Card */}
        <section className="card">

          <div className="section-title">
            <span className="number">01</span>
            <div>
              <h2>Upload Your Resume</h2>
              <p>Upload your resume in PDF format.</p>
            </div>
          </div>

          <label className="upload-box">
            <span className="upload-icon">📄</span>

            <strong>
              {file ? file.name : "Choose your resume"}
            </strong>

            <small>
              {file
                ? "Resume selected successfully"
                : "PDF files only"}
            </small>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {/* Job Description */}
          <div className="section-title second">
            <span className="number">02</span>

            <div>
              <h2>Job Description</h2>
              <p>Paste the job description you want to analyze.</p>
            </div>
          </div>

          <textarea
            className="job-input"
            placeholder="Example: We are looking for a Python developer with Django, SQL, MongoDB..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button
            className="analyze-button"
            onClick={analyzeResume}
            disabled={loading}
          >
            {loading ? "Analyzing Resume..." : "Analyze Resume →"}
          </button>

        </section>

        {/* Results */}
        {result && (
          <section className="results">

            <div className="results-header">
              <div>
                <span className="result-label">ANALYSIS COMPLETE</span>
                <h2>Resume Analysis</h2>
              </div>

              <button
                className="clear-button"
                onClick={clearResults}
              >
                New Analysis
              </button>
            </div>

            {/* Score */}
            <div className="score-container">

              <div className="score-circle">
                <span>{result.match_score}%</span>
                <small>Match Score</small>
              </div>

              <div className="score-info">
                <h3>
                  {result.match_score >= 80
                    ? "Strong Skill Match"
                    : result.match_score >= 60
                    ? "Good Skill Match"
                    : "Skills Need Improvement"}
                </h3>

                <p>
                  Your resume matches{" "}
                  <strong>{result.matched_skills.length}</strong>{" "}
                  of{" "}
                  <strong>{result.job_skills.length}</strong>{" "}
                  identified job skills.
                </p>
              </div>

            </div>

            {/* Matched Skills */}
            <div className="result-block">

              <div className="result-heading">
                <span>✓</span>
                <h3>Matched Skills</h3>
              </div>

              <div className="skills">
                {result.matched_skills.map((skill) => (
                  <span className="skill matched" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>

            </div>

            {/* Missing Skills */}
            <div className="result-block">

              <div className="result-heading warning">
                <span>!</span>
                <h3>Missing Skills</h3>
              </div>

              <div className="skills">

                {result.missing_skills.length > 0 ? (
                  result.missing_skills.map((skill) => (
                    <span className="skill missing" key={skill}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <p>No missing skills found.</p>
                )}

              </div>

            </div>

            {/* Recommendations */}
            <div className="recommendation">

              <h3>💡 Recommendations</h3>

              {result.missing_skills.length > 0 ? (
                <>
                  <p>
                    Consider improving your resume by highlighting
                    experience with:
                  </p>

                  <ul>
                    {result.missing_skills.map((skill) => (
                      <li key={skill}>
                        Learn or gain project experience with{" "}
                        <strong>{skill}</strong>.
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>
                  Your resume covers all the skills identified
                  from this job description.
                </p>
              )}

            </div>

          </section>
        )}

      </main>

      <footer>
        <p>AI Resume Job Matcher • Built with React + FastAPI + Python</p>
      </footer>

    </div>
  );
}

export default App;