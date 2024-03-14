import { ChangeEvent, FC, HTMLProps } from "react";

interface IInput extends HTMLProps<HTMLInputElement> {
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}
const Input: FC<IInput> = ({
  value,
  placeholder,
  setValue,
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      className={`outline-none border-b border-b-black p-4 font-bold text-black placeholder:text-black/50 w-full max-w-[460px] rounded-none ${className}`}
    />
  );
};

export { Input };
