'use server';
import { redirect } from 'next/navigation';

// constants
import { API_ENDPOINT } from '@/constants/api-endpoint';
import { LINKS } from '@/constants/router';

// models
import { UserModel } from '@/models/UserModel';

export const getUserList = async (page: number, limit: number) => {
  const USER_LIST_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}?page=${page}&limit=${limit}`;

  const res = await fetch(USER_LIST_URL, {
    cache: 'no-store',
  });

  const data: UserModel[] = await res.json();

  return data;
};

export const getTotalUsers = async () => {
  const USER_LIST_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}`;

  const res = await fetch(USER_LIST_URL, {
    cache: 'no-store',
  });

  const data: UserModel[] = await res.json();

  return data.length;
};

export const getUserById = async (id: string) => {
  const USER_BY_ID_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}/${id}`;
  const res = await fetch(USER_BY_ID_URL, {
    cache: 'no-store',
  });

  const data: UserModel = await res.json();

  return data;
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
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();

    if (!res.ok) {
      return { message: result.message || 'Failed to update user.' };
    }

    return result;
  } catch (error) {
    return {
      message:
        (error as Error).message ||
        'An error occurred while updating the user.',
    };
  } finally {
    redirect(LINKS[1].href);
  }
};
