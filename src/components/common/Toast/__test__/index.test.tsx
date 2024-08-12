import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/common/Toast';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Toast component', () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test('renders Toast with success type and message', () => {
    render(<Toast type="success" message="Success message" />);
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-green-500');
  });

  test('renders Toast with error type and message', () => {
    render(<Toast type="error" message="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-red-500');
  });

  test('hides Toast after duration', async () => {
    render(
      <Toast
        type="success"
        message="Success message"
        autoDismiss
        duration={500}
      />,
    );
    await waitFor(
      () => expect(screen.queryByText('Success message')).toBeNull(),
      { timeout: 600 },
    );
  });

  test('allows manual closing of Toast', () => {
    render(
      <Toast type="success" message="Success message" autoDismiss={false} />,
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByText('Success message')).toBeNull();
  });

  test('does not show Toast if autoDismiss is false', async () => {
    render(
      <Toast type="success" message="Success message" autoDismiss={false} />,
    );
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for a moment to ensure autoDismiss doesn't happen
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(
      <Toast type="success" message="Success message" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
