'use client';
import { useState } from 'react';

// components
import TripleDotActions from '@/components/TripleDotAction';

// models
import { RoleModel } from '@/models/RoleModel';

// apis
import { deleteRoleApi } from '@/api/role';
import { ROUTER } from '@/constants/router';

type RoleListProps = {
  showError?: boolean;
  roleList: RoleModel[];
};

const RoleList = ({ roleList }: RoleListProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  const handleOnBlur = () => setOpenDropdownId(null);

  const handleOnDelete = async (id: string) => {
    const result = await deleteRoleApi(id);

    if (result?.message) {
      console.error('Failed to delete role:', result.message);
    } else {
      console.log('Role deleted successfully');
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Description</th>
        </tr>
      </thead>
      <tbody>
        {roleList.map(({ id, name, description }, index) => (
          <tr key={id} className="text-center hover:bg-gray-100 ">
            <td className="py-2 px-4 border-b">{index + 1}</td>
            <td className="py-2 px-4 border-b">{name}</td>
            <td className="py-2 px-4 border-b">{description}</td>
            <td className="py-2 px-4 border-b w-full sm:w-1/12">
              <TripleDotActions
                link={ROUTER.ROLES + `/${id}/edit`}
                isDropdownOpen={openDropdownId === id}
                toggleDropdown={() => toggleDropdown(id)}
                onBlur={handleOnBlur}
                onDelete={() => handleOnDelete(id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoleList;
