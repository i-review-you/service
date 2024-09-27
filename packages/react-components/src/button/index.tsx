import React, {type ComponentPropsWithoutRef} from 'react';
import {clsx} from 'clsx';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    size?: "medium" | "small";
    scheme?: "primary" | "secondary" | "active" | "inactive";
}

export function Button({
                           className,
                           type = "button",
                           size = "medium",
                           scheme = "primary",
                           ...props
                       }: ButtonProps) {
    return (
        <button
            type={type}
            className={clsx(
                className,
                'font-bold px-5 rounded-[10px]',
                size === 'medium' && 'py-4 text-lg',
                size === 'small' && 'py-2',
                scheme === 'primary' && 'bg-primary text-white',
                scheme === 'secondary' && 'bg-black text-white',
                scheme === 'active' && 'bg-white text-primary border border-primary',
                scheme === 'inactive' && 'bg-white text-gray-400 border border-gray-300'
            )}
            {...props}
        />
    );
};
