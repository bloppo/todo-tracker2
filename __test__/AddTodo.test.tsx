import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import AddTodo from '../src/AddTodo';
import React from 'react';
import {vi} from 'vitest';

// Mock useAppState to avoid actual state changes
vi.mock('../src/AppState', () => ({default: () => ({addTodo: vi.fn()})}));

describe('AddTodo Component', () => {
    it('renders form fields', () => {
        render(<AddTodo/>);
        expect(screen.getByLabelText(/New Todo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Position/i)).toBeInTheDocument();
        expect(screen.getAllByLabelText(/Due Date/i).length).toBeGreaterThan(0);
        expect(screen.getByRole('button', {name: /Add/i})).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        render(<AddTodo/>);
        fireEvent.click(screen.getByRole('button', {name: /Add/i}));
        await waitFor(() => {
            expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Position is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Due Date is required\./i)).toBeInTheDocument();
        });
    });

    it('shows error for invalid due date', async () => {
        render(<AddTodo/>);
        fireEvent.change(screen.getByLabelText(/New Todo/i), {target: {value: 'Test todo'}});
        fireEvent.change(screen.getByLabelText(/Position/i), {target: {value: 'Test position'}});
        // Try to submit with no date (should show required error)
        fireEvent.click(screen.getByRole('button', {name: /Add/i}));
        await waitFor(() => {
            expect(screen.getByText(/Due Date is required\./i)).toBeInTheDocument();
        });
    });

    // You can add more tests for successful submission and snackbar
});
