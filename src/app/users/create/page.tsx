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
  title: 'Create User',
  description: 'Create a new user account.',
  keywords: ['user', 'create', 'management'],
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
