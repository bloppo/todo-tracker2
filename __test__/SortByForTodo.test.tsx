import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SortByForTodo from '../src/Helpers/SortByForTodo';

describe('SortByForTodo', () => {
  const mockSetSortBy = vi.fn();
  const mockSetSortAsc = vi.fn();
  const defaultProps = {
    sortBy: 'description',
    setSortBy: mockSetSortBy,
    sortAsc: true,
    setSortAsc: mockSetSortAsc,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all radio options and checkbox', () => {
    render(<SortByForTodo {...defaultProps} />);
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Position')).toBeInTheDocument();
    expect(screen.getByLabelText('Completed')).toBeInTheDocument();
    expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Ascending')).toBeInTheDocument();
  });

  it('calls setSortBy when a radio is clicked', () => {
    render(<SortByForTodo {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Position'));
    expect(mockSetSortBy).toHaveBeenCalledWith('position');
  });

  it('calls setSortAsc when checkbox is toggled', () => {
    render(<SortByForTodo {...defaultProps} sortAsc={false} />);
    fireEvent.click(screen.getByLabelText('Ascending'));
    expect(mockSetSortAsc).toHaveBeenCalledWith(true);
  });
});
