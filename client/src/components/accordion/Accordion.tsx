import { FC, useState } from "react";

import { Check } from "src/shared/check/Check";
import style from "./accordion.module.css";

interface IAccordion {
    titles: string[];
    name: string;
}

const Accordion: FC<IAccordion> = ({ titles, name }) => {
    const [active, setActive] = useState(false);
    return (
        <div
            className={`w-full overflow-hidden border-b border-b-black/10  font-bold duration-200 transition-all  ${
                active ? "h-64" : "h-8"
            }`}>
            <div
                className={`  ${
                    active ? "text-black" : "text-black/50"
                } flex justify-between items-center cursor-pointer`}
                onClick={() => setActive(!active)}>
                <span>{name}</span>
                <span>{active ? "-" : "+"}</span>
            </div>
            <div className={`py-5 flex flex-col gap-5 h-64  `}>
                <div
                    className={`overflow-y-scroll h-64 flex flex-col gap-5 ${style.scrollbar}`}>
                    {titles.map((title, i) => (
                        <Check title={title} id={i.toString()} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Accordion };
