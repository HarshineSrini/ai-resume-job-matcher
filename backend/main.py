from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io

from matcher import calculate_match

app = FastAPI(title="AI Resume Job Matcher")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "AI Resume & Job Matcher API is running!"
    }


@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    file_content = await file.read()

    pdf = PdfReader(io.BytesIO(file_content))

    resume_text = ""

    for page in pdf.pages:
        text = page.extract_text()

        if text:
            resume_text += text + "\n"

    result = calculate_match(
        resume_text,
        job_description
    )

    return {
        "filename": file.filename,
        "pages": len(pdf.pages),
        **result
    }