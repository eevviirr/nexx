import { FC } from "react";
import { Link } from "react-router-dom";

interface IContact {
    link: string;
    title: string;
    subTitle: string;
    contact: string;
}

const Contact: FC<IContact> = ({ link, title, subTitle, contact }) => {
    return (
        <Link
            to={link}
            className='block max-w-[700px] w-full p-10 border border-black hover:bg-black hover:text-white duration-200'>
            <span className='text-6xl font-bold'>{title}</span>
            <p className='opacity-50 block mt-2'>{subTitle}</p>
            <span className='font-bold text-2xl block mt-20'>{contact}</span>
        </Link>
    );
};

export { Contact };
