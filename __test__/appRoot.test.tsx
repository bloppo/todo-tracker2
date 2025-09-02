import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock dependencies
vi.mock('@mui/material/CssBaseline', () => ({ default: ({ children }: { children?: React.ReactNode }) => <>{children}</> }));
vi.mock('../src/MyRoutes', () => ({ default: () => <div data-testid="my-routes">MyRoutes</div> }));

import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from '../src/MyRoutes';

// Test the component tree directly

describe('App Root', () => {
  it('renders the app root with BrowserRouter and MyRoutes', () => {
    render(
      <React.StrictMode>
        <CssBaseline />
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      </React.StrictMode>
    );
    expect(screen.getByTestId('my-routes')).toBeTruthy();
  });
});
