import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';

// components
import UserList from '@/ui/user/UserList';

// constants
import { DEFAULT_LIMIT } from '@/constants/defaultValue';

// components
import UserSkeleton from '@/components/Skeleton/UserSkeleton';
import { Button } from '@/components/common/Button';
import Tablist from '@/components/TabList';

// icons
import { PlusIcon } from '@/icons/PlusIcon';

// apis
import { getRoleList } from '@/api/role';

// constants
import { ROUTER } from '@/constants/router';

export const metadata: Metadata = {
  title: 'User Listing',
  description: 'List of all users in the company',
};

type UserPageProps = {
  searchParams?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: string;
    userRole?: string;
  };
};

const UserPage = async ({ searchParams = {} }: UserPageProps) => {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || DEFAULT_LIMIT;
  const sortBy = searchParams.sortBy || 'createdAt';
  const order = searchParams.order || 'desc';
  const userRole = searchParams.userRole || '';
  const roles = await getRoleList();

  return (
    <main className="px-14 py-4 shadow-lg sm:rounded-lg p-5">
      <Suspense fallback={<UserSkeleton />}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-lg">Company Users</h1>
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
        <Tablist />
        <UserList
          limit={limit}
          page={page}
          sortBy={sortBy}
          order={order}
          roles={roles}
          userRole={userRole}
        />
      </Suspense>
    </main>
  );
};

export default UserPage;
