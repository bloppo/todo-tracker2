import {describe, it, expect, vi, beforeEach} from 'vitest';
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

// Mock DeleteDialog
vi.mock('../src/Dialogs/DeleteDialog', () => ({
    default: ({openDialog, description, handleCancel, handleConfirmDelete}: {
        openDialog: boolean;
        description: string;
        handleCancel: () => void;
        handleConfirmDelete: () => void
    }) => (
        openDialog ? (
            <div data-testid="delete-dialog">
                <span>{description}</span>
                <button onClick={handleConfirmDelete}>Confirm</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        ) : null
    )
}));

// Mock useAppState
const removeTodoMock = vi.fn();
const completedTodoMock = vi.fn();
vi.mock('../src/AppState', () => ({
    __esModule: true,
    default: (selector: (state: {
        removeTodo: typeof removeTodoMock;
        completedTodo: typeof completedTodoMock
    }) => (recno: number) => boolean) => selector({
        removeTodo: removeTodoMock,
        completedTodo: completedTodoMock,
    }),
}));

import TodoCards from '../src/TodoCards';

const sampleTodos = [
    {
        recno: 1,
        description: 'Test Todo 1',
        position: 'A',
        completed: false,
        dueDate: '2025-09-02',
    },
    {
        recno: 2,
        description: 'Another Task',
        position: 'B',
        completed: true,
        dueDate: '2025-09-03',
    },
];

const defaultProps = {
    todoData: sampleTodos,
    filterByDescription: '',
    filterByPosition: '',
    filterByCompleted: 'all',
    filterByDueDateRangeStart: null,
    filterByDueDateRangeEnd: null,
    sortBy: 'description',
    sortAsc: true,
};

beforeEach(() => {
    removeTodoMock.mockClear();
    completedTodoMock.mockClear();
});

describe('TodoCards', () => {
    it('renders todo cards when data is present', () => {
        render(<TodoCards {...defaultProps} />);
        expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Another Task')).toBeInTheDocument();
    });

    it("shows 'No todo's found' when no todos match filter", () => {
        render(<TodoCards {...defaultProps} filterByDescription="xyz"/>);
        expect(screen.getByText("No todo's found")).toBeInTheDocument();
    });

    it('filters by description', () => {
        render(<TodoCards {...defaultProps} filterByDescription="Test"/>);
        expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
        expect(screen.queryByText('Another Task')).not.toBeInTheDocument();
    });

    it('filters by position', () => {
        render(<TodoCards {...defaultProps} filterByPosition="B"/>);
        expect(screen.getByText('Another Task')).toBeInTheDocument();
        expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    });

    it('filters by completed status', () => {
        render(<TodoCards {...defaultProps} filterByCompleted="completed"/>);
        expect(screen.getByText('Another Task')).toBeInTheDocument();
        expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    });

    it('filters by pending status', () => {
        render(<TodoCards {...defaultProps} filterByCompleted="pending"/>);
        expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
        expect(screen.queryByText('Another Task')).not.toBeInTheDocument();
    });

    it('sorts by description ascending', () => {
        render(<TodoCards {...defaultProps} sortBy="description" sortAsc={true}/>);
        const cards = screen.getAllByRole('button', {name: /Delete/i});
        expect(cards[0].closest('.todo-card')).toHaveTextContent('Another Task');
        expect(cards[1].closest('.todo-card')).toHaveTextContent('Test Todo 1');
    });

    it('delete button opens dialog and calls removeTodo', () => {
        render(<TodoCards {...defaultProps} />);
        fireEvent.click(screen.getAllByText('Delete')[0]);
        expect(screen.getByTestId('delete-dialog')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Confirm'));
        expect(removeTodoMock).toHaveBeenCalled();
    });

    it('complete button calls completedTodo', () => {
        render(<TodoCards {...defaultProps} />);
        fireEvent.click(screen.getAllByText('Complete')[0]);
        expect(completedTodoMock).toHaveBeenCalled();
    });
});
