import React from 'react';
import styled from 'styled-components';

const FeedbackContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const FeedbackHeader = styled.h3`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
`;

const ScoreSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const ScoreCard = styled.div`
  flex: 1;
  min-width: 120px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
  text-align: center;
`;

const ScoreLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
`;

const ScoreValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => {
    if (props.value >= 8) return '#27ae60';
    if (props.value >= 6) return '#f39c12';
    return '#e74c3c';
  }};
`;

const DetailedFeedback = styled.div`
  padding: 15px;
  background-color: #f0f7ff;
  border-left: 4px solid #3498db;
  border-radius: 4px;
  white-space: pre-line;
`;

const FeedbackDisplay = ({ feedback }) => {
  if (!feedback) {
    return <div>No feedback available yet.</div>;
  }
  
  return (
    <FeedbackContainer>
      <FeedbackHeader>Interview Response Feedback</FeedbackHeader>
      
      <ScoreSection>
        <ScoreCard>
          <ScoreLabel>STAR Method</ScoreLabel>
          <ScoreValue value={feedback.star_method_score}>
            {feedback.star_method_score}/10
          </ScoreValue>
        </ScoreCard>
        
        <ScoreCard>
          <ScoreLabel>Relevance</ScoreLabel>
          <ScoreValue value={feedback.relevance_score}>
            {feedback.relevance_score}/10
          </ScoreValue>
        </ScoreCard>
        
        <ScoreCard>
          <ScoreLabel>Clarity</ScoreLabel>
          <ScoreValue value={feedback.clarity_score}>
            {feedback.clarity_score}/10
          </ScoreValue>
        </ScoreCard>
        
        <ScoreCard>
          <ScoreLabel>Specificity</ScoreLabel>
          <ScoreValue value={feedback.specificity_score}>
            {feedback.specificity_score}/10
          </ScoreValue>
        </ScoreCard>
        
        <ScoreCard>
          <ScoreLabel>Communication</ScoreLabel>
          <ScoreValue value={feedback.communication_score}>
            {feedback.communication_score}/10
          </ScoreValue>
        </ScoreCard>
      </ScoreSection>
      
      <DetailedFeedback>
        {feedback.feedback}
      </DetailedFeedback>
    </FeedbackContainer>
  );
};

export default FeedbackDisplay;
