import { Metadata } from 'next';

// models
import RoleForm from '@/components/RoleForm';

export const metadata: Metadata = {
  title: 'Create Role',
};

const CreateRolePage = async () => {
  return (
    <div className="p-4">
      <RoleForm />
    </div>
  );
};

export default CreateRolePage;
