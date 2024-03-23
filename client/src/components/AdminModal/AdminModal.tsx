import axios from "axios";
import { FormEvent, forwardRef, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";
import { axiosBase } from "src/app/http";
import { IProduct } from "src/pages/home/Home";
import { Button } from "src/shared/button/Button";
import { Input } from "src/shared/input/Input";
import { Textarea } from "src/shared/textarea/Textarea";

const AdminModal = forwardRef(
  ({
    refetch,
    setOpenModal,
  }: {
    refetch: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<IProduct[]>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const [productValues, setProductValues] = useState({
      model: "",
      price: "",
      description: "",
      compound: "",
      brand: "",
      photos: [],
      sizes: "",
      colors: "",
    });
    const [images, setImages] = useState<string[]>([]);

    const { mutate } = useMutation({
      mutationFn: async () => {
        return axiosBase.post("/products/addproduct", {
          model: productValues.model,
          price: +productValues.price,
          description: productValues.description,
          compound: productValues.compound,
          brand: productValues.brand,
          photos: images,
          sizes: productValues.sizes.split(" "),
          colors: productValues.colors.split(" "),
        });
      },
      onSuccess: () => {
        refetch();
        setOpenModal(false);
      },
    });
    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      mutate();
    };
    const upload = async (img: FileList) => {
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
          setImages(data.message);
          return data.message;
        });
    };

    return (
      <div className="h-full relative p-10 bg-white max-w-[550px] w-full overflow-y-scroll">
        <div
          className="rotate-45 text-black absolute z-50 right-4 top-4 text-6xl cursor-pointer"
          onClick={() => setOpenModal(false)}
        >
          +
        </div>
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
          <div className="flex justify-between flex-wrap">
            {images.map((item) => (
              <img src={item} alt="" className="w-40 h-40 object-contain" />
            ))}
          </div>
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
                  upload(e.target.files!);
                }}
              />
            </label>
          </div>
          <Input
            setValue={(e) =>
              setProductValues({ ...productValues, price: e.target.value })
            }
            value={productValues.price}
            className="border-b w-full max-w-none"
            placeholder="Цена"
          />
          <Button title="Добавить товар" className="w-full" />
        </form>
      </div>
    );
  }
);

export { AdminModal };
