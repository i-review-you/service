import React, { type ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'large' | 'medium' | 'small';
  scheme?: 'primary' | 'secondary' | 'active' | 'inactive';
}

export function Button({
  className,
  type = 'button',
  size = 'medium',
  scheme = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        className,
        'font-bold',
        size === 'large' &&
          'fixed z-50 bottom-0 left-1/2 transform -translate-x-1/2 w-[768px] px-6 pt-4 pb-12 text-xl',
        size === 'medium' && 'w-full rounded-[10px] py-4 text-lg',
        size === 'small' && 'w-[150px] rounded-[10px] py-2',
        scheme === 'primary' && 'bg-primary text-white',
        scheme === 'secondary' && 'bg-black text-white',
        scheme === 'active' && 'bg-white text-primary border border-primary',
        scheme === 'inactive' && 'bg-white text-gray-400 border border-gray-300'
      )}
      {...props}
    />
  );
}
