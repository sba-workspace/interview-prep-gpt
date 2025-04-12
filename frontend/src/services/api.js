import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchInterviewQuestions = async (jobRole) => {
  try {
    const response = await apiClient.post('/interviews/questions', jobRole);
    return response.data;
  } catch (error) {
    console.error('Error fetching interview questions:', error);
    throw error;
  }
};

export const submitInterviewResponse = async (questionId, audioBlob) => {
  // Create form data to send audio file
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('questionId', questionId);
  
  try {
    const response = await apiClient.post('/interviews/responses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting interview response:', error);
    throw error;
  }
};

export const getFeedback = async (responseId) => {
  try {
    const response = await apiClient.get(`/feedback/${responseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};
