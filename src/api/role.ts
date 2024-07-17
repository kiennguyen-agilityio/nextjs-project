// constants
import { API_ENDPOINT } from '@/constants/api-endpoint';

// models
import { RoleModel } from '@/models/RoleModel';

export const getRoleById = async (id: number) => {
  const ALL_ROLES_URL = `${process.env.API_URL}/${API_ENDPOINT.ROLE_LIST}/${id}`;

  const res = await fetch(ALL_ROLES_URL, {});

  const data: RoleModel = await res.json();

  return data;
};
