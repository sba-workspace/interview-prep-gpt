from fastapi import APIRouter, File, UploadFile, HTTPException
from typing import Optional

from app.core.speech.speech_to_text import transcribe_audio

router = APIRouter(prefix="/speech", tags=["speech"])

@router.post("/transcribe")
async def transcribe_audio_file(
    file: UploadFile = File(...),
    language_code: Optional[str] = "en-US"
):
    """Transcribe audio file to text"""
    try:
        contents = await file.read()
        transcription = transcribe_audio(contents, language_code=language_code)
        return {"transcription": transcription}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
