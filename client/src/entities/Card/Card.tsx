import { FC, LegacyRef, forwardRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useAppDispatch } from "src/app/hooks/useAppDispatch";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import {
  addItemToCart,
  addItemToFavorite,
} from "src/app/store/slices/userSlice";
import { Button } from "src/shared/button/Button";
import { LikeButton } from "src/shared/likeButton/LikeButton";

interface ICard {
  brand: string;
  price: number;
  model: string;
  photos: string;
  _id: string;
}
export const Card: FC<ICard> = forwardRef(
  (item, ref: LegacyRef<HTMLDivElement>) => {
    const { brand, price, model, photos, _id } = item;
    const userData = useAppSelector((state) => state.userSlice);
    const isFavorite = userData.user.favorites.find(
      (favoritesItem) => favoritesItem._id === _id
    );

    const [favorite, setFavorite] = useState(!!isFavorite);

    const dispatch = useAppDispatch();
    const addToCart = () => {
      dispatch(addItemToCart(item));
    };
    const navigate = useNavigate();
    return (
      <div ref={ref} className="max-w-[340px] w-full relative">
        <Link
          onClick={(e) => {
            if ((e.target as HTMLElement).closest(".favorite")) {
              e.preventDefault();
            }
          }}
          to={`/product/${_id}`}
          className="block w-full h-[380px] max-md:h-[200px] bg-slate-200 p-5 max-md:p-2 relative"
        >
          <img
            src={photos}
            alt="photo product"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <LikeButton
            favorite={favorite}
            setFavorite={() => {
              if (userData.isAuth) {
                dispatch(addItemToFavorite(item));
                setFavorite(!favorite);
              } else {
                navigate("/auth");
              }
            }}
            className="ml-auto"
          />
        </Link>
        <div className="p-5 max-md:p-0">
          <div className="grid grid-cols-2 grid-rows-1 items-center max-md:justify-items-end max-md:pt-2">
            <span className="font-bold text-2xl max-md:hidden">{brand}</span>
            <span className="row-span-2">{model}</span>
            <span className="max-md:col-span-1 justify-items-center">
              {price} р.
            </span>
          </div>
          <Button
            title="В корзину"
            onClick={addToCart}
            className="w-full mt-10"
          />
        </div>
      </div>
    );
  }
);

export const MCard = motion(Card);
