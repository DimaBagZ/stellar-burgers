import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalUI } from '../../components/ui/modal/modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders modal with title and content', () => {
    render(
      <ModalUI title='Test Modal' onClose={mockOnClose}>
        <div>Test Content</div>
      </ModalUI>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClose when clicking close button', () => {
    render(
      <ModalUI title='Test Modal' onClose={mockOnClose}>
        <div>Test Content</div>
      </ModalUI>
    );

    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking overlay', () => {
    render(
      <ModalUI title='Test Modal' onClose={mockOnClose}>
        <div>Test Content</div>
      </ModalUI>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape key', () => {
    render(
      <ModalUI title='Test Modal' onClose={mockOnClose}>
        <div>Test Content</div>
      </ModalUI>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
