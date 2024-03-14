import { FC, FormEvent } from "react";

import { Input } from "src/shared/input/Input";
import searchIcon from "src/app/assets/searchIcon.svg";

interface ISearch {
    search: string;
    setSearch: (e: FormEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

const Search: FC<ISearch> = ({ search, setSearch, onFocus, onBlur }) => {
    return (
        <label className='relative max-w-[460px] w-full'>
            <img
                src={searchIcon}
                alt='search'
                className='absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer'
            />
            <Input
                onFocus={onFocus}
                onBlur={onBlur}
                setValue={setSearch}
                value={search}
                className='pl-16'
            />
        </label>
    );
};

export { Search };
