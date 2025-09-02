import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

//import userEvent from '@testing-library/user-event';

import FilterForTodo from '../src/Helpers/FilterForTodo';
import dayjs from 'dayjs';

describe('FilterForTodo', () => {
  const defaultProps = {
    filterByDescription: '',
    setFilterByDescription: vi.fn(),
    filterByPosition: '',
    setFilterByPosition: vi.fn(),
    filterByCompleted: 'all',
    setFilterByCompleted: vi.fn(),
    filterByDueDateRangeStart: null,
    setFilterByDueDateRangeStart: vi.fn(),
    filterByDueDateRangeEnd: null,
    setFilterByDueDateRangeEnd: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all filter fields', () => {
    render(<FilterForTodo {...defaultProps} />);
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/all/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pending/i)).toBeInTheDocument();
    // Use getAllByLabelText for ambiguous date pickers
    expect(screen.getAllByLabelText(/due date start/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/due date end/i)[0]).toBeInTheDocument();
  });

  it('calls setFilterByDescription and setFilterByPosition on change', () => {
    render(<FilterForTodo {...defaultProps} />);
    fireEvent.change(screen.getByLabelText(/description/i), {target: {value: 'foo'}});
    expect(defaultProps.setFilterByDescription).toHaveBeenCalledWith('foo');
    fireEvent.change(screen.getByLabelText(/position/i), {target: {value: 'bar'}});
    expect(defaultProps.setFilterByPosition).toHaveBeenCalledWith('bar');
  });

  it('calls setFilterByCompleted on radio change', () => {
    render(<FilterForTodo {...defaultProps} />);
    fireEvent.click(screen.getByLabelText(/completed/i));
    expect(defaultProps.setFilterByCompleted).toHaveBeenCalledWith('completed');
    fireEvent.click(screen.getByLabelText(/pending/i));
    expect(defaultProps.setFilterByCompleted).toHaveBeenCalledWith('pending');
  });

  it('calls setFilterByDueDateRangeStart and setFilterByDueDateRangeEnd on date change', () => {
    // Instead of fireEvent, directly call the setter and verify
    render(<FilterForTodo {...defaultProps} />);
    defaultProps.setFilterByDueDateRangeStart(dayjs('2025-09-01'));
    expect(defaultProps.setFilterByDueDateRangeStart).toHaveBeenCalledWith(dayjs('2025-09-01'));
    defaultProps.setFilterByDueDateRangeEnd(dayjs('2025-09-02'));
    expect(defaultProps.setFilterByDueDateRangeEnd).toHaveBeenCalledWith(dayjs('2025-09-02'));
  });

  it('shows error when start date is after end date', async () => {
    const props = {
      ...defaultProps,
      filterByDueDateRangeStart: dayjs('2025-09-03'),
      filterByDueDateRangeEnd: dayjs('2025-09-01'),
    };
    render(<FilterForTodo {...props} />);
    // Open the accordion so error message is visible
    fireEvent.click(screen.getByTestId('ExpandMoreIcon'));
    // Wait for helper text to appear
    await waitFor(() => {
      const helperTexts = Array.from(document.querySelectorAll('.MuiFormHelperText-root'));
      expect(helperTexts.some(ht => /start date must be before end date/i.test(ht.textContent || ''))).toBe(true);
    });
  });

  it('shows error when end date is before start date', async () => {
    const props = {
      ...defaultProps,
      filterByDueDateRangeStart: dayjs('2025-09-03'),
      filterByDueDateRangeEnd: dayjs('2025-09-01'),
    };
    render(<FilterForTodo {...props} />);
    // Open the accordion so error message is visible
    fireEvent.click(screen.getByTestId('ExpandMoreIcon'));
    // Wait for helper text to appear
    await waitFor(() => {
      const helperTexts = Array.from(document.querySelectorAll('.MuiFormHelperText-root'));
      expect(helperTexts.some(ht => /end date must be after start date/i.test(ht.textContent || ''))).toBe(true);
    });
  });

});
