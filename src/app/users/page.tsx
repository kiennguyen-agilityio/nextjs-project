import { Metadata } from 'next';

// components
import UserList from '@/ui/user/UserList';

export const metadata: Metadata = {
  title: 'User Listing',
};

const UserPage = () => {
  return (
    <main>
      <UserList />
    </main>
  );
};

export default UserPage;
