import { render } from '@testing-library/react';

// components
import TableHeader from '@/components/TableHeader';

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
      <TableHeader roles={roles} />
    </table>,
  );
  expect(asFragment()).toMatchSnapshot();
});
