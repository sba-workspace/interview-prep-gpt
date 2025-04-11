from typing import List, Dict, Any
import json
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))


from core.language_models.llm_config import get_chat_model
from core.language_models.prompt_templates import get_interview_question_prompt

def generate_interview_questions(job_role: Dict[str, Any]) -> List[Dict[str, str]]:
    """
    Generate interview questions based on job role specifications
    
    Args:
        job_role: Dictionary containing job title, description, and required skills
        
    Returns:
        List of dictionaries containing questions with category and difficulty
    """
    chat_model = get_chat_model()
    
    # Create prompt with job details
    prompt = get_interview_question_prompt(
        job_title=job_role["title"],
        skills=job_role["skills"],
        num_questions=5,
        
    )
    
    # Generate questions using the LLM
    response = chat_model.invoke(prompt)
    
    # Process and format the response
    # This is a simplified example - you'd need more robust parsing
    try:
        content = getattr(response, 'content', None)
        if not content and hasattr(response, 'candidates'):
            content = response.candidates[0].content

        if not content:
            print("⚠️ No content returned from model.")
            return []

        print("🔍 Raw model output:")
        print(content)

        questions = []
        for line in content.split("\n"):
            if "Question" in line:
                parts = line.split(":", 1)
                if len(parts) > 1:
                    questions.append({
                        "text": parts[1].strip(),
                        "category": "Technical",
                        "difficulty": "Medium"
                    })
        return questions
    except Exception as e:
        print(f"Error parsing questions: {e}")
        return []

# if __name__ == "__main__":
#     job_role = {
#         "title": "Machine Learning Engineer",
#         "skills": ["Python", "TensorFlow", "Data Structures"]
#     }
#     questions = generate_interview_questions(job_role)
#     print(questions)
