import { FC } from "react";

interface IColors {
    colors?: string[];
}

const Colors: FC<IColors> = ({ colors }) => {
    return (
        <>
            <span>Цвета</span>
            <div className='flex flex-wrap justify-between gap-5 mt-5 max-lg:justify-start'>
                {colors?.map((color) => (
                    <div
                        key={color}
                        className='w-24 h-24 hover:scale-110 duration-300'
                        style={{
                            background: color,
                            opacity: "50%",
                        }}></div>
                ))}
            </div>
        </>
    );
};

export { Colors };
