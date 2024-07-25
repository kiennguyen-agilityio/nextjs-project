'use server';
import { z } from 'zod';

// utils
import { extractFormData } from '@/utils/form';
import { updateUserApi } from '@/api/user';

// api

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
  // avatar: z
  //   .string({
  //     invalid_type_error: 'Please enter an avatar URL.',
  //   })
  //   .url('Invalid URL.'),
  joined: z.string({
    invalid_type_error: 'Please enter a valid date.',
  }),
});
const User = FormSchema.omit({ id: true });

export const validateUser = async (
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
  const { name, email, userRole, joined } = validatedFields.data;

  // Construct the user object
  const user = { name, email, userRole, joined };

  // Call the API
  const result = await updateUserApi(id, user);

  if (result.message) {
    return { message: result.message };
  }

  return result;
};
