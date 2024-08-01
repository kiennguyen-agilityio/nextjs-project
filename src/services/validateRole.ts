'use server';
import { z } from 'zod';

// utils
import { extractFormData } from '@/utils/form';
import { addRoleApi, updateRoleApi } from '@/api/role';

export type RoleState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const roleKeys = ['name', 'description'];
const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  description: z.string({
    invalid_type_error: 'Please enter an description.',
  }),
});

export const validateRole = async (
  id: string,
  _: RoleState,
  formData: FormData,
) => {
  const extractedUser = extractFormData({ keys: roleKeys, formData });

  // Validate form fields using Zod
  const validatedFields = FormSchema.safeParse(extractedUser);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }

  const { name, description } = validatedFields.data;
  const role = { name, description };

  const result = await updateRoleApi(id, role);

  if (result.message) {
    return { message: result.message };
  }

  return result;
};

const UserSchema = FormSchema.omit({ id: true });

export const createRole = async (_: RoleState, formData: FormData) => {
  const extractedUser = extractFormData({ keys: roleKeys, formData });

  // Validate form fields using Zod
  const validatedFields = UserSchema.safeParse(extractedUser);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { name, description } = validatedFields.data;
  const role = { name, description };

  const result = await addRoleApi(role);

  if (result.message) {
    return { message: result.message };
  }

  return result;
};
