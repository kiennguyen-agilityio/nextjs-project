'use client';
import { useState } from 'react';
import { ROUTER } from '@/constants/router';

// components
import TripleDotActions from '@/components/TripleDotAction';
import ConfirmationModal from '@/components/common/ConfirmModal';

// models
import { RoleModel } from '@/models/RoleModel';

// apis
import { deleteRoleApi } from '@/api/role';

// constants
import { DEFAULT_ROW_CLASS } from '@/constants/defaultValue';

type RoleListProps = {
  roleList: RoleModel[];
};

const RoleList = ({ roleList }: RoleListProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const handleOnBlur = () => setOpenDropdownId(null);

  const handleOnDelete = (id: string) => {
    setSelectedRoleId(id);
    setModalMessage('Are you sure you want to delete this role?');
    setIsModalOpen(true);
  };

  const deleteRole = async () => {
    if (selectedRoleId) {
      await deleteRoleApi(selectedRoleId);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className={DEFAULT_ROW_CLASS}>ID</th>
            <th className={DEFAULT_ROW_CLASS}>Name</th>
            <th className={DEFAULT_ROW_CLASS}>Description</th>
            <th className={DEFAULT_ROW_CLASS} />
          </tr>
        </thead>
        <tbody>
          {roleList.map(({ id, name, description }, index) => (
            <tr key={id} className="text-center hover:bg-gray-100">
              <td className={DEFAULT_ROW_CLASS}>{index + 1}</td>
              <td className={DEFAULT_ROW_CLASS}>{name}</td>
              <td className={DEFAULT_ROW_CLASS}>{description}</td>
              <td className={`${DEFAULT_ROW_CLASS} w-full sm:w-1/12`}>
                <TripleDotActions
                  link={`${ROUTER.ROLES}/${id}/edit`}
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

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={deleteRole}
        onCancel={() => setIsModalOpen(false)}
        message={modalMessage !== null ? modalMessage : ''}
      />
    </>
  );
};

export default RoleList;
