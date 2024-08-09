import { render, screen, fireEvent } from '@testing-library/react';
import RoleForm from '@/components/RoleForm';
import { RoleModel } from '@/models/RoleModel';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{}, () => {}, false],
  useFormStatus: () => ({ pending: false }),
}));

const role: RoleModel = {
  id: '1',
  name: 'Admin',
  description: 'Administrator role with full permissions',
};

// Reset mocks before each test
beforeEach(() => {
  jest.resetAllMocks();
});

describe('RoleForm', () => {
  test('renders empty role form', () => {
    const { asFragment } = render(<RoleForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders role form with initial data', () => {
    render(<RoleForm id={role.id} role={role} />);
    expect(screen.getByLabelText('Type name')).toHaveValue(role.name);
    expect(screen.getByLabelText('Description')).toHaveValue(role.description);
  });

  test('handles input change for name field', () => {
    render(<RoleForm id={role.id} role={role} />);
    const nameInput = screen.getByLabelText('Type name');
    fireEvent.change(nameInput, { target: { value: 'Manager' } });
    expect(nameInput).toHaveValue('Manager');
  });

  test('handles input change for description field', () => {
    render(<RoleForm id={role.id} role={role} />);
    const descriptionTextarea = screen.getByLabelText('Description');
    fireEvent.change(descriptionTextarea, {
      target: { value: 'Manager role' },
    });
    expect(descriptionTextarea).toHaveValue('Manager role');
  });

  test('submit button is disabled if form has not changed', () => {
    render(<RoleForm id={role.id} role={role} />);
    const submitButton = screen.getByText('Update Role');
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled if form has changed', () => {
    render(<RoleForm id={role.id} role={role} />);
    const nameInput = screen.getByLabelText('Type name');
    fireEvent.change(nameInput, { target: { value: 'Manager' } });
    const submitButton = screen.getByText('Update Role');
    expect(submitButton).toBeEnabled();
  });
});
