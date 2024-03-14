import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/app/hooks/useAppDispatch";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { removeItemCart } from "src/app/store/slices/userSlice";
import { Button } from "src/shared/button/Button";

const Basket: FC = () => {
  const cartItems = useAppSelector((state) => state.userSlice.user.basket);
  const sum = cartItems.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      {cartItems.length ? (
        <>
          <div className="container flex flex-col gap-8">
            {cartItems?.map(({ brand, model, price, photos, _id }) => (
              <div
                className="border-t border-b py-4 flex max-md:flex-col items-center gap-8"
                key={_id}
              >
                <img
                  src={photos[0]}
                  alt=""
                  className="w-[250px] h-[250px] max-lg:w-40 max-lg:h-40"
                />
                <div className="flex flex-col text-2xl max-lg:text-lg mr-auto max-md:text-center max-md:mr-0">
                  <span className="uppercase font-bold">{brand}</span>
                  <span className="uppercase">{model}</span>
                </div>
                <div className="flex gap-8 items-center">
                  <span className="text-2xl max-lg:text-lg">{price} Руб.</span>
                  <Button
                    title="Удалить"
                    onClick={() =>
                      dispatch(
                        removeItemCart({ brand, model, price, photos, _id })
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="container flex flex-col mt-8 mb-8 gap-4">
            <span className="text-4xl font-bold">Итог: {sum} Руб.</span>
            <Button title="Оформить заказ" />
          </div>
        </>
      ) : (
        <div className="container flex flex-col justify-center items-center pt-8">
          <span className="text-center text-4xl font-bold">Корзина пуста</span>
          <Button
            title="В каталог"
            className="mt-5"
            onClick={() => navigate("/catalog")}
          />
        </div>
      )}
    </>
  );
};

export { Basket };
