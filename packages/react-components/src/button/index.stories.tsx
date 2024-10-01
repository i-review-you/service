import type {Meta, StoryObj} from '@storybook/react';

import React from 'react';
import {Button} from "./index";

const meta: Meta<typeof Button> = {
    component: Button,
};
export default meta;


type Story = StoryObj<typeof Button>;
export const Primary: Story = {
    name: "기본",
    args: {
        children: '버튼'
    },
};

