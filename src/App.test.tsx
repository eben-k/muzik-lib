import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders enjoy soul music text', () => {
  render(<App />);
  const linkElement = screen.getByText(/enjoy soulmusic/i);
  expect(linkElement).toBeInTheDocument();
});

// test('renders login button', () => {
//   render(<App />);
//   const loginButton = screen.getByRole('button').firstChild;
//   const loginText = screen.getByText(/login with spotify/);
//   expect(loginButton).toContainElement(loginText);
// });
