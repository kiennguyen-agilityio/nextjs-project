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
    title: `${role.name} Role - Overview & Responsibilities`,
    description: `Explore the ${role.name} role, including its key responsibilities, skills required, and its impact on our mission.`,
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
