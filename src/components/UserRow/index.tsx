import Image from 'next/image';

// components
import { TripleDot } from '@/icons/TripleDot';

interface UserRowProps {
  avatar: string;
  email: string;
  name: string;
  role: string;
  joinDate: string;
}

const UserRow = ({ avatar, email, name, role, joinDate }: UserRowProps) => (
  <tr className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200">
    <td className="flex items-center w-full sm:w-1/4 mb-4 sm:mb-0">
      <Image
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-lg mr-4"
        width={40}
        height={40}
      />
      <div className="text-sm font-medium truncate">{email}</div>
    </td>
    <td className="text-sm text-gray-500 w-full sm:w-1/6 truncate mb-4 sm:mb-0">
      {name}
    </td>
    <td className="text-sm w-full sm:w-1/6 truncate mb-4 sm:mb-0">{role}</td>
    <td className="text-sm w-full sm:w-1/6 truncate mb-4 sm:mb-0">
      {joinDate}
    </td>
    <td className="w-full sm:w-1/12">
      <button className="text-gray-500" data-testid="triple-dot">
        <TripleDot />
      </button>
    </td>
  </tr>
);

export default UserRow;
