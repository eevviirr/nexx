import { FC } from "react";
import { useNavigate } from "react-router-dom";

import bannerImg from "src/app/assets/banner.png";
import { Button } from "src/shared/button/Button";

interface IBannerItem {
    link: string;
}
const BannerItem: FC<IBannerItem> = ({ link }) => {
    const navigate = useNavigate();
    const navTo = () => {
        navigate(link);
    };
    return (
        <div className='relative pl-[120px] pt-[96px] max-md:pl-0 min-h-[500px]'>
            <img
                src={bannerImg}
                alt='bannerImg'
                className='w-full h-full object-cover absolute top-0 left-0 -z-10'
            />
            <div className='container'>
                <span className='relative text-white opacity-50'>
                    Новая коллекция
                </span>
                <h2 className='text-6xl font-bold text-white block mt-5 max-md:text-5xl'>
                    Adidas Originals
                    <br /> Gazelle Vintage
                </h2>
                <Button title='В каталог' className='mt-5' onClick={navTo} />
            </div>
        </div>
    );
};

export { BannerItem };
