import { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // inputRef: Ref<HTMLInputElement>;
  className?: string;
  value: string;
  setValue: (v: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  className = '',
  value,
  setValue,
  ...props
}: InputProps) {
  return (
    <input
      className={`${className} mb-5 bg-lime-200 p-2`}
      value={value}
      onChange={setValue}
      {...props}
    />
  );
}
