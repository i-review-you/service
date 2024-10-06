import React from 'react';
import { clsx } from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Array<{ value: number; label: string }>;
}

export function Select({
  className,
  name,
  options,
  required = false,
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      <select
        name={name}
        required={required}
        className={clsx(
          className,
          'appearance-none w-full px-3 py-3 border border-gray-200 rounded-[5px] my-2'
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute transform -translate-y-1/2 size-4 top-1/2 right-3" />
    </div>
  );
}
