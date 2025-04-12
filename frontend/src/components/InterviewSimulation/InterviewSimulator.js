import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AudioRecorder from '../AudioRecorder/AudioRecorder';
import { fetchInterviewQuestions } from '../../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const QuestionCounter = styled.div`
  color: #64748b;
  margin-bottom: 1rem;
`;

const QuestionText = styled.div`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
`;

const QuestionDisplay = styled.div`
  font-size: 1.2rem;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-left: 4px solid #3498db;
  border-radius: 4px;
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const NavigationButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

const PreviousButton = styled(NavigationButton)`
  background: #e2e8f0;
  color: #1e293b;

  &:hover:not(:disabled) {
    background: #cbd5e1;
  }
`;

const NextButton = styled(NavigationButton)`
  background: var(--primary-color);
  color: white;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }
`;

const InterviewSimulator = ({ session, setSession }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch interview questions when component mounts
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const jobRole = {
          title: "Software Engineer",
          skills: ["JavaScript", "React", "Python"]
        };
        
        const fetchedQuestions = await fetchInterviewQuestions(jobRole);
        console.log("Fetched questions:", fetchedQuestions);

        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuestions();
  }, []);
  
  const handleStartRecording = () => {
    setIsRecording(true);
  };
  
  const handleStopRecording = (audioBlob) => {
    setIsRecording(false);
    
    // Add response to the list
    setResponses(prev => [
      ...prev, 
      { 
        questionIndex: currentQuestionIndex,
        audioBlob
      }
    ]);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };
  
  if (isLoading) {
    return <div>Loading interview questions...</div>;
  }
  
  if (!questions || questions.length === 0) {
    return <div>No questions available. Please try again later.</div>;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <Container>
      <h2>Interview Simulation</h2>
      <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
      
      
      <QuestionText>
        {currentQuestion.text}
      </QuestionText>

      <AudioRecorder 
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />

      <QuestionCounter>
        Question {currentQuestionIndex + 1} of {questions.length}
      </QuestionCounter>
      
      
      
      <ControlPanel>
        <Button 
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </Button>
        
        <Button 
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next Question
        </Button>
      </ControlPanel>
    </Container>
  );
};

export default InterviewSimulator;
