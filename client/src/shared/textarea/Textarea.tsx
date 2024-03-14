import { FC } from "react";

interface ITextarea {
    value: string;
    setValue: (value: string) => void;
}

const Textarea: FC<ITextarea> = ({ value, setValue }) => {
    return (
        <textarea
            name=''
            id=''
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='border w-full h-36 outline-none resize-none p-4'></textarea>
    );
};

export { Textarea };
