import { FC, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import { useQuery } from "react-query";

import { Description } from "./Description";
import { Information } from "src/components/information/Information";
import { Review } from "src/components/review/Review";
import { More } from "src/components/more/More";
import { Card } from "src/entities/Card/Card";
import { Contact } from "src/shared/cintact/Contact";
import { axiosBase } from "src/app/http";
import { Modal } from "src/shared/modal/Modal";
import { Textarea } from "src/shared/textarea/Textarea";
import { Button } from "src/shared/button/Button";
import { LikeButton } from "src/shared/likeButton/LikeButton";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { addItemToFavorite } from "src/app/store/slices/userSlice";
import { useAppDispatch } from "src/app/hooks/useAppDispatch";

export interface IProduct {
  model: string;
  price: number;
  description: string;
  compound: string;
  brand: string;

  photos: string[];
  comment: string[];
  sizes: number[];
  colors: string[];

  _id: string;
}

const Product: FC = () => {
  const { productId } = useParams();
  const { data: product } = useQuery("getProduct", async () => {
    return await axiosBase<IProduct>(`products/${productId}`).then(
      ({ data }) => data
    );
  });

  const { data } = useQuery("getProducts", async () => {
    return await axiosBase.get<IProduct[]>("products").then(({ data }) => data);
  });
  const [activePhoto, setActivePhoto] = useState(0);
  const [review, setReview] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const favorites = useAppSelector((state) => state.userSlice.user.favorites);
  const isFavorite = favorites.find(
    (favoritesItem) => favoritesItem._id === productId
  );
  const dispatch = useAppDispatch();
  const [favorite, setFavorite] = useState(!!isFavorite);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosBase
      .post(`products/${productId}/review`, {
        comment: review,
      })
      .then(() => setOpenModal(false));
  };
  return (
    <div className="container">
      <Modal isActive={openModal}>
        <div className="p-10 bg-white max-w-[550px] w-full">
          <form onSubmit={(e) => onSubmit(e)}>
            <span className="font-bold">Оставить отзыв</span>
            <Textarea
              value={review}
              setValue={(e) => setReview(e.target.value)}
            />
            <Button title="Отправить" className="w-full" />
          </form>
        </div>
      </Modal>
      <section className="flex gap-10 max-lg:flex-col">
        <div className="flex gap-10 w-full max-2xl:flex-col max-w-[700px]">
          <div className=" w-full aspect-square col-span-2">
            <img
              src={product?.photos[activePhoto]}
              alt=""
              className="w-full h-full min-h-[600px] max-sm:min-h-max object-contain"
            />
          </div>
          <ul className="flex flex-col max-2xl:flex-row justify-between">
            {product?.photos?.map((item, i) => (
              <li
                className="w-[250px] aspect-square max-xl:w-[150px] bg-slate-200"
                onClick={() => setActivePhoto(i)}
                key={item}
              >
                <img src={item} alt="" className="w-full h-full object-cover" />
              </li>
            ))}
          </ul>
        </div>
        <aside className="ml-auto max-w-[340px] py-16 max-lg:py-0 max-lg:ml-0 max-lg:max-w-full max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 h-full">
          <span className="text-4xl font-bold">{product?.model}</span>
          <p className="text-base bloc py-5">{product?.description}</p>
          <span className="font-bold">{product?.price} р.</span>

          <div className="mt-10">
            <div className="flex gap-5 justify-between items-center">
              <Button title="В корзину" />
              <LikeButton
                favorite={favorite}
                setFavorite={() => {
                  dispatch(addItemToFavorite(product));
                  setFavorite(!favorite);
                }}
                className="ml-auto"
              />
            </div>
          </div>
          <span
            onClick={() => setOpenModal(!openModal)}
            className="mt-2 block cursor-pointer"
          >
            Оставить отзыв
          </span>
        </aside>
      </section>
      <Description descr={product?.description} name={product?.model} />
      <Information titles={["Отзывы"]} active={0}>
        <Swiper
          className="grid grid-cols-3 gap-10"
          slidesPerView={1}
          spaceBetween={20}
          scrollbar={true}
          modules={[Scrollbar]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            634: {
              slidesPerView: 2,
            },
          }}
        >
          {product?.comment?.length ? (
            product?.comment.map((item, i) => (
              <SwiperSlide className="mb-10" key={i}>
                <Review
                  comment={item}
                  date="23.02.23"
                  starCount={5}
                  username="Eugene"
                />
              </SwiperSlide>
            ))
          ) : (
            <div className="w-full flex justify-center items-center font-bold text-4xl text-ce">
              <span>Отзывов нет</span>
            </div>
          )}
        </Swiper>
      </Information>

      <More link="/catalog/21" title="Рекомендации" />
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

      <Information titles={["Связь с нами"]} active={0}>
        <div className="flex justify-between mb-20 gap-10 max-xl:flex-col max-xl:items-center">
          <Contact
            contact="hom.1232015@yandex.ru"
            link=""
            subTitle="Отправьте запрос через форму обратной связи."
            title="Наша почта"
          />
          <Contact
            contact="+7 905 241 81 61"
            link=""
            subTitle="Клиентская служба принимает звонки с понедельника по пятницу, с 10:00 до 19:00 по московскому времени"
            title="Наш телефон"
          />
        </div>
      </Information>
    </div>
  );
};

export { Product };
