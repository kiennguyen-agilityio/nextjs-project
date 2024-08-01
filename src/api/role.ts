'use server';
import { redirect } from 'next/navigation';

// constants
import { API_ENDPOINT } from '@/constants/api-endpoint';

// models
import { RoleModel } from '@/models/RoleModel';

import { ROUTER } from '@/constants/router';

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
      return { message: result.message || 'Failed to add user.' };
    }

    return result;
  } catch (error) {
    return {
      message:
        (error as Error).message || 'An error occurred while adding the user.',
    };
  } finally {
    redirect(ROUTER.ROLES);
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
      return { message: result.message || 'Failed to update role.' };
    }

    return result;
  } catch (error) {
    return {
      message:
        (error as Error).message ||
        'An error occurred while updating the role.',
    };
  } finally {
    redirect(ROUTER.ROLES);
  }
};

export const deleteRoleApi = async (id: string) => {
  const ROLE_DELETE_URL = `${process.env.API_URL}/${API_ENDPOINT.ROLE_LIST}/${id}`;

  try {
    const res = await fetch(ROLE_DELETE_URL, {
      method: 'DELETE',
    });

    const result = await res.json();

    if (!res.ok) {
      return { message: result.message || 'Failed to delete role.' };
    }

    return result;
  } catch (error) {
    return {
      message:
        (error as Error).message ||
        'An error occurred while deleting the role.',
    };
  } finally {
    redirect(ROUTER.ROLES);
  }
};
