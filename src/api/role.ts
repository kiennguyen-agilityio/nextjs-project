'use server';
import { redirect } from 'next/navigation';

// constants
import { API_ENDPOINT } from '@/constants/api-endpoint';

// constants
import { ROUTER } from '@/constants/router';

// models
import { RoleModel } from '@/models/RoleModel';

export const getRoleList = async (
  sortBy: string = 'createdAt',
  order: string = 'desc',
) => {
  const USER_LIST_URL = `${process.env.API_URL}/${API_ENDPOINT.ROLE_LIST}?sortBy=${sortBy}&order=${order}`;

  const res = await fetch(USER_LIST_URL, {
    cache: 'no-store',
  });

  const data: RoleModel[] = await res.json();

  return data;
};

export const getRoleById = async (id: string) => {
  const ALL_ROLES_URL = `${process.env.API_URL}/${API_ENDPOINT.ROLE_LIST}/${id}`;

  const res = await fetch(ALL_ROLES_URL, {});

  const data: RoleModel = await res.json();

  return data;
};

export const addRoleApi = async (role: {
  name: string;
  description: string;
}) => {
  const ROLE_ADD_URL = `${process.env.API_URL}/${API_ENDPOINT.ROLE_LIST}`;

  try {
    const res = await fetch(ROLE_ADD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...role, createdAt: new Date() }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || 'Failed to add role.',
      };
    }

    return { success: true, ...result };
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error).message || 'An error occurred while adding the role.',
    };
  }
};

export const updateRoleApi = async (
  id: string,
  role: {
    name: string;
    description: string;
  },
) => {
  const ROLE_UPDATE_URL = `${process.env.API_URL}/${API_ENDPOINT.ROLE_LIST}/${id}`;

  try {
    const res = await fetch(ROLE_UPDATE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(role),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || 'Failed to update role.',
      };
    }

    return {
      success: true,
      message: 'Role updated successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error).message ||
        'An error occurred while updating the user.',
    };
  }
};

export const deleteRoleApi = async (id: string) => {
  const ROLE_DELETE_URL = `${process.env.API_URL}/${API_ENDPOINT.ROLE_LIST}/${id}`;

  let success = true;
  let message = 'Role deleted successfully.';

  try {
    const res = await fetch(ROLE_DELETE_URL, {
      method: 'DELETE',
    });

    const result = await res.json();

    if (!res.ok) {
      success = false;
      message = result.message || 'Failed to delete role.';
    }
  } catch (error) {
    success = false;
    message =
      (error as Error).message || 'An error occurred while deleting the role.';
  } finally {
    redirect(
      `${ROUTER.ROLES}?success=${success}&message=${encodeURIComponent(message)}`,
    );
  }
};
