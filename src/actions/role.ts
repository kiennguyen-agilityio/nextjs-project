'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// utils
import { extractFormData } from '@/utils/form';

// apis
import { addRoleApi, updateRoleApi } from '@/api/role';

// constants
import { ROUTER } from '@/constants/router';

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
      message: 'Missing Fields. Failed to Update Role.',
    };
  }

  const { name, description } = validatedFields.data;
  const role = { name, description };
  const result = await updateRoleApi(id, role);

  if (result.success) {
    revalidatePath(`${ROUTER.ROLES}/${id}/edit`);
    redirect(
      `${ROUTER.ROLES}?success=true&message=${encodeURIComponent(result.message)}`,
    );
  } else {
    redirect(
      `${ROUTER.ROLES}/${id}/edit?success=false&message=${encodeURIComponent(result.message)}`,
    );
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

  if (result.success) {
    redirect(
      `${ROUTER.ROLES}?success=true&message=${encodeURIComponent(result.message || 'Role created successfully.')}`,
    );
  } else {
    redirect(
      `${ROUTER.ROLES}?success=false&message=${encodeURIComponent(result.message || 'Failed to create role.')}`,
    );
  }
  return result;
};
