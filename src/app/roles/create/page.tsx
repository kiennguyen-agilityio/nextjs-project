import { Metadata } from 'next';

// models
import RoleForm from '@/components/RoleForm';

export const metadata: Metadata = {
  title: 'Create a New Role - Define Responsibilities and Permissions',
  description:
    'Establish a new role in the system by defining responsibilities, permissions, and access levels. Ensure that your team members have the appropriate roles to perform their duties effectively.',
};

const CreateRolePage = () => {
  return (
    <div className="p-4">
      <RoleForm />
    </div>
  );
};

export default CreateRolePage;
