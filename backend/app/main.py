from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI(
    title="AI interview coach api",
    description="Backend API for AI-powered interview coach",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to AI Interview Coach API"}


# Import and include routers
from app.api.routes import interviews
# , feedback, speech
app.include_router(interviews.router)
# app.include_router(feedback.router)
# app.include_router(speech.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)