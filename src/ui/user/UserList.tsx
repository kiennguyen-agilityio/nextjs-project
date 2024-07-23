// components
import Category from '@/components/Category';
import UserRow from '@/components/UserRow';
import Pagination from '@/components/common/Pagination';

// services
import { getTotalUsers, getUserList } from '@/api/user';
import { getRoleById } from '@/api/role';

// models
import { RoleModel } from '@/models/RoleModel';

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
          {users.map(async ({ id, avatar, email, name, userRole, joined }) => {
            const role: RoleModel = await getRoleById(userRole);

            return (
              <UserRow
                user={{
                  id,
                  avatar,
                  email,
                  name,
                  joined,
                  userRole,
                }}
                key={id}
                userRole={role.name}
              />
            );
          })}
        </tbody>
      </table>

      <Pagination totalUsers={totalUsers} limit={limit} currentPage={page} />
    </>
  );
};

export default UserList;
