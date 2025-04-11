from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage, SystemMessage


# load env variables from .env file
load_dotenv()


def get_gemini_llm():
    """Configure and return a Gemini LLM instance"""
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0.7,
        max_output_tokens=1024,
    )
    return llm

def get_chat_model():
    """Configure and return a chat model instance"""
    chat = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0.7,
        max_output_tokens=1024,
    )
    return chat
