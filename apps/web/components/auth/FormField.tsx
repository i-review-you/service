import React from 'react';
import Button from '../ui/Button';

interface FormFieldProps {
  label: string;
  placeholder: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  inputType?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  buttonLabel,
  onButtonClick,
  inputType = 'text',
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold">{label}</h3>
      <div className="relative w-full">
        <input
          type={inputType}
          className="relative w-full px-3 py-2 border rounded-md"
          placeholder={placeholder}
        />
        {buttonLabel && (
          <Button
            size="small"
            label={buttonLabel}
            onClick={onButtonClick}
            className="absolute font-bold transform -translate-y-1/2 right-4 top-1/2"
          />
        )}
      </div>
    </div>
  );
};
