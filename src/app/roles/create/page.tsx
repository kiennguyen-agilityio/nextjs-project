import { Metadata } from 'next';

// models
import RoleForm from '@/components/RoleForm';

export const metadata: Metadata = {
  title: 'Create a New Role - Define Responsibilities and Permissions',
  description:
    'Set up a new role by defining its responsibilities and permissions. Ensure team members have the right access for their duties.',
};

const CreateRolePage = () => {
  return (
    <div className="p-4">
      <RoleForm />
    </div>
  );
};

export default CreateRolePage;
