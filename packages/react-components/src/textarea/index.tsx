import React from 'react';
import { clsx } from 'clsx';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder?: string;
  required?: boolean;
}

export function Textarea({
  className,
  name,
  placeholder = '',
  required = false,
  ...props
}: TextareaProps) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      className={clsx(
        className,
        'w-full px-3 py-3 border border-gray-200 rounded-[5px] my-2 h-[200px]'
      )}
      {...props}
    />
  );
}
