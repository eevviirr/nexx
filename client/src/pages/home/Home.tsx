import { FC } from "react";
import { useQuery } from "react-query";
import { Banner } from "src/components/banner/Banner";
import { More } from "src/components/more/More";
import { MCard } from "src/entities/Card/Card";
import { axiosBase } from "src/app/http";
import { CardSkeleton } from "src/entities/Card/CardSkeleton";

export interface IProduct {
  model: string;
  price: number;
  brand: string;
  photos: string[];
  _id: string;
}

const Home: FC = () => {
  const { data, isLoading } = useQuery("getProducts", async () => {
    return await axiosBase.get<IProduct[]>("products").then(({ data }) => data);
  });

  return (
    <>
      <Banner />
      <div className="container">
        <More link="/catalog" title="Новинки" />
        {isLoading ? (
          <div className="container">
            <div className="grid grid-cols-4 gap-y-16 gap-5 mb-10 max-xl:grid-cols-3 max-lg:grid-cols-2 justify-items-center">
              {[...Array(10)]?.map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : data?.length ? (
          <div className="grid grid-cols-4 gap-y-16 gap-5 mb-10 max-xl:grid-cols-3 max-lg:grid-cols-2 justify-items-center">
            {data?.map(({ brand, model, price, photos, _id }, i) => (
              <MCard
                key={_id}
                initial={
                  i > 4
                    ? {
                        opacity: 0,
                        scale: 0,
                      }
                    : false
                }
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: i * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                brand={brand}
                model={model}
                price={price}
                photos={photos[0]}
                _id={_id}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center p-10 font-bold text-xl">
            Похоже товаров больше нет :(
          </div>
        )}
      </div>
    </>
  );
};

export { Home };
