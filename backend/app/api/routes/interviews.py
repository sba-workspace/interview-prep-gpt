from fastapi import APIRouter, HTTPException, Depends,UploadFile, File, Form
from pydantic import BaseModel
from typing import List, Optional
import uuid

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


@router.post("/responses")
async def submit_interview_response(
    questionId: str = Form(...),
    audio: UploadFile = File(...)
):
    """Submit an interview response for evaluation"""
    try:
        # Read audio file
        audio_content = await audio.read()
        
        # Get the question text from our stored questions
        # In a production app, you'd retrieve this from a database
        question = "Tell me about a time when you had to solve a complex problem."  # Placeholder
        
        # Transcribe audio to text
        from app.core.speech.speech_to_text import transcribe_audio
        transcription = transcribe_audio(audio_content)
        
        # Evaluate the response
        from app.core.interview.feedback_evaluator import evaluate_interview_response
        evaluation = evaluate_interview_response(question, transcription)
        
        # In a real application, you would store this in a database
        response_id = "response_" + str(uuid.uuid4())
        
        return {
            "id": response_id,
            "questionId": questionId,
            "transcription": transcription,
            "evaluation": evaluation
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
