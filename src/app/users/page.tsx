import { Metadata } from 'next';

// components
import UserList from '@/ui/user/UserList';

// constants
import { DEFAULT_LIMIT } from '@/constants/defaultValue';

export const metadata: Metadata = {
  title: 'User Listing',
};

type UserPageProps = {
  searchParams: {
    page: number;
    limit: number;
  };
};

const UserPage = ({ searchParams }: UserPageProps) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || DEFAULT_LIMIT;
  return (
    <main>
      <UserList limit={limit} page={page} />
    </main>
  );
};

export default UserPage;
