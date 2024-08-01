import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';

// components
import { Button } from '@/components/common/Button';
import RoleList from '@/ui/role/RoleList';

// ui
import RoleSkeleton from '@/components/Skeleton/RoleSkeleTon';
import Tablist from '@/components/TabList';

// icons
import { PlusIcon } from '@/icons/PlusIcon';

// apis
import { getRoleList } from '@/api/role';

// constants
import { ROUTER } from '@/constants/router';

export const metadata: Metadata = {
  title: 'Role Listing',
};

const RolePage = async () => {
  const roles = await getRoleList();

  return (
    <div className="relative shadow-lg sm:rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-lg">Company Users</h1>
        <Link href={ROUTER.ROLES + '/create'}>
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

      <Suspense fallback={<RoleSkeleton />}>
        <RoleList roleList={roles} />
      </Suspense>
    </div>
  );
};

export default RolePage;
