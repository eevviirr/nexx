import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { Card } from "src/entities/Card/Card";
import { Button } from "src/shared/button/Button";

const Favorites: React.FC = () => {
  const favoritesItem = useAppSelector(
    (state) => state.userSlice.user.favorites
  );
  const navigate = useNavigate();
  return (
    <div>
      {favoritesItem.length ? (
        <>
          <div className="container grid grid-cols-4 gap-y-16 gap-5 mb-10 max-xl:grid-cols-3 max-lg:grid-cols-2 justify-items-center">
            {favoritesItem?.map((item) => (
              <Card {...item} photos={item.photos[0]} />
            ))}
          </div>
        </>
      ) : (
        <div className="container flex flex-col justify-center items-center pt-8">
          <span className="text-center text-4xl font-bold">У вас не тизбранных</span>
          <Button
            title="В каталог"
            className="mt-5"
            onClick={() => navigate("/catalog")}
          />
        </div>
      )}
    </div>
  );
};

export { Favorites };
