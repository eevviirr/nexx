import { FC } from "react";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { Card } from "src/entities/Card/Card";

const Basket: FC = () => {
  const cartItems = useAppSelector((state) => state.userSlice.user.basket);
  return (
    <div className="container grid grid-cols-4 gap-y-16 gap-5 mb-10 max-xl:grid-cols-3 max-lg:grid-cols-2 justify-items-center">
      {cartItems?.map(({ brand, model, price, photos, _id }, i) => (
        <Card
          key={i}
          brand={brand}
          model={model}
          price={price}
          photos={photos[0]}
          _id={_id}
        />
      ))}
    </div>
  );
};

export { Basket };
