import { render, screen } from '@testing-library/react';

// components
import UserRow from '@/components/UserRow';

describe('UserInfo', () => {
  const mockProps = {
    avatar: 'https://s.net.vn/Ur2Q',
    email: 'test@example.com',
    name: 'John Doe',
    role: 'Admin',
    joinDate: '2022-01-01',
  };

  const setupUserRow = () => {
    const defaultProps = {
      ...mockProps,
    };

    return render(
      <table>
        <tbody>
          <UserRow {...defaultProps} />
        </tbody>
      </table>,
    );
  };

  it('should match the snapshot', () => {
    const { asFragment } = setupUserRow();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders user information correctly', () => {
    setupUserRow();

    expect(screen.getByAltText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.role)).toBeInTheDocument();
    expect(screen.getByText(mockProps.joinDate)).toBeInTheDocument();
  });

  it('renders the TripleDot component', () => {
    setupUserRow();

    expect(screen.getByTestId('triple-dot')).toBeInTheDocument();
  });
});
