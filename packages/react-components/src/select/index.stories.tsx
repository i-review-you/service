import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Select } from './index';

const meta: Meta<typeof Select> = {
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;
export const Primary: Story = {
  name: '기본',
  args: {
    options: [{ value: 0, label: '선택하세요' }],
  },
};
