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
  sortBy: string;
  order: string;
  role: string;
};

const UserList = async ({
  page,
  limit,
  sortBy,
  order,
  role,
}: UserListProps) => {
  const totalUsers = await getTotalUsers();
  const users = await getUserList(page, limit, sortBy, order, role);

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
