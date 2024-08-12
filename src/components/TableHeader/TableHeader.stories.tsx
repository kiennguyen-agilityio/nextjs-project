import type { Meta, StoryObj } from '@storybook/react';

// components
import TableHeader from '@/components/TableHeader';

// mocks
import { roles } from '@/mocks';

const meta = {
  title: 'Components/TableHeader',
  component: TableHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    roles: roles,
  },
};
