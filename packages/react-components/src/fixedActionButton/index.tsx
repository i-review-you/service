import React, { type ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  scheme?: 'primary' | 'secondary' | 'active' | 'inactive';
}

export function FixedActionButton({
  className,
  type = 'button',
  scheme = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        className,
        'font-bold fixed z-50 bottom-0 left-1/2 transform -translate-x-1/2 w-[768px] px-6 pt-4 pb-12 text-xl',
        scheme === 'primary' && 'bg-primary text-white',
        scheme === 'secondary' && 'bg-black text-white',
        scheme === 'active' && 'bg-white text-primary border border-primary',
        scheme === 'inactive' && 'bg-white text-gray-400 border border-gray-300'
      )}
      {...props}
    />
  );
}
