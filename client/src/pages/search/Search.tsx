import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { IProduct } from "../home/Home";
import { axiosBase } from "src/app/http";
import { Card } from "src/entities/Card/Card";
import { CardSkeleton } from "src/entities/Card/CardSkeleton";
import { useAppSelector } from "src/app/hooks/useAppSelector";

const Search: FC = () => {
  const search = useAppSelector((state) => state.searchSlice.search);
  const { data, isLoading, refetch } = useQuery("getProducts", async () => {
    return await axiosBase
      .get<IProduct[]>(`products?search=${search}`)
      .then(({ data }) => data);
  });
  useEffect(() => {
    refetch();
  }, [search]);
  return (
    <div className="container">
      {isLoading ? (
        <div className="container">
          <div className="grid grid-cols-4 gap-y-16 gap-5 mb-10 max-xl:grid-cols-3 max-lg:grid-cols-2 justify-items-center">
            {[...Array(10)]?.map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : data?.length ? (
        <>
          <div className="grid grid-cols-4 gap-y-16 gap-5 mb-10 max-xl:grid-cols-3 max-lg:grid-cols-2 justify-items-center">
            {data?.map(({ brand, model, price, photos, _id }, i) => (
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
        </>
      ) : (
        <div className="flex justify-center items-center p-10 font-bold text-xl">
          Похоже товаров больше нет :(
        </div>
      )}
    </div>
  );
};

export { Search };
