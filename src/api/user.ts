// constants
import { API_ENDPOINT } from '@/constants/api-endpoint';

// models
import { UserModel } from '@/models/UserModel';

export const getUserList = async () => {
  const USER_LIST_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}`;

  const res = await fetch(USER_LIST_URL, {
    cache: 'no-store',
  });

  const data: UserModel[] = await res.json();

  return data;
};
