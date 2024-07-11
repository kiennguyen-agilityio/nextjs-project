import { render } from '@testing-library/react';

// components
import Category from '@/components/common/Dropdown';

// mocks
import { categoryOptions } from '@/mocks';

test('renders dropdown button with label and options', () => {
  const { asFragment } = render(
    <Category label="Category" options={categoryOptions} />,
  );
  expect(asFragment()).toMatchSnapshot();
});
