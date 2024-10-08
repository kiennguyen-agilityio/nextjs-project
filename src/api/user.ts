'use server';
import { redirect } from 'next/navigation';

// constants
import { API_ENDPOINT } from '@/constants/api-endpoint';
import { ROUTER } from '@/constants/router';

// models
import { UserModel } from '@/models/UserModel';

export const getUserList = async (
  page: number,
  limit: number,
  sortBy: string = 'createdAt',
  order: string = 'desc',
  userRole: string = '',
) => {
  const USER_LIST_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&userRole=${userRole}`;
  const res = await fetch(USER_LIST_URL, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user list');
  }

  const data: UserModel[] = await res.json();

  return data;
};

export const getTotalUsers = async () => {
  const USER_LIST_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}`;

  try {
    const res = await fetch(USER_LIST_URL, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch total users');
    }

    const data: UserModel[] = await res.json();

    // Handle case where data might be undefined or null
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format');
    }

    return data.length;
  } catch (error) {
    // Rethrow or handle the error
    throw new Error((error as Error).message || 'Failed to fetch total users');
  }
};

export const getUserById = async (id: string) => {
  const USER_BY_ID_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}/${id}`;

  try {
    const res = await fetch(USER_BY_ID_URL, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user by id');
    }

    const data: UserModel = await res.json();

    // Handle case where data might be undefined or null
    if (!data || typeof data !== 'object' || !('id' in data)) {
      throw new Error('Invalid user data received');
    }

    return data;
  } catch (error) {
    // Handle the error
    throw new Error(
      (error as Error).message || 'An error occurred while fetching the user',
    );
  }
};

export const updateUserApi = async (
  id: string,
  user: {
    name: string;
    email: string;
    userRole: string;
    joined: string;
    avatar?: string;
  },
) => {
  const USER_UPDATE_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}/${id}`;

  try {
    const res = await fetch(USER_UPDATE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || 'Failed to update user.',
      };
    }

    return {
      success: true,
      message: 'User updated successfully.',
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

export const deleteUserApi = async (id: string) => {
  const USER_DELETE_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}/${id}`;

  let success = true;
  let message = 'User deleted successfully.';

  try {
    const res = await fetch(USER_DELETE_URL, {
      method: 'DELETE',
    });

    const result = await res.json();

    if (!res.ok) {
      success = false;
      message = result.message || 'Failed to delete user.';
    }
  } catch (error) {
    success = false;
    message =
      (error as Error).message || 'An error occurred while deleting the user.';
  } finally {
    redirect(
      `${ROUTER.USERS}?success=${success}&message=${encodeURIComponent(message)}`,
    );
  }
};

export const addUserApi = async (user: {
  name: string;
  email: string;
  userRole: string;
  joined: string;
  avatar?: string;
}) => {
  const USER_ADD_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}`;

  try {
    const res = await fetch(USER_ADD_URL, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        createdAt: new Date().toISOString(),
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || 'Failed to add user.',
      };
    }

    return {
      success: true,
      message: 'User added successfully.',
      ...result,
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error).message || 'An error occurred while adding the user.',
    };
  }
};

export const getUsers = async (): Promise<UserModel[]> => {
  const USER_LIST_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}`;

  const res = await fetch(USER_LIST_URL, {
    cache: 'no-store',
  });

  const data: UserModel[] = await res.json();

  return data;
};
