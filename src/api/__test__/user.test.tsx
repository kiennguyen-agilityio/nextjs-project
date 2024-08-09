import { redirect } from 'next/navigation';

// apis
import {
  getUserList,
  getTotalUsers,
  getUserById,
  updateUserApi,
  deleteUserApi,
  addUserApi,
  getUsers,
} from '@/api/user';

// constants
import { API_ENDPOINT } from '@/constants/api-endpoint';
import { ROUTER } from '@/constants/router';

// models
import { UserModel } from '@/models/UserModel';

global.fetch = jest.fn();

jest.mock('next/navigation', () => ({
  redirect: jest.fn() as jest.Mock,
}));

describe('User API Functions', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (redirect as unknown as jest.Mock).mockClear();
  });

  describe('getUserList', () => {
    it('should fetch and return user list successfully', async () => {
      const mockUsers: UserModel[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          userRole: 'Admin',
          avatar: 'avatar.jpg',
          joined: new Date('2023-01-01'),
        },
      ];
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsers),
      });

      const users = await getUserList(1, 10);
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}?page=1&limit=10&sortBy=createdAt&order=desc&userRole=`,
        { cache: 'no-store' },
      );
      expect(users).toEqual(mockUsers);
    });

    it('should handle errors during fetch', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });

      await expect(getUserList(1, 10)).rejects.toThrow(
        'Failed to fetch user list',
      );
    });
  });

  describe('getTotalUsers', () => {
    it('should fetch and return total number of users', async () => {
      const mockUsers: UserModel[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          userRole: 'Admin',
          avatar: 'avatar.jpg',
          joined: new Date('2023-01-01'),
        },
      ];
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsers),
      });

      const total = await getTotalUsers();
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}`,
        { cache: 'no-store' },
      );
      expect(total).toBe(mockUsers.length);
    });

    it('should handle errors during fetch', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });

      await expect(getTotalUsers()).rejects.toThrow(
        'Failed to fetch total users',
      );
    });
  });

  describe('getUserById', () => {
    it('should fetch and return user by id successfully', async () => {
      const mockUser: UserModel = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        userRole: 'Admin',
        avatar: 'avatar.jpg',
        joined: new Date('2023-01-01'),
      };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      });

      const user = await getUserById('1');
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}/1`,
        { cache: 'no-store' },
      );
      expect(user).toEqual(mockUser);
    });

    it('should handle errors during fetch', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });

      await expect(getUserById('1')).rejects.toThrow('Failed to fetch user');
    });
  });

  describe('updateUserApi', () => {
    it('should update user successfully', async () => {
      const mockResult = { message: 'User updated successfully.' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResult),
      });

      const response = await updateUserApi('1', {
        name: 'John Doe',
        email: 'john@example.com',
        userRole: 'Admin',
        joined: '2023-01-01',
      });

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}/1`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            userRole: 'Admin',
            joined: '2023-01-01',
          }),
        },
      );
      expect(response).toEqual({
        success: true,
        message: 'User updated successfully.',
      });
    });

    it('should handle errors during update user', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Error' }),
      });

      const response = await updateUserApi('1', {
        name: 'John Doe',
        email: 'john@example.com',
        userRole: 'Admin',
        joined: '2023-01-01',
      });

      expect(response).toEqual({ success: false, message: 'Error' });
    });

    it('should handle fetch errors during update user', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const response = await updateUserApi('1', {
        name: 'John Doe',
        email: 'john@example.com',
        userRole: 'Admin',
        joined: '2023-01-01',
      });

      expect(response).toEqual({ success: false, message: 'Network error' });
    });
  });

  describe('deleteUserApi', () => {
    it('should delete user successfully and redirect', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      });

      await deleteUserApi('1');

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}/1`,
        {
          method: 'DELETE',
        },
      );
      expect(redirect).toHaveBeenCalledWith(
        `${ROUTER.USERS}?success=true&message=${encodeURIComponent('User deleted successfully.')}`,
      );
    });

    it('should handle errors during delete user', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Error' }),
      });

      await deleteUserApi('1');

      expect(redirect).toHaveBeenCalledWith(
        `${ROUTER.USERS}?success=false&message=${encodeURIComponent('Error')}`,
      );
    });

    it('should handle fetch errors during delete user', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await deleteUserApi('1');

      expect(redirect).toHaveBeenCalledWith(
        `${ROUTER.USERS}?success=false&message=${encodeURIComponent('Network error')}`,
      );
    });
  });

  describe('addUserApi', () => {
    it('should add a new user successfully', async () => {
      // Arrange
      const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        userRole: 'user',
        joined: '2022-01-01',
        avatar: 'avatar.jpg',
      };

      const mockResult = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        userRole: 'user',
        joined: '2022-01-01',
        avatar: 'avatar.jpg',
        createdAt: new Date().toISOString(),
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResult),
      });

      const result = await addUserApi(user);

      expect(result.success).toBe(true);
      expect(result.message).toBe('User added successfully.');
    });

    it('should handle errors during add user', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Error' }),
      });

      const response = await addUserApi({
        name: 'John Doe',
        email: 'john@example.com',
        userRole: 'Admin',
        joined: '2023-01-01',
      });

      expect(response).toEqual({ success: false, message: 'Error' });
    });

    it('should handle fetch errors during add user', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const response = await addUserApi({
        name: 'John Doe',
        email: 'john@example.com',
        userRole: 'Admin',
        joined: '2023-01-01',
      });

      expect(response).toEqual({ success: false, message: 'Network error' });
    });
  });

  describe('getUsers', () => {
    it('should fetch and return all users', async () => {
      const mockUsers: UserModel[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          userRole: 'Admin',
          avatar: 'avatar.jpg',
          joined: new Date('2023-01-01'),
        },
      ];
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsers),
      });

      const users = await getUsers();
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}`,
        { cache: 'no-store' },
      );
      expect(users).toEqual(mockUsers);
    });

    it('should handle errors during fetch', async () => {
      (fetch as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch users'),
      );

      await expect(getUsers()).rejects.toThrow('Failed to fetch users');
    });
  });
});
