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
    <td className="text-sm w-full truncate mb-4 sm:mb-0">{role}</td>
    <td className="text-sm w-full truncate mb-4 sm:mb-0">{joinDate}</td>
    <td className="w-full sm:w-1/12">
      <button className="text-gray-500" data-testid="triple-dot">
        <TripleDot />
      </button>
    </td>
  </tr>
);

export default UserRow;
