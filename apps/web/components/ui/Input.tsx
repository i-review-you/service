type InputType = 'text' | 'email' | 'password' | 'number' | 'nickname' | 'file';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
}

const Input = ({
  name,
  type = 'text',
  placeholder = '',
  required = false,
  ...props
}: InputProps) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="form-element-style"
      {...props}
    />
  );
};

export default Input;
