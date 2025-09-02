import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../src/Helpers/ProtectedRoute';

describe('ProtectedRoute', () => {
  it('renders child route when authenticated', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute isAuthenticated={true} />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to /login when not authenticated', async () => {
    const { findByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute isAuthenticated={false} />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(await findByText('Login Page')).toBeInTheDocument();
  });
});
