import { redirect } from 'next/navigation';

// apis
import {
  getRoleList,
  getRoleById,
  addRoleApi,
  updateRoleApi,
  deleteRoleApi,
} from '@/api/role';

// constants
import { API_ENDPOINT } from '@/constants/api-endpoint';
import { ROUTER } from '@/constants/router';

global.fetch = jest.fn();

jest.mock('next/navigation', () => ({
  redirect: jest.fn() as jest.Mock,
}));

describe('Roles API Functions', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (redirect as unknown as jest.Mock).mockClear();
  });
  describe('getRoleList', () => {
    it('should fetch and return role list successfully', async () => {
      const mockRoles = [{ id: '1', name: 'Admin', description: 'Admin role' }];
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockRoles),
      });

      const roles = await getRoleList();
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_URL}/roles?sortBy=createdAt&order=desc`,
        { cache: 'no-store' },
      );
      expect(roles).toEqual(mockRoles);
    });

    it('should handle errors during fetch', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });

      await expect(getRoleList()).resolves.toBeUndefined();
    });
  });

  describe('getRoleById', () => {
    it('should fetch and return role by id successfully', async () => {
      const mockRole = { id: '1', name: 'Admin', description: 'Admin role' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockRole),
      });

      const role = await getRoleById('1');
      expect(fetch).toHaveBeenCalledWith(`${process.env.API_URL}/roles/1`, {});
      expect(role).toEqual(mockRole);
    });

    it('should handle errors during fetch', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });

      await expect(getRoleById('1')).resolves.toBeUndefined();
    });
  });

  describe('addRoleApi', () => {
    it('should add role successfully', async () => {
      const mockResult = { id: '1', name: 'Admin', description: 'Admin role' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResult),
      });

      const response = await addRoleApi({
        name: 'Admin',
        description: 'Admin role',
      });

      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_URL}/${API_ENDPOINT.ROLE_LIST}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Admin',
            description: 'Admin role',
            createdAt: new Date().toISOString(),
          }),
        },
      );
      expect(response).toEqual({ success: true, ...mockResult });
    });

    it('should handle errors during add role', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Error' }),
      });

      const response = await addRoleApi({
        name: 'Admin',
        description: 'Admin role',
      });

      expect(response).toEqual({ success: false, message: 'Error' });
    });

    it('should handle fetch errors during add role', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const response = await addRoleApi({
        name: 'Admin',
        description: 'Admin role',
      });

      expect(response).toEqual({
        success: false,
        message: 'Network error',
      });
    });
  });

  describe('updateRoleApi', () => {
    it('should update role successfully', async () => {
      const mockResult = { message: 'Role updated successfully.' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResult),
      });

      const response = await updateRoleApi('1', {
        name: 'Admin',
        description: 'Updated role',
      });

      expect(fetch).toHaveBeenCalledWith(`${process.env.API_URL}/roles/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Admin', description: 'Updated role' }),
      });
      expect(response).toEqual({ success: true, ...mockResult });
    });

    it('should handle errors during update role', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Error' }),
      });

      const response = await updateRoleApi('1', {
        name: 'Admin',
        description: 'Updated role',
      });

      expect(response).toEqual({ success: false, message: 'Error' });
    });

    it('should handle fetch errors during update role', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const response = await updateRoleApi('1', {
        name: 'Admin',
        description: 'Updated role',
      });

      expect(response).toEqual({
        success: false,
        message: 'Network error',
      });
    });
  });

  describe('deleteRoleApi', () => {
    it('should delete role successfully and redirect', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      });

      await deleteRoleApi('1');

      expect(fetch).toHaveBeenCalledWith(`${process.env.API_URL}/roles/1`, {
        method: 'DELETE',
      });
      expect(redirect).toHaveBeenCalledWith(
        `${ROUTER.ROLES}?success=true&message=${encodeURIComponent('Role deleted successfully.')}`,
      );
    });

    it('should handle errors during delete role', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Error' }),
      });

      await deleteRoleApi('1');

      expect(redirect).toHaveBeenCalledWith(
        `${ROUTER.ROLES}?success=false&message=${encodeURIComponent('Error')}`,
      );
    });

    it('should handle fetch errors during delete role', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await deleteRoleApi('1');

      expect(redirect).toHaveBeenCalledWith(
        `${ROUTER.ROLES}?success=false&message=${encodeURIComponent('Network error')}`,
      );
    });
  });
});
