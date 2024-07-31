import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

// components
import UserList from '@/ui/user/UserList';

// constants
import { DEFAULT_LIMIT } from '@/constants/defaultValue';

// components
import UserSkeleton from '@/components/Skeleton/UserSkeleton';
import { Button } from '@/components/common/Button';

// icons
import { PlusIcon } from '@/icons/PlusIcon';

// constants
import { ROUTER } from '@/constants/router';

// apis
import { getRoleList } from '@/api/role';

export const metadata: Metadata = {
  title: 'User Listing',
};

type UserPageProps = {
  searchParams: {
    page: number;
    limit: number;
    sortBy: string;
    order: string;
    userRole: string;
  };
};

const UserPage = async ({ searchParams }: UserPageProps) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || DEFAULT_LIMIT;
  const sortBy = searchParams.sortBy || 'createdAt';
  const order = searchParams.order || 'desc';
  const userRole = searchParams.userRole || '';
  const roles = await getRoleList();

  return (
    <main>
      <Suspense fallback={<UserSkeleton />}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex-grow" />
          <Link href={ROUTER.USERS + '/create'}>
            <Button
              variant="primary"
              type="button"
              ariaLabel="Add New User"
              customClass="ml-4 rounded-2xl"
              startIcon={<PlusIcon />}
            >
              Add New User
            </Button>
          </Link>
        </div>
        <div>
          <UserList
            limit={limit}
            page={page}
            sortBy={sortBy}
            order={order}
            roles={roles}
            userRole={userRole}
          />
        </div>
      </Suspense>
    </main>
  );
};

export default UserPage;
