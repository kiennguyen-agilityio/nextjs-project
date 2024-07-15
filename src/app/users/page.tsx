// components
import Category from '@/components/Category';
import UserRow from '@/components/UserRow';

// mocks
import { users } from '@/mocks';

const UserListPage = () => (
  <div className="p-4">
    <table className="w-full table-auto">
      <Category />
      <tbody>
        {users.map(({ avatar, email, name, role, joinDate }) => (
          <UserRow
            key={email}
            avatar={avatar}
            email={email}
            name={name}
            role={role}
            joinDate={joinDate}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default UserListPage;
