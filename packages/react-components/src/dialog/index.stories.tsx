import type {Meta, StoryObj} from '@storybook/react';

import React from 'react';
import {useArgs} from '@storybook/preview-api';
import {Dialog} from "./index";

const meta: Meta<typeof Dialog> = {
    component: Dialog,

    // argTypes: {
    //     isOpen: {control: 'boolean'},
    // }
};
export default meta;


type Story = StoryObj<typeof Dialog>;
export const Primary: Story = {
    name: "기본",
    args: {
        isOpen: false,
        setIsOpen: () => false,
        children: (
            <div>모달</div>
        )
    },
    render(args) {
        const [, updateArgs] = useArgs();

        return (
            <div>
                <button
                    onClick={() => updateArgs({isOpen: true})}
                >오픈
                </button>
                <Dialog
                    {...args}
                    setIsOpen={() => updateArgs({isOpen: false})}
                />
            </div>
        )
    },
};

