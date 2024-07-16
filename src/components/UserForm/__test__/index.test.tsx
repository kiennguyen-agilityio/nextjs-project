import { render } from '@testing-library/react';

// components
import UserForm from '@/components/UserForm';

test('renders user form', () => {
  const { asFragment } = render(<UserForm />);
  expect(asFragment()).toMatchSnapshot();
});
