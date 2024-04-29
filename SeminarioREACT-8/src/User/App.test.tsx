import React from 'react';
import { render, screen } from '@testing-library/react';
import AppUser from './App';

test('renders learn react link', () => {
  render(<AppUser />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
