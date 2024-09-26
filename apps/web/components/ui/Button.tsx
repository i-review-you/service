type ButtonType = "button" | "reset" | "submit";
type ButtonSize = "large" | "medium" | "small";
type ButtonScheme = "primary" | "secondary" | "active" | "inactive";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  type?: ButtonType;
  size?: ButtonSize;
  scheme?: ButtonScheme;
}

const Button = ({
  label,
  type = "button",
  size = "medium",
  scheme = "primary",
  ...props
}: ButtonProps) => {
  const sizeClasses: Record<ButtonSize, string> = {
    large:
      "fixed z-50 bottom-0 left-1/2 transform -translate-x-1/2 w-[768px] left-0 px-6 pt-4 pb-12 text-xl",
    medium: "w-full rounded-[10px] py-4 text-lg",
    small: "w-[150px] rounded-[10px] py-2",
  };

  const schemeClasses: Record<ButtonScheme, string> = {
    primary: "bg-primary text-white",
    secondary: "bg-black text-white",
    active: "bg-white text-primary border border-primary",
    inactive: "bg-white text-gray-400 border border-gray-300",
  };
  return (
    <button
      type={type}
      className={`font-bold ${sizeClasses[size]} ${schemeClasses[scheme]}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
