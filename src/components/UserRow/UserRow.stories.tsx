import type { Meta, StoryObj } from '@storybook/react';

// components
import UserRow from '@/components/UserRow';

const meta = {
  title: 'Components/UserInfo',
  component: UserRow,
} satisfies Meta<typeof UserRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatar: 'https://s.net.vn/Ur2Q',
    email: 'test@example.com',
    name: 'John Doe',
    role: 'Admin',
    joinDate: '2022-01-01',
  },
};
