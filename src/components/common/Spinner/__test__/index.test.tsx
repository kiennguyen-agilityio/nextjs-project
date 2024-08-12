import { render } from '@testing-library/react';
import Spinner from '@/components/common/Spinner';

test('renders Spinner component correctly', () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
});
