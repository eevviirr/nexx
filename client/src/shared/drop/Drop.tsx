import { FC } from "react";

import style from "./drop.module.css";

interface iDrop {
    defaultValue: string;
    options?: number[];
}

const Drop: FC<iDrop> = ({ defaultValue, options }) => {
    return (
        <select className={style.select}>
            <option>
                {defaultValue}
            </option>
            {options?.map((item) => (
                <option key={item} className={style.option}>
                    {item}
                </option>
            ))}
        </select>
    );
};

export { Drop };
