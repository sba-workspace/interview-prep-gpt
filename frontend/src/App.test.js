import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders main header', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headerElement = screen.getByText(/AI Interview Coach/i);
  expect(headerElement).toBeInTheDocument();
});

test('navigates to interview section', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  await waitFor(() => {
    expect(screen.getByText(/Interview Simulation/i)).toBeInTheDocument();
  });
});
