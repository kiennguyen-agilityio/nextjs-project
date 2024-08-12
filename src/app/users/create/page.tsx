import { Metadata } from 'next';

// components
import UserForm from '@/components/UserForm';

// types
import { SelectType } from '@/types/SelectType';

// apis
import { getRoleList } from '@/api/role';

// models
import { RoleModel } from '@/models/RoleModel';

export const metadata: Metadata = {
  title: 'Create User Account - Onboard New Team Members',
  description:
    'Create and set up a new user account. Provide necessary details to onboard team members and grant access to company resources.',
};

const CreateUserPage = async () => {
  const totalRoles: RoleModel[] = await getRoleList();
  const roleOptions: SelectType[] = totalRoles.map((role) => ({
    id: role.id.toString(),
    label: role.name,
  }));

  return (
    <div className="p-4">
      <UserForm roleOptions={roleOptions} />
    </div>
  );
};

export default CreateUserPage;
