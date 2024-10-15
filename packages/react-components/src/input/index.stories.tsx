import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Input } from './index';

const meta: Meta<typeof Input> = {
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;
export const Primary: Story = {
  name: '기본',
  args: {
    placeholder: '내용을 입력하세요.',
  },
};
