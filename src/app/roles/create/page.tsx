import { Metadata } from 'next';

// models
import RoleForm from '@/components/RoleForm';

export const metadata: Metadata = {
  title: 'Create Role',
  description: 'Create a new role in the system',
};

const CreateRolePage = () => {
  return (
    <div className="p-4">
      <RoleForm />
    </div>
  );
};

export default CreateRolePage;
