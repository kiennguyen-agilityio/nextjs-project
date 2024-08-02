import { render } from '@testing-library/react';

// components
import RoleForm from '@/components/RoleForm';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{}, () => {}],
  useFormStatus: () => ({ pending: false }),
}));

test('renders role form', () => {
  const { asFragment } = render(<RoleForm />);
  expect(asFragment()).toMatchSnapshot();
});
