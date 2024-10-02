interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder?: string;
  required?: boolean;
}

const Textarea = ({
  name,
  placeholder = '',
  required = false,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      className="form-element-style h-[200px]"
      {...props}
    />
  );
};

export default Textarea;
