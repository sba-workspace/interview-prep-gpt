from google.cloud import speech
import io

def transcribe_audio(audio_content, sample_rate_hertz=16000, language_code="en-US"):
    """
    Transcribe audio content using Google Cloud Speech-to-Text
    
    Args:
        audio_content: Binary audio content
        sample_rate_hertz: Audio sample rate
        language_code: Language of the audio
        
    Returns:
        Transcribed text as string
    """
    client = speech.SpeechClient()
    
    audio = speech.RecognitionAudio(content=audio_content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=sample_rate_hertz,
        language_code=language_code,
        enable_automatic_punctuation=True,
    )
    
    response = client.recognize(config=config, audio=audio)
    
    transcript = ""
    for result in response.results:
        transcript += result.alternatives[0].transcript
    
    return transcript
