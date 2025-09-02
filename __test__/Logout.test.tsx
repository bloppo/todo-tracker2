import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

// Mock useAppState before importing Logout
const setIsAuthenticatedMock = vi.fn();
vi.mock('../src/AppState', () => ({
  default: (selector) => selector({ setIsAuthenticated: setIsAuthenticatedMock })
}));

import Logout from '../src/Logout';

describe('Logout Component', () => {
  beforeEach(() => {
    setIsAuthenticatedMock.mockClear();
  });

  it('renders Log Out text and Login button', () => {
    render(<Logout />);
    expect(screen.getByText(/log out/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls setIsAuthenticated(false) when Login button is clicked', () => {
    render(<Logout />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(setIsAuthenticatedMock).toHaveBeenCalledWith(false);
  });
});

