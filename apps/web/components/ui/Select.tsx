import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Array<{ value: number; label: string }>;
  required?: boolean;
}

const Select = ({ name, options, required = false, ...props }: SelectProps) => {
  return (
    <div className="relative">
      <select
        name={name}
        required={required}
        className="appearance-none form-element-style"
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* <ChevronDownIcon className="absolute transform -translate-y-1/2 size-4 top-1/2 right-3" /> */}
    </div>
  );
};

export default Select;
