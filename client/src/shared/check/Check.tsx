import { FC, useState } from "react";

import galochka from "src/app/assets/galochka.svg";
import { useAppDispatch } from "src/app/hooks/useAppDispatch";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { setFilter } from "src/app/store/slices/filterSlice";

interface ICheck {
  title: string;
  id: string;
}

const Check: FC<ICheck> = ({ title, id }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.filterSlice.filter);
  const handleCheckboxChange = () => {
    dispatch(setFilter([...(brands || []), title]));
    setChecked(!checked);
  };
  return (
    <label htmlFor={id} className="flex items-center gap-2">
      <span
        className={`duration-200 w-4 h-4 border block pt-[2px] pl-[1.5px] ${
          checked ? "bg-accent border-accent" : "border-black"
        }`}
      >
        <img src={galochka} alt="galochka icon" />
      </span>
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0"
        id={id}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className={`duration-200 ${checked ? "text-accent" : ""}`}>
        {title}
      </span>
    </label>
  );
};

export { Check };
