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
  title: 'User Account Creation - Add New Team Members',
  description:
    'Easily create a new user account for your team. Fill out the necessary details to onboard new members and grant them access to the company’s resources.',
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
