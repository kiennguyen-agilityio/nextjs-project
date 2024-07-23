'use client';
import { useState } from 'react';

// models
import { UserModel } from '@/models/UserModel';

// components
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';

// models
import { SelectType } from '@/types/SelectType';

interface UserFormProps {
  user?: UserModel;
  roleName: string;
  roleOptions: SelectType[];
  selectedRole: string;
}

const UserForm = ({
  user,
  roleName,
  roleOptions,
  selectedRole,
}: UserFormProps) => {
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome aboard! We are excited you are here, and we look forward to working with you. We know with your skills and experience you're a great asset to our department. If you have any questions during your first week, please contact me at any time.",
  );

  const handleWelcomeMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setWelcomeMessage(event.target.value);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleUserNameChange = (newName: string) => {
    setName(newName);
  };

  return (
    <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">{roleName} role</h2>
      <p className="text-sm text-gray-600 mb-4">
        Everyone who works on your {roleName} can have different roles
        <a href="#" className="text-blue-500 ml-1">
          learn more
        </a>
      </p>

      <div className="mb-4">
        <Input
          type="name"
          value={name}
          customClass="mt-1 p-2 w-full border rounded-md"
          name="name"
          onChange={handleUserNameChange}
          label="Type Candidate Name"
        />
      </div>
      <div className="mb-4">
        <Input
          type="email"
          value={email}
          customClass="mt-1 p-2 w-full border rounded-md"
          name="email"
          onChange={handleEmailChange}
          label="Type Candidate Email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Role
        </label>
        <Dropdown
          label={selectedRole}
          options={roleOptions}
          customClass="mt-1 p-2 min-w-full rounded-md border py-4"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Welcome Message
        </label>
        <textarea
          className="mt-1 p-2 w-full border rounded-md"
          rows={4}
          value={welcomeMessage}
          onChange={handleWelcomeMessageChange}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button customClass="px-4 py-2 border rounded-md" variant="outline">
          Cancel
        </Button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Create User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
