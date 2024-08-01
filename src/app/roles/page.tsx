import { Metadata } from 'next';
import { Suspense } from 'react';

// components
import { Button } from '@/components/common/Button';

// ui
import RoleList from '@/ui/role/RoleList';

// components
import RoleSkeleton from '@/components/Skeleton/RoleSkeleTon';
import Tablist from '@/components/TabList';

// icons
import { PlusIcon } from '@/icons/PlusIcon';

export const metadata: Metadata = {
  title: 'Role Listing',
};

const RolePage = () => {
  return (
    <div className="relative shadow-lg sm:rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-lg">Company Role</h1>

        <Button
          variant="primary"
          type="button"
          ariaLabel="Add New User"
          customClass="ml-4 rounded-2xl"
          startIcon={<PlusIcon />}
        >
          Add New Role
        </Button>
      </div>

      <Tablist />

      <Suspense fallback={<RoleSkeleton />}>
        <RoleList />
      </Suspense>
    </div>
  );
};

export default RolePage;
