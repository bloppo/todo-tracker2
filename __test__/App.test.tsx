import React from 'react';
import {vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';

// Correct useAppState mock: accepts selector and returns correct value
let isAuthenticated = true;
const setIsAuthenticated = vi.fn((val) => {
    isAuthenticated = val;
});
vi.mock('../src/AppState', () => ({
    default: (selector) => selector({
        isAuthenticated,
        setIsAuthenticated,
    }),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        NavLink: ({to, children}) => <a href={to}>{children}</a>,
        Outlet: () => <div data-testid="outlet"/>,
    };
});
vi.mock('../src/utils/reloadPage', () => ({reloadPage: vi.fn()}));
import {reloadPage} from '../src/utils/reloadPage';
import {render, screen, fireEvent} from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
    beforeEach(() => {
        isAuthenticated = true;
        setIsAuthenticated.mockClear();
        mockNavigate.mockClear();
    });

    it('renders sidebar links when authenticated', () => {
        render(<MemoryRouter><App/></MemoryRouter>);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText("List Todo's")).toBeInTheDocument();
        expect(screen.getByText('Add Todo')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Log Out')).toBeInTheDocument();
    });

    it('does not render sidebar links when not authenticated', () => {
        isAuthenticated = false;
        render(<MemoryRouter><App/></MemoryRouter>);
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
        expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
    });

    it('calls setIsAuthenticated and navigates on logout', () => {
        render(<MemoryRouter><App/></MemoryRouter>);
        fireEvent.click(screen.getByText('Log Out'));
        expect(setIsAuthenticated).toHaveBeenCalledWith(false);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('calls localStorage.removeItem and reloads on reset storage', () => {
        const originalLocalStorage = globalThis.localStorage;
        const removeItemMock = vi.fn();
        globalThis.localStorage = {
            ...originalLocalStorage,
            removeItem: removeItemMock,
            // add other methods if needed
        } as Storage;

        render(<MemoryRouter><App/></MemoryRouter>);
        const resetButton = screen.getByText('Reset Storage');
        expect(resetButton).toBeInTheDocument();
        fireEvent.click(resetButton);
        expect(removeItemMock).toHaveBeenCalledWith('app-state');
        expect(reloadPage).toHaveBeenCalled();

        globalThis.localStorage = originalLocalStorage; // restore
    });

    it('renders the footer and outlet', () => {
        render(<MemoryRouter><App/></MemoryRouter>);
        expect(screen.getByText('Footer')).toBeInTheDocument();
        expect(screen.getByTestId('outlet')).toBeInTheDocument();
    });

    it('renders Footer and Reset Storage button', () => {
        render(<MemoryRouter><App/></MemoryRouter>);
        expect(screen.getByText('Footer')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /Reset Storage/i})).toBeInTheDocument();
    });
});
