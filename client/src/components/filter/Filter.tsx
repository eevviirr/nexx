import { FC } from "react";
import { Accordion } from "../accordion/Accordion";
import { Button } from "src/shared/button/Button";

interface IFilter {
    className?: string;
}

const Filter: FC<IFilter> = ({ className }) => {
    const brands: string[] = [
        "Nike",
        "Adidas",
        "Balenciaga",
        "Lacost",
        "Calvin Klein",
    ];
    return (
        <div className={`${className} w-full h-full flex flex-col gap-5 `}>
            <Accordion titles={brands} name='Бренд' />
            <Button title='Применить' className='w-full mt-10' />
        </div>
    );
};

export { Filter };
