import { Suspense } from 'react';

import { Metadata } from 'next';

// components
import UserList from '@/ui/user/UserList';

// constants
import { DEFAULT_LIMIT } from '@/constants/defaultValue';

// components
import UserSkeleton from '@/components/Skeleton/UserSkeleton';

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
      <Suspense fallback={<UserSkeleton />}>
        <UserList limit={limit} page={page} />
      </Suspense>
    </main>
  );
};

export default UserPage;
