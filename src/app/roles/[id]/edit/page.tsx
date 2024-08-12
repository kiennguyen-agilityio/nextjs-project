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
  const role = await getRoleById(params.id);

  return {
    title: `${role.name} Role - Detailed Overview and Responsibilities`,
    description: `Learn about the ${role.name} role within the company, including key responsibilities, required skills, and associated team members. Discover how this role contributes to our overall mission.`,
  };
};

const RoleDetailPage = async ({ params }: PageProps) => {
  const { id } = params;

  const role: RoleModel = await getRoleById(id);

  return (
    <div className="p-4">
      <RoleForm id={id} role={role} />
    </div>
  );
};

export default RoleDetailPage;
