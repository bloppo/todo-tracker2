// Mock useAppState
const setIsAuthenticatedMock = vi.fn();
vi.mock('../src/AppState', () => ({
  default: (selector) => selector({ setIsAuthenticated: setIsAuthenticatedMock })
}));

import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';

// Mock useNavigate from react-router-dom
const navigateMock = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

import Login from '../src/Login';
import { MemoryRouter } from 'react-router-dom';

describe('Login Component', () => {
  beforeEach(() => {
    setIsAuthenticatedMock.mockClear();
    navigateMock.mockClear();
  });

  it('renders login form elements', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByText(/click submit to log in/i)).toBeInTheDocument();
  });

  it('submits form and authenticates user', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testpass' } });
    await act(async () => {
      fireEvent.submit(screen.getByTestId('login-form'));
    });
    expect(setIsAuthenticatedMock).toHaveBeenCalledWith(true);
    expect(navigateMock).toHaveBeenCalledWith('/ListCards');
  });

  it('resets form after submit', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    // Wait for form reset
    await screen.findByLabelText(/username/i);
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });
});
