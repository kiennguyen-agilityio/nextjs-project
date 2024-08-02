import { Metadata } from 'next';

// apis
import { getRoleById } from '@/api/role';

// models
import { RoleModel } from '@/models/RoleModel';

// types
import RoleForm from '@/components/RoleForm';

interface PageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const roleName = await getRoleById(params.id);

  return {
    title: roleName.name,
  };
};

const RoleDetailPage = async ({ params }: PageProps) => {
  const { id } = params;

  try {
    const role: RoleModel = await getRoleById(id);

    return (
      <div className="p-4">
        <RoleForm id={id} role={role} />
      </div>
    );
  } catch (error) {
    return null;
  }
};

export default RoleDetailPage;
