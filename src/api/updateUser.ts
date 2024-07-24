import { API_ENDPOINT } from '@/constants/api-endpoint';
import { LINKS } from '@/constants/router';
import { extractFormData } from '@/utils/form';
import { revalidatePath } from 'next/cache';
import { redirect } from 'react-router-dom';
import { z } from 'zod';
import { getRoleById } from './role';

export type UserState = {
  errors?: {
    name?: string[];
    avatar?: string[];
    email?: string[];
    userRole?: string[];
    joined?: Date[];
  };
  message?: string | null;
};

const userKeys = ['name', 'email', 'userRole', 'joined'];

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  email: z
    .string({
      invalid_type_error: 'Please enter an email.',
    })
    .email('Invalid email address.'),
  userRole: z.string({
    invalid_type_error: 'Please select a user role.',
  }),
  avatar: z
    .string({
      invalid_type_error: 'Please enter an avatar URL.',
    })
    .url('Invalid URL.'),
  joined: z
    .date({
      invalid_type_error: 'Please enter a valid date.',
    })
    .refine((val) => !isNaN(val.getTime()), 'Invalid date format.'),
});
const User = FormSchema.omit({ id: true });

export const updateUser = async (
  id: string,
  _: UserState,
  formData: FormData,
) => {
  const extractedUser = extractFormData({ keys: userKeys, formData });

  // Validate form fields using Zod
  const validatedFields = User.safeParse(extractedUser);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }

  // Destructure validated fields
  const { name, email, userRole: userRoleId, joined } = validatedFields.data;

  try {
    // Fetch the role name using userRoleId
    const role = await getRoleById(userRoleId);
    const userRole = role.name;

    // Construct the user object
    const user = { name, email, userRole, joined };

    const USER_UPDATE_URL = `${process.env.API_URL}/${API_ENDPOINT.USER_LIST}/${id}`;
    const res = await fetch(USER_UPDATE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();

    if (!res.ok) {
      return { message: result.message || 'Failed to update user.' };
    }

    // Revalidate path and redirect if needed (replace with your actual logic)
    revalidatePath(LINKS[1].href);
    redirect(LINKS[1].href);

    return result;
  } catch (error) {
    return {
      message:
        (error as Error).message ||
        'An error occurred while updating the user.',
    };
  }
};
