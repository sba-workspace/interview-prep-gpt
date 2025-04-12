from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from typing import Dict, Any

from app.core.language_models.llm_config import get_gemini_llm

# Template for evaluating interview responses
EVALUATION_TEMPLATE = """
You are an expert interviewer evaluating a candidate's response to a behavioral interview question.

Question: {question}

Candidate's Response: {response}

Please evaluate the response based on the STAR method:
1. Situation: Did the candidate clearly describe the context?
2. Task: Did the candidate explain their specific responsibility?
3. Action: Did the candidate detail the steps they took?
4. Result: Did the candidate explain the outcome and what they learned?

Also evaluate the following aspects:
- Relevance to the question
- Clarity and conciseness
- Specific examples versus general statements
- Professional communication skills

Provide a detailed evaluation with specific feedback for improvement.
"""

def evaluate_interview_response(question: str, response: str) -> Dict[str, Any]:
    """
    Evaluate an interview response using the STAR method
    
    Args:
        question: The interview question
        response: The candidate's response (transcribed from audio)
        
    Returns:
        Dictionary containing evaluation scores and feedback
    """
    llm = get_gemini_llm()
    
    # Create prompt
    prompt = PromptTemplate(
        input_variables=["question", "response"],
        template=EVALUATION_TEMPLATE
    )
    
    # Create chain
    evaluation_chain = LLMChain(llm=llm, prompt=prompt)
    
    # Run evaluation
    evaluation = evaluation_chain.run(question=question, response=response)
    
    # Parse evaluation (simple approach - would need more robust parsing)
    evaluation_lines = evaluation.split("\n")
    feedback = evaluation
    
    # You would implement more robust parsing here
    # For now, returning the full feedback
    return {
        "feedback": feedback,
        "star_method_score": 7,  # Placeholder score out of 10
        "relevance_score": 8,    # Placeholder score out of 10
        "clarity_score": 8,      # Placeholder score out of 10
        "specificity_score": 7,  # Placeholder score out of 10
        "communication_score": 8 # Placeholder score out of 10
    }
