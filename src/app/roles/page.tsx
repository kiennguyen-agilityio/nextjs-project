import { Metadata } from 'next';

// components
import { Button } from '@/components/common/Button';

// ui
import RoleList from '@/ui/role/RoleList';

export const metadata: Metadata = {
  title: 'Role Listing',
};

const RolePage = () => {
  return (
    <div className="relative shadow-lg sm:rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-8 bg-gray-500">
        Roles
      </h1>
      <RoleList />
      <div className="flex justify-end mt-4">
        <Button variant="primary" type="button" ariaLabel="Add New Role">
          Add New Role
        </Button>
      </div>
    </div>
  );
};

export default RolePage;
