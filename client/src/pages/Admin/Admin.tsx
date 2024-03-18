import { useMutation, useQuery } from "react-query";

import { Button } from "src/shared/button/Button";
import { Drop } from "src/shared/drop/Drop";
import { axiosBase } from "src/app/http";
import { Modal } from "src/shared/modal/Modal";
import { Textarea } from "src/shared/textarea/Textarea";
import { Input } from "src/shared/input/Input";
import { FormEvent, useState } from "react";
import axios from "axios";
import { IProduct } from "../product/Product";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const { data, refetch } = useQuery("getProducts", async () => {
    return await axiosBase.get<IProduct[]>("products").then(({ data }) => data);
  });
  const [openModal, setOpenModal] = useState(false);
  const [productValues, setProductValues] = useState({
    model: "",
    price: 0,
    description: "",
    compound: "",
    brand: "",
    photos: [],
    sizes: "",
    colors: "",
  });
  const [images, setImages] = useState<any>([]);
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      return axiosBase.delete(`/products/${id}/delete`);
    },
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate } = useMutation({
    mutationFn: async () => {
      const imgUrl = await upload();

      return axiosBase.post("/products/addproduct", {
        model: productValues.model,
        price: productValues.price,
        description: productValues.description,
        compound: productValues.compound,
        brand: productValues.brand,
        photos: imgUrl,
        sizes: productValues.sizes.split(" "),
        colors: productValues.colors.split(" "),
      });
    },
    onSuccess: () => {
      refetch();
    },
  });
  const [img, setImg] = useState<FileList | any>();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate();
  };
  const upload = async () => {
    if (!img || !img.length) return;

    const formData = new FormData();
    for (let i = 0; i < img.length; i++) {
      formData.append(`productImage`, img[i]);
    }
    return await axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        setImages([...images, data.message]);
        return data.message;
      });
  };
  const navigate = useNavigate();
  return (
    <main className="container">
      <Modal isActive={openModal}>
        <div className="max-sm:h-screen p-10 bg-white max-w-[550px] w-full overflow-y-scroll">
          <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-8">
            <span className="font-bold">Добавить товар</span>
            <Input
              setValue={(e) =>
                setProductValues({ ...productValues, brand: e.target.value })
              }
              value={productValues.brand}
              className="border-b w-full max-w-none"
              placeholder="Бренд"
            />
            <Input
              setValue={(e) =>
                setProductValues({ ...productValues, model: e.target.value })
              }
              value={productValues.model}
              className="border-b w-full max-w-none"
              placeholder="Модель"
            />
            <Textarea
              setValue={(e) =>
                setProductValues({
                  ...productValues,
                  description: e.target.value,
                })
              }
              value={productValues.description}
              placeholder="Описание"
            />
            <Textarea
              setValue={(e) =>
                setProductValues({ ...productValues, compound: e.target.value })
              }
              value={productValues.compound}
              placeholder="Состав"
            />

            <div className="flex justify-between items-center">
              <span className="font-bold">Фотографии</span>
              <label htmlFor="file">
                <span className="cursor-pointer bg-black text-white font-bold p-4">
                  Загрузить
                </span>
                <input
                  type="file"
                  id="file"
                  className="w-0 h-0"
                  multiple
                  onChange={async (e) => {
                    setImg(e.target.files);
                    await upload();
                  }}
                />
              </label>
            </div>
            <Input
              setValue={(e) =>
                setProductValues({ ...productValues, sizes: e.target.value })
              }
              value={productValues.sizes}
              className="border-b w-full max-w-none"
              placeholder="Размеры"
            />
            <Input
              setValue={(e) =>
                setProductValues({ ...productValues, colors: e.target.value })
              }
              value={productValues.colors}
              className="border-b w-full max-w-none"
              placeholder="Цвета"
            />
            <Button title="Добавить товар" className="w-full" />
          </form>
        </div>
      </Modal>
      <header className="p-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Товары</h1>
        <button
          className="w-10 h-10 border border-black text-2xl  rounded-full hover:bg-black hover:text-white duration-100 hover:scale-150"
          onClick={() => setOpenModal(true)}
        >
          +
        </button>
      </header>
      <div className="">
        {data?.map(({ _id, brand, model, photos, price, colors, sizes }) => (
          <div
            key={_id}
            className="border-t border-b py-4 flex max-xl:flex-col max-md:flex-col items-center gap-8 relative"
          >
            <span
              className="absolute top-4 right-0 text-red-500"
              onClick={() => deleteProduct(_id)}
            >
              Удалить
            </span>
            <img
              src={photos[0]}
              alt=""
              className="w-[250px] h-[250px] max-lg:w-40 max-lg:h-40"
            />
            <div className="flex flex-col text-2xl max-lg:text-lg mr-auto max-xl:text-center max-xl:mr-0">
              <span className="uppercase font-bold">{brand}</span>
              <span className="uppercase">{model}</span>
            </div>
            <div className="">
              <Drop defaultValue="Цвета" options={colors} />
              <Drop defaultValue="Размер" options={sizes} />
            </div>
            <div className="flex gap-8 items-center">
              <span className="text-2xl max-lg:text-lg">{price} Руб.</span>
              <Button
                title="Редактировать"
                onClick={() => navigate(`/edit/${_id}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export { Admin };

{
  /* <div className="px-8 py-8 w-fit bg-black text-white font-bold rounded-[20px] fixed bottom-4 left-1/2 -translate-x-1/2">
<ul className="flex gap-10">
  {["Товары", "Пользователи", "товары"].map((item) => (
    <li>{item}</li>
  ))}
</ul>
</div> */
}
