import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewSimulator from './components/InterviewSimulation/InterviewSimulator';
import FeedbackDisplay from './components/Feedback/FeedbackDisplay';
import './App.css';

function App() {
  const [interviewSession, setInterviewSession] = useState({
    questions: [],
    currentQuestionIndex: 0,
    responses: [],
    feedback: null
  });

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>AI Interview Coach</h1>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="container">
                <div className="interview-section">
                  <InterviewSimulator 
                    session={interviewSession}
                    setSession={setInterviewSession}
                  />
                </div>
              </div>
            }/>
            
            <Route path="/feedback" element={
              <FeedbackDisplay feedback={interviewSession.feedback} />
            }/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
