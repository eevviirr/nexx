import { FC, useState } from "react";
import { Colors } from "../colors/Colors";
import { Drop } from "src/shared/drop/Drop";
import { Link } from "react-router-dom";
import { Button } from "src/shared/button/Button";

import { IProduct } from "src/pages/product/Product";
import { LikeButton } from "src/shared/likeButton/LikeButton";

interface IAsideProduct {
    product?: IProduct;
    
}

const AsideProduct: FC<IAsideProduct> = ({ product }) => {
    const [favorite, setFavorite] = useState(false);
    return (
        <aside className='ml-auto max-w-[340px] py-16 max-lg:py-0 max-lg:ml-0 max-lg:max-w-full max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1'>
            <div className=''>
                <span className='text-4xl font-bold'>{product?.model}</span>
                <p className='text-base bloc py-5'>{product?.description}</p>
                <span className='font-bold'>15.000 р.</span>
            </div>

            <div className='mt-5'>
                <Colors colors={product?.colors} />

                <div className='mt-10 flex justify-between'>
                    <Drop
                        defaultValue='Выберите размер'
                        options={product?.sizes}
                    />
                    <Link to={"/sizes"} className='opacity-50'>
                        Мой размер
                    </Link>
                </div>

                <div className='flex mt-10 gap-5 justify-between items-center'>
                    <Button title='В корзину' />
                    <LikeButton favorite={favorite} setFavorite={setFavorite} />
                </div>
            </div>
            <span className='mt-2 block cursor-pointer'>Оставить отзыв</span>
        </aside>
    );
};

export { AsideProduct };
