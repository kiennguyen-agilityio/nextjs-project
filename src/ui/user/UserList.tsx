// components
import Category from '@/components/Category';
import UserRow from '@/components/UserRow';
import Pagination from '@/components/common/Pagination';

// services
import { getTotalUsers, getUserList } from '@/api/user';

type UserListProps = {
  page: number;
  limit: number;
};

const UserList = async ({ page, limit }: UserListProps) => {
  const totalUsers = await getTotalUsers();
  const users = await getUserList(page, limit);

  return (
    <>
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

      <Pagination totalUsers={totalUsers} limit={limit} currentPage={page} />
    </>
  );
};

export default UserList;
