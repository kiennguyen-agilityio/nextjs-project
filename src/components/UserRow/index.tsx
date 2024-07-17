import Image from 'next/image';

// components
import { TripleDot } from '@/icons/TripleDot';

// models
import { UserModel } from '@/models/UserModel';
import { RoleModel } from '@/models/RoleModel';

// api
import { getRoleById } from '@/api/role';

const UserRow = async ({
  avatar,
  name,
  email,
  userRole,
  joined,
}: UserModel) => {
  const role: RoleModel = await getRoleById(userRole);

  return (
    <tr className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-10 pr-8 md:pr-0 justify-between p-0 sm:p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 ease-in-out">
      <td className="flex items-center w-full mb-4 sm:mb-0">
        <Image
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-lg mr-4"
          width={40}
          height={40}
        />
        <div className="text-sm font-medium sm:truncate max-w-24 xl:max-w-64 md:max-w-25">
          {email}
        </div>
      </td>
      <td className="text-sm w-full truncate mb-4 sm:mb-0">{name}</td>
      <td className="text-sm w-full truncate mb-4 sm:mb-0">{role.name}</td>
      <td className="text-sm w-full truncate mb-4 sm:mb-0">
        {new Date(joined).toLocaleDateString()}
      </td>
      <td className="w-full sm:w-1/12">
        <button className="text-gray-500" data-testid="triple-dot">
          <TripleDot />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
