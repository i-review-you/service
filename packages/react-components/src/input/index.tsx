import React from 'react';
import { clsx } from 'clsx';

export function Input({
  className,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { name: string }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className={clsx(
        className,
        'w-full px-3 py-3 border border-gray-200 rounded-[5px] my-2'
      )}
      {...props}
    />
  );
}
