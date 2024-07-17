import { render, screen } from '@testing-library/react';

// components
import UserRow from '@/components/UserRow';

// models
import { UserModel } from '@/models/UserModel';

jest.mock('@/api/role', () => ({
  getRoleById: jest.fn().mockResolvedValue({ id: 1, name: 'Admin' }),
}));

async function resolvedComponent(
  Component: (props: UserModel) => Promise<JSX.Element>,
  props: UserModel,
) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('UserRow', () => {
  const mockProps: UserModel = {
    avatar: 'https://s.net.vn/Ur2Q',
    email: 'test@example.com',
    name: 'John Doe',
    userRole: 1,
    joined: new Date('2022-01-01'),
    id: '1',
  };

  it('should render all the content', async () => {
    const UserRowResolved = await resolvedComponent(UserRow, {
      ...mockProps,
    });
    const { asFragment } = render(
      <table>
        <tbody>
          <UserRowResolved />
        </tbody>
      </table>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders user information correctly', async () => {
    const UserRowResolved = await resolvedComponent(UserRow, {
      ...mockProps,
    });
    render(
      <table>
        <tbody>
          <UserRowResolved />
        </tbody>
      </table>,
    );

    expect(screen.getByAltText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('1/1/2022')).toBeInTheDocument();
  });

  it('renders the TripleDot component', async () => {
    const UserRowResolved = await resolvedComponent(UserRow, {
      ...mockProps,
    });
    render(
      <table>
        <tbody>
          <UserRowResolved />
        </tbody>
      </table>,
    );

    expect(screen.getByTestId('triple-dot')).toBeInTheDocument();
  });
});
