from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)

# Interview question generation prompt
INTERVIEW_QUESTION_SYSTEM_TEMPLATE = """
You are an expert interviewer specializing in behavioral interviews for {job_title} positions.
Your task is to generate {num_questions} challenging but fair behavioral interview questions.
Focus on questions that assess the following skills: {skills}.
"""

INTERVIEW_QUESTION_HUMAN_TEMPLATE = """
Please create {num_questions} behavioral interview questions for a {job_title} position.
The candidate should have experience with: {skills}.
Format each question with its category and difficulty level.
"""

def get_interview_question_prompt(job_title, skills, num_questions=5):
    system_message_prompt = SystemMessagePromptTemplate.from_template(
        INTERVIEW_QUESTION_SYSTEM_TEMPLATE
    )
    human_message_prompt = HumanMessagePromptTemplate.from_template(
        INTERVIEW_QUESTION_HUMAN_TEMPLATE
    )
    
    chat_prompt = ChatPromptTemplate.from_messages(
        [system_message_prompt, human_message_prompt]
    )
    
    return chat_prompt.format(
        job_title=job_title,
        skills=", ".join(skills),
        num_questions=num_questions
    )
