import { useMutation, useQuery } from "react-query";

import { Button } from "src/shared/button/Button";
import { Drop } from "src/shared/drop/Drop";
import { axiosBase } from "src/app/http";
import { Modal } from "src/shared/modal/Modal";
import { useState } from "react";
import { IProduct } from "../product/Product";
import { useNavigate } from "react-router-dom";
import { AdminModal } from "src/components/AdminModal/AdminModal";
import { AnimatePresence, motion } from "framer-motion";

const Admin: React.FC = () => {
  const { data, refetch } = useQuery("getProducts", async () => {
    return await axiosBase.get<IProduct[]>("products").then(({ data }) => data);
  });
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      setOpenModal(false);
    }
  });
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      return axiosBase.delete(`/products/${id}/delete`);
    },
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <main className="container">
      <AnimatePresence>
        <Modal isActive={openModal}>
          <AdminModal refetch={refetch} setOpenModal={setOpenModal} />
        </Modal>
      </AnimatePresence>
      <header className="p-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Товары</h1>
        <button
          className="w-10 h-10 border border-black text-2xl  rounded-full hover:bg-black hover:text-white duration-100 hover:scale-150"
          onClick={() => setOpenModal(true)}
        >
          +
        </button>
      </header>
      <AnimatePresence mode="popLayout">
        {data?.map(({ _id, brand, model, photos, price, colors, sizes }) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key={_id}
            className="border-t border-b py-4 flex max-xl:flex-col max-md:flex-col items-center gap-8 relative my-4"
          >
            <span
              className="absolute top-4 right-0 text-red-500 cursor-pointer"
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
          </motion.div>
        ))}
      </AnimatePresence>
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
