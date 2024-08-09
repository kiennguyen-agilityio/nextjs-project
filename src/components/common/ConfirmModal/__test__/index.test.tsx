import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConfirmationModal from '..';

describe('ConfirmationModal component', () => {
  test('does not render when isOpen is false', () => {
    render(
      <ConfirmationModal
        isOpen={false}
        onConfirm={() => {}}
        onCancel={() => {}}
        message="Are you sure?"
      />,
    );
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={() => {}}
        onCancel={() => {}}
        message="Are you sure?"
      />,
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  test('calls onCancel when Cancel button is clicked', () => {
    const handleCancel = jest.fn();
    render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={() => {}}
        onCancel={handleCancel}
        message="Are you sure?"
      />,
    );

    fireEvent.click(screen.getByText('Cancel'));

    waitFor(() => {
      expect(handleCancel).toHaveBeenCalledTimes(1);
    });
  });

  test('calls onConfirm and manages loading state when Confirm button is clicked', async () => {
    const handleConfirm = jest.fn(
      () => new Promise((resolve) => setTimeout(resolve, 1000)),
    );

    render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={handleConfirm}
        onCancel={() => {}}
        message="Are you sure?"
      />,
    );

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(handleConfirm).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Confirm')).not.toHaveAttribute('disabled');
    });
  });

  test('does not render buttons if loading is true', async () => {
    const { container } = render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={async () => {}}
        onCancel={() => {}}
        message="Are you sure?"
      />,
    );

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(container.querySelector('button[disabled]')).toBeInTheDocument();
    });
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(
      <ConfirmationModal
        isOpen={true}
        onConfirm={() => {}}
        onCancel={() => {}}
        message="Are you sure?"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
