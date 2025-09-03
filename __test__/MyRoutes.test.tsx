import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';

// Mock useAppState before importing MyRoutes
let isAuthenticatedMock = false;
vi.mock('../src/AppState', () => ({
    default: (selector) => selector({isAuthenticated: isAuthenticatedMock})
}));

import MyRoutes from '../src/MyRoutes';

describe('MyRoutes', () => {
    beforeEach(() => {
        isAuthenticatedMock = false;
    });

    it('renders Home at index route', () => {
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <MyRoutes/>
            </MemoryRouter>
        );
        expect(screen.getByRole('heading', {name: /login/i})).toBeInTheDocument();
    });

    it('renders PageNotFound for unknown route', () => {
        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <MyRoutes/>
            </MemoryRouter>
        );
        expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });

    it('does not render protected routes when not authenticated', () => {
        render(
            <MemoryRouter initialEntries={["/about"]}>
                <MyRoutes/>
            </MemoryRouter>
        );
        // Should not find About page content
        expect(screen.queryByText(/about/i)).not.toBeInTheDocument();
    });

    it('renders protected routes when authenticated', () => {
        isAuthenticatedMock = true;
        render(
            <MemoryRouter initialEntries={["/about"]}>
                <MyRoutes/>
            </MemoryRouter>
        );
        expect(screen.getByRole('heading', {name: /about/i})).toBeInTheDocument();
    });
});
