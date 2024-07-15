import { Role } from '@/models/RoleModel';

export const categoryOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const listCategory = [
  {
    id: '1',
    label: 'Email',
    options: [
      { value: 'email1', label: 'email1@example.com' },
      { value: 'email2', label: 'email2@example.com' },
    ],
  },
  {
    id: '2',
    label: 'Full Name',
    options: [
      { value: 'john_doe', label: 'John Doe' },
      { value: 'jane_doe', label: 'Jane Doe' },
    ],
  },
  {
    id: '3',
    label: 'Role',
  },
  {
    id: '4',
    label: 'Joined',
    options: [
      { value: '2021', label: '2021' },
      { value: '2022', label: '2022' },
    ],
  },
];

export const roles: Role[] = [
  { id: 1, name: 'Admin', description: 'Administrator role' },
  { id: 2, name: 'User', description: 'Regular user role' },
  { id: 3, name: 'Guest', description: 'Guest user role' },
];
