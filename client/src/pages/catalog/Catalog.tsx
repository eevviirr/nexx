import { FC, useState } from "react";

import { Card } from "src/entities/Card/Card";
import filterIcon from "src/app/assets/filterIcon.svg";
import { Drop } from "src/shared/drop/Drop";
import { useQuery } from "react-query";
import { axiosBase } from "src/app/http";
import { CardSkeleton } from "src/entities/Card/CardSkeleton";
import { Accordion } from "src/components/accordion/Accordion";
import { Button } from "src/shared/button/Button";
import { useAppSelector } from "src/app/hooks/useAppSelector";
export interface IProduct {
  model: string;
  price: number;
  brand: string;
  photos: string[];
  _id: string;
}
const Catalog: FC = () => {
  const [filterActive, setFilterActive] = useState(false);
  const brands = useAppSelector((state) => state.filterSlice.filter);
  const { data, isLoading, refetch } = useQuery("getProducts", async () => {
    return await axiosBase
      .get<IProduct[]>(`products?brands=${brands?.join(",")}`)
      .then(({ data }) => data);
  });
  const brandsInitial: string[] = [
    "Nike",
    "Adidas",
    "Balenciaga",
    "Lacost",
    "Calvin Klein",
  ];

  return (
    <div className="container">
      <div className="py-5 flex justify-between items-center">
        <span
          className="cursor-pointer"
          onClick={() => setFilterActive(!filterActive)}
        >
          Фильтер
          <img className="inline ml-5" src={filterIcon} alt="filter icon" />
        </span>
        <Drop defaultValue="Сортировка" options={[1, 2, 3, 4]} />
      </div>

      <div
        className={`grid grid-cols-4 gap-y-16 gap-5 mb-10 max-xl:grid-cols-3 max-lg:grid-cols-2 justify-items-center `}
      >
        {filterActive && (
          <div className={`w-full h-full flex flex-col gap-5 `}>
            <Accordion titles={brandsInitial} name="Бренд" />
            <Button
              title="Применить"
              className="w-full mt-10"
              onClick={() => refetch()}
            />
          </div>
        )}
        <>
          {isLoading ? (
            [...Array(10)]?.map((_, i) => <CardSkeleton key={i} />)
          ) : data?.length ? (
            data?.map(({ brand, model, price, photos, _id }, i) => (
              <Card
                key={i}
                brand={brand}
                model={model}
                price={price}
                photos={photos[0]}
                _id={_id}
              />
            ))
          ) : (
            <div className="flex justify-center items-center p-10 font-bold text-xl">
              Похоже товаров больше нет :(
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export { Catalog };
