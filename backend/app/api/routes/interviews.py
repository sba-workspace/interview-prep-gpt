from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional

from app.core.interview.question_generator import generate_interview_questions

router = APIRouter(prefix="/interviews", tags=["interviews"])

class JobRole(BaseModel):
    title: str
    description: Optional[str] = None
    skills: List[str] = []

class Question(BaseModel):
    text: str
    category: str
    difficulty: str

@router.post("/questions", response_model=List[Question])
async def create_interview_questions(job_role: JobRole):
    """Generate interview questions based on job role"""
    try:
        questions = generate_interview_questions(job_role.dict())
        return questions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
