import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';
import { Button } from '../button';

const meta: Meta<typeof Modal> = {
  component: Modal,
};
export default meta;

type Story = StoryObj<typeof Modal>;
export const Primary: Story = {
  name: '기본',
  args: {
    buttonChildren: <Button size="small">클릭</Button>,
    modalChildren: <div>모달</div>,
  },
};
