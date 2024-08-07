'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';

// components
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { SubmitButton } from '@/components/SubmitButton';

// models
import { RoleModel } from '@/models/RoleModel';

// services
import { createRole, RoleState, validateRole } from '@/actions/role';

// constants
import { ROUTER } from '@/constants/router';

// icons
import { BackIcon } from '@/icons/BackIcon';

export interface RoleFormProps {
  id?: string;
  role?: RoleModel;
}

const RoleForm = ({ id, role }: RoleFormProps) => {
  const [initialFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const initialState: RoleState = { message: null, errors: {} };

  const updateRoleWithId = validateRole.bind(null, id || '');

  const [state, dispatch] = useFormState(
    id ? updateRoleWithId : createRole,
    initialState,
  );

  const hasFormChanged = () => {
    const data = JSON.stringify(formData) !== JSON.stringify(initialFormData);
    return data;
  };

  return (
    <form
      className="max-w-full md:max-w-2xl lg:max-w-4xl xl:max-w-full mx-auto p-4 bg-white shadow-md rounded-lg"
      action={dispatch}
    >
      <h2 className="text-xl font-bold mb-4">Role</h2>
      <p className="text-sm text-gray-600 mb-4">
        Everyone who works on your {formData.name} can have different roles
        <a href="#" className="text-blue-500 ml-1">
          learn more
        </a>
      </p>
      <div className="mb-4">
        <Input
          type="role"
          name="name"
          value={formData.name}
          label="Type name"
          onChange={(value) => handleInputChange('name', value)}
        />

        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-600" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
        />

        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description &&
            state.errors.description.map((error: string) => (
              <p className="mt-2 text-sm text-red-600" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="w-full sm:w-auto">
          <Link href={ROUTER.ROLES}>
            <Button
              customClass="w-full sm:w-auto px-4 py-2 border border-blue-500 text-blue-500 rounded-md"
              variant="outline"
              startIcon={<BackIcon />}
            >
              Back to Role List
            </Button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 w-full sm:w-auto">
          <Link href={ROUTER.ROLES}>
            <Button
              customClass="w-full sm:w-auto px-4 py-2 border rounded-md"
              variant="outline"
            >
              Cancel
            </Button>
          </Link>
          <SubmitButton
            label={id ? 'Update Role' : 'Create Role'}
            disabled={!hasFormChanged()}
          />
        </div>
      </div>
    </form>
  );
};

export default RoleForm;
