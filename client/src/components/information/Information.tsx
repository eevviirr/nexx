import { FC } from "react";

interface IInformation {
    children: React.ReactNode;
    titles: string[];
    active?: number;
    setActive?: (number: number) => void;
}

const Information: FC<IInformation> = ({
    children,
    titles,
    active,
    setActive,
}) => {
    return (
        <>
            <div className='w-full border-b border-b-black/30 mt-10 mb-5 flex gap-10'>
                {titles.map((title, i) => (
                    <span
                        key={title}
                        onClick={() => setActive && setActive(i)}
                        className={` text-2xl font-bold cursor-pointer ${
                            active == i
                                ? `border-b-2 border-b-black inline-block pb-4`
                                : ``
                        }`}>
                        {title}
                    </span>
                ))}
            </div>
            <div className='min-h-[280px]'>{children}</div>
        </>
    );
};

export { Information };
