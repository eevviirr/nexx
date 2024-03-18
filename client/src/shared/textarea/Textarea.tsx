import { ChangeEvent, FC } from "react";

interface ITextarea {
  value: string;
  setValue: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const Textarea: FC<ITextarea> = ({ value, setValue, placeholder }) => {
  return (
    <textarea
      name=""
      id=""
      placeholder={placeholder}
      value={value}
      onChange={setValue}
      className="border w-full h-36 outline-none resize-none p-4"
    />
  );
};

export { Textarea };
