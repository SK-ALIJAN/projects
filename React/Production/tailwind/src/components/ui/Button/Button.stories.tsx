import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'danger', 'outline'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        isLoading: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Button Text',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Button Text',
    },
};

export const Loading: Story = {
    args: {
        variant: 'primary',
        isLoading: true,
        children: 'Button Text',
    },
};
