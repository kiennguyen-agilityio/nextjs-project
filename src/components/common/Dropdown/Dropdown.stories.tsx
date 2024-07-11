import type { Meta, StoryObj } from '@storybook/react';

// components
import Category from '@/components/common/Dropdown';

// mocks
import { categoryOptions } from '@/mocks';

const meta = {
  title: 'Components/Category',
  component: Category,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Dropdown Options',
    options: categoryOptions,
  },
};
