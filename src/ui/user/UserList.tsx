// components
import Category from '@/components/Category';
import UserRow from '@/components/UserRow';

// services
import { getUserList } from '@/api/user';

const UserList = async () => {
  const users = await getUserList();

  return (
    <div className="p-4">
      <table className="w-full table-auto">
        <Category />
        <tbody>
          {users.map(({ id, avatar, email, name, userRole, joined }) => (
            <UserRow
              id={id}
              key={id}
              avatar={avatar}
              email={email}
              name={name}
              userRole={userRole}
              joined={joined}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
