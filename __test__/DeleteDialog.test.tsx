import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteDialog from '../src/Dialogs/DeleteDialog';

describe('DeleteDialog', () => {
  const description = 'Test Todo';
  const handleCancel = vi.fn();
  const handleConfirmDelete = vi.fn();

  it('renders dialog with correct description when open', () => {
    render(
      <DeleteDialog
        description={description}
        openDialog={true}
        handleCancel={handleCancel}
        handleConfirmDelete={handleConfirmDelete}
      />
    );
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
    expect(screen.getByText(/Test Todo/)).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls handleCancel when Cancel button is clicked', () => {
    render(
      <DeleteDialog
        description={description}
        openDialog={true}
        handleCancel={handleCancel}
        handleConfirmDelete={handleConfirmDelete}
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleCancel).toHaveBeenCalled();
  });

  it('calls handleConfirmDelete when Delete button is clicked', () => {
    render(
      <DeleteDialog
        description={description}
        openDialog={true}
        handleCancel={handleCancel}
        handleConfirmDelete={handleConfirmDelete}
      />
    );
    fireEvent.click(screen.getByText('Delete'));
    expect(handleConfirmDelete).toHaveBeenCalled();
  });

  it('does not render dialog when openDialog is false', () => {
    render(
      <DeleteDialog
        description={description}
        openDialog={false}
        handleCancel={handleCancel}
        handleConfirmDelete={handleConfirmDelete}
      />
    );
    expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
  });
});

