'use server';
import { z } from 'zod';
import { redirect } from 'next/navigation';

// utils
import { extractFormData } from '@/utils/form';

// apis
import { addUserApi, updateUserApi } from '@/api/user';
import { uploadImage } from '@/api/image';

// constants
import { DEFAULT_AVATAR_URL } from '@/constants/defaultValue';

// constants
import { ROUTER } from '@/constants/router';

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

const userKeys = ['name', 'email', 'userRole', 'joined', 'avatar'];

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
  avatar: z.string().url('Invalid URL.').optional(),
  joined: z.string({
    invalid_type_error: 'Please enter a valid date.',
  }),
});

export const validateUser = async (
  id: string,
  _: UserState,
  formData: FormData,
) => {
  const extractedUser = extractFormData({ keys: userKeys, formData });

  if (formData.has('avatar') && formData.get('avatar') instanceof File) {
    const file = formData.get('avatar') as File;
    if (file.size > 0) {
      const formDataForUpload = new FormData();
      formDataForUpload.append('image', file);

      try {
        const avatarUrl = await uploadImage(formDataForUpload);
        extractedUser.avatar = avatarUrl;
      } catch (error) {
        return {
          errors: { avatar: ['Failed to upload image.'] },
          message: 'Image upload failed. Please try again.',
        };
      }
    } else {
      delete extractedUser.avatar; // Ensure avatar is not included if file size is 0
    }
  } else {
    delete extractedUser.avatar; // Ensure avatar is not included if not provided
  }

  // Validate form fields using Zod
  const validatedFields = FormSchema.safeParse(extractedUser);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }

  const { name, email, userRole, joined, avatar } = validatedFields.data;
  const user = { name, email, userRole, joined, avatar };

  const result = await updateUserApi(id, user);

  if (result.success) {
    redirect(
      `${ROUTER.USERS}?success=true&message=${encodeURIComponent(result.message)}`,
    );
  } else {
    redirect(
      `${ROUTER.USERS}/${id}/edit?success=false&message=${encodeURIComponent(result.message)}`,
    );
  }

  return { message: result.message };
};

const UserSchema = FormSchema.omit({ id: true });

export const createUser = async (_: UserState, formData: FormData) => {
  const extractedUser = extractFormData({ keys: userKeys, formData });

  if (formData.has('avatar') && formData.get('avatar') instanceof File) {
    const file = formData.get('avatar') as File;
    if (file.size > 0) {
      const formDataForUpload = new FormData();
      formDataForUpload.append('image', file);

      try {
        const avatarUrl = await uploadImage(formDataForUpload);
        extractedUser.avatar = avatarUrl;
      } catch (error) {
        return {
          errors: { avatar: ['Failed to upload image.'] },
          message: 'Image upload failed. Please try again.',
        };
      }
    } else {
      // Set default avatar URL if the file size is 0
      extractedUser.avatar = DEFAULT_AVATAR_URL;
    }
  } else {
    // Set default avatar URL if no file is provided
    extractedUser.avatar = DEFAULT_AVATAR_URL;
  }

  // Validate form fields using Zod
  const validatedFields = UserSchema.safeParse(extractedUser);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { name, email, userRole, joined, avatar } = validatedFields.data;
  const user = { name, email, userRole, joined, avatar };

  const result = await addUserApi(user);

  if (result.success) {
    redirect(
      `${ROUTER.USERS}?success=true&message=${encodeURIComponent(result.message || 'User created successfully.')}`,
    );
  } else {
    redirect(
      `${ROUTER.USERS}?success=false&message=${encodeURIComponent(result.message || 'Failed to create user.')}`,
    );
  }

  return result;
};
