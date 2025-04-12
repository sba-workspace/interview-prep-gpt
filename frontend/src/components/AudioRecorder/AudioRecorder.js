import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const RecorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const RecordButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.isRecording ? '#e74c3c' : '#2ecc71'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const AudioVisualizer = styled.div`
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    width: ${props => props.progress}%;
    height: 100%;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }
`;


const RecordIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: ${props => props.isRecording ? '4px' : '50%'};
`;

const AudioStatus = styled.div`
  margin-top: 15px;
  font-size: 1rem;
  color: ${props => props.isRecording ? '#e74c3c' : '#7f8c8d'};
`;

const AudioRecorder = ({ isRecording, onStartRecording, onStopRecording }) => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState(null);
  const mediaRecorder = useRef(null);
  const timerInterval = useRef(null);
  const audioChunks = useRef([]);
  
  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(mediaStream);
      
      const recorder = new MediaRecorder(mediaStream);
      mediaRecorder.current = recorder;
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        audioChunks.current = [];
        onStopRecording(audioBlob);
      };
      
      recorder.start();
      
      // Start timer
      timerInterval.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      
      onStartRecording();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      
      // Stop all tracks from the stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      // Clear timer
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        setRecordingTime(0);
      }
    }
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  return (
    <RecorderContainer>
      <RecordButton 
        isRecording={isRecording} 
        onClick={toggleRecording}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        <RecordIcon isRecording={isRecording} />
      </RecordButton>
      
      <AudioVisualizer progress={(recordingTime % 10) * 10} />
      
      <AudioStatus isRecording={isRecording}>
        {isRecording 
          ? `Recording... ${formatTime(recordingTime)}` 
          : 'Click to start recording your answer'}
      </AudioStatus>
    </RecorderContainer>
  );
};

export default AudioRecorder;
