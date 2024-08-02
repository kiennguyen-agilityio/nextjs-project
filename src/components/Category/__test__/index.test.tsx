import { render } from '@testing-library/react';

// components
import Category from '@/components/Category';

// mocks
import { roles } from '@/mocks';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));
test('renders Category component with dropdown buttons', () => {
  const { asFragment } = render(
    <table>
      <Category roles={roles} />
    </table>,
  );
  expect(asFragment()).toMatchSnapshot();
});
