'use client';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

// models
import { UserModel } from '@/models/UserModel';

// components
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';

// models

// utils
import { formatDate } from '@/utils/formatDate';

// Models
import { SelectType } from '@/types/SelectType';

// services
import { validateUser } from '@/services/validateUser';

interface UserFormProps {
  id: string;
  user?: UserModel;
  roleName: string;
  roleOptions: SelectType[];
  selectedRole: string;
}

const UserForm = ({
  id,
  user,
  roleName,
  roleOptions,
  selectedRole,
}: UserFormProps) => {
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome aboard! We are excited you are here, and we look forward to working with you. We know with your skills and experience you're a great asset to our department. If you have any questions during your first week, please contact me at any time.",
  );

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    joined: user?.joined ? formatDate(user.joined) : '',
    userRole: selectedRole || '',
  });

  const handleInputChange = (name: string, value: string) => {
    if (name === 'welcomeMessage') {
      setWelcomeMessage(value);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleRoleChange = (role: string) => {
    setFormData((prevState) => ({
      ...prevState,
      userRole: role,
    }));
  };

  const joinedDate = formData.joined ? new Date(formData.joined) : new Date(0);

  const formattedDate = formatDate(joinedDate);
  const initialState = { message: null, errors: {} };

  const updateUSerWithId = validateUser.bind(null, id);

  const [state, dispatch] = useFormState(updateUSerWithId, initialState);

  const { pending } = useFormStatus();

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
      action={dispatch}
    >
      <h2 className="text-xl font-bold mb-4">{roleName} role</h2>
      <p className="text-sm text-gray-600 mb-4">
        Everyone who works on your {roleName} can have different roles
        <a href="#" className="text-blue-500 ml-1">
          learn more
        </a>
      </p>
      <div className="mb-4">
        <Input
          type="text"
          value={formData.name}
          customClass="mt-1 p-2 w-full border rounded-md"
          name="name"
          onChange={(value) => handleInputChange('name', value)}
          label="Type Candidate Name"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-fill-danger" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="email"
          value={formData.email}
          customClass="mt-1 p-2 w-full border rounded-md"
          name="email"
          onChange={(value) => handleInputChange('email', value)}
          label="Type Candidate Email"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email &&
            state.errors.email.map((error: string) => (
              <p className="mt-2 text-sm text-fill-danger" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="date"
          value={formattedDate}
          customClass="mt-1 p-2 w-full border rounded-md"
          name="joined"
          onChange={(value) => handleInputChange('joined', value)}
          label="Join Date"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.joined &&
            state.errors.joined.map((error: string) => (
              <p className="mt-2 text-sm text-fill-danger" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      {/*
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Avatar
        </label>
        <Input
          type="file"
          customClass="mt-1 p-2 w-full border rounded-md"
          name="avatar"
          onChange={(value) => handleInputChange('avatar', value)}
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-fill-danger" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div> */}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Role
        </label>
        <Dropdown
          label={selectedRole}
          options={roleOptions}
          onChange={handleRoleChange}
          customClass="mt-1 p-2 min-w-full rounded-md border py-4"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.userRole &&
            state.errors.userRole.map((error: string) => (
              <p className="mt-2 text-sm text-fill-danger" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Welcome Message
        </label>
        <textarea
          className="mt-1 p-2 w-full border rounded-md"
          rows={4}
          name="welcomeMessage"
          value={welcomeMessage}
          onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button customClass="px-4 py-2 border rounded-md" variant="outline">
          Cancel
        </Button>
        <Button
          customClass="px-4 py-2 bg-blue-500 text-white rounded-md"
          type="submit"
          disabled={pending}
        >
          Update User
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
