import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { FixedActionButton } from './index';

const meta: Meta<typeof FixedActionButton> = {
  component: FixedActionButton,
};
export default meta;

type Story = StoryObj<typeof FixedActionButton>;
export const Primary: Story = {
  name: '기본',
  args: {
    children: '버튼',
  },
};
