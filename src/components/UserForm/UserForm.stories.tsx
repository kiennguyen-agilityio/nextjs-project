import type { Meta, StoryObj } from '@storybook/react';

// components
import UserForm from '@/components/UserForm';

const meta = {
  title: 'Components/UserForm',
  component: UserForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
