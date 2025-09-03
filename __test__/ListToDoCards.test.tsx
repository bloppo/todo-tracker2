import {render, screen, fireEvent} from '@testing-library/react';
import {vi} from 'vitest';

// Set up navigateMock at the top
const navigateMock = vi.fn();

// Partial mock for useNavigate from react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

// Import MemoryRouter after the mock
import {MemoryRouter} from 'react-router-dom';

// Mock useAppState to provide predictable todoData
const mockTodoData = [
    {
        recno: 1,
        description: 'Test Todo',
        position: 'A',
        completed: false,
        dueDate: '2025-09-01',
    },
    {
        recno: 2,
        description: 'Another Todo',
        position: 'B',
        completed: true,
        dueDate: '2025-09-02',
    },
];
vi.mock('../src/AppState', () => ({
    default: (selector: (state: { todoData: typeof mockTodoData }) => any) => selector({
        todoData: mockTodoData,
    }),
}));

import ListToDoCards from '../src/ListToDoCards';

describe('ListToDoCards Component', () => {
    beforeEach(() => {
        navigateMock.mockClear();
    });

    it('renders the heading and Add Todo button', () => {
        render(
            <MemoryRouter>
                <ListToDoCards/>
            </MemoryRouter>
        );
        expect(screen.getByRole('heading', {level: 1})).toHaveTextContent("Todo's");
        expect(screen.getByRole('button', {name: /add todo/i})).toBeInTheDocument();
    });

    it('renders SortByForTodo and FilterForTodo options', () => {
        render(
            <MemoryRouter>
                <ListToDoCards/>
            </MemoryRouter>
        );
        expect(screen.getByText(/options/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
        // Use getAllByLabelText to avoid multiple match error
        const descriptionLabels = screen.getAllByLabelText(/description/i);
        expect(descriptionLabels.length).toBeGreaterThan(0);
    });

    it('renders TodoCards with todoData', () => {
        render(
            <MemoryRouter>
                <ListToDoCards/>
            </MemoryRouter>
        );
        const bElements = Array.from(document.querySelectorAll('b'));
        bElements.forEach(b => console.log('b:', b.textContent));
        expect(bElements.length).toBeGreaterThanOrEqual(2);
        fireEvent.click(screen.getAllByRole('button', {name: /add todo/i})[0]);
        expect(navigateMock).toHaveBeenCalledWith('/addTodo');
    });
});
