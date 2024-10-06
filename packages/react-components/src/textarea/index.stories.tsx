import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Textarea } from './index';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};
export default meta;

type Story = StoryObj<typeof Textarea>;
export const Primary: Story = {
  name: '기본',
  args: {
    placeholder: '내용을 입력하세요',
  },
};
