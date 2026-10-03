import re
SKILLS = [
    "c++",
    "python",
    "java",
    "c",
    "javascript",
    "react",
    "html",
    "css",
    "django",
    "fastapi",
    "flask",
    "sql",
    "mysql",
    "mongodb",
    "postgresql",
    "oracle",
    "rest api",
    "git",
    "github",
    "docker",
    "aws",
    "machine learning",
    "artificial intelligence",
    "data science",
]


def extract_skills(text):
    text = text.lower()

    found_skills = []

    for skill in SKILLS:
        if skill == "c":
            pattern = r"(?<![a-z+#])c(?![a-z+#])"
        else:
            pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

        if re.search(pattern, text):
            found_skills.append(skill)

    return found_skills


def calculate_match(resume_text, job_description):

    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    matched_skills = [
        skill for skill in job_skills
        if skill in resume_skills
    ]

    missing_skills = [
        skill for skill in job_skills
        if skill not in resume_skills
    ]

    if len(job_skills) > 0:
        match_score = (
            len(matched_skills) / len(job_skills)
        ) * 100
    else:
        match_score = 0

    return {
        "match_score": round(match_score, 2),
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }