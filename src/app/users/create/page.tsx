import { Metadata } from 'next';

// components
import UserForm from '@/components/UserForm';

// types
import { SelectType } from '@/types/SelectType';

// apis
import { getRoleList } from '@/api/role';

// models
import { RoleModel } from '@/models/RoleModel';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Create User',
};

const CreateUserPage = async () => {
  const totalRoles: RoleModel[] = await getRoleList();
  const roleOptions: SelectType[] = totalRoles.map((role) => ({
    id: role.id.toString(),
    label: role.name,
  }));

  return (
    <Suspense>
      <div className="p-4">
        <UserForm roleOptions={roleOptions} />
      </div>
    </Suspense>
  );
};

export default CreateUserPage;
