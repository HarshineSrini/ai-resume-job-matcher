# AI Resume & Job Matcher

An AI-powered web application that analyzes a resume against a job description, calculates a skill match percentage, identifies matched and missing skills, and provides recommendations.

## Features

- Upload a resume in PDF format
- Extract text from the resume
- Extract relevant technical skills
- Analyze job descriptions
- Calculate resume-to-job match percentage
- Display matched skills
- Identify missing skills
- Provide skill recommendations
- Responsive React frontend
- FastAPI backend API

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- Uvicorn
- pypdf

### Tools
- Git
- GitHub
- VS Code

## Project Structure

```text
ai-resume-job-matcher/
│
├── backend/
│   ├── main.py
│   ├── matcher.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md