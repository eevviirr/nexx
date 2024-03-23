import { AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import { motion } from "framer-motion";

import { Information } from "src/components/information/Information";

interface IDescription {
  name?: string;
  descr?: string;
}

const Description: FC<IDescription> = ({ name, descr }) => {
  const [active, setActive] = useState(0);
  return (
    <Information
      titles={["Описание", "О доставке"]}
      active={active}
      setActive={setActive}
    >
      <AnimatePresence mode="wait" initial={false}>
        {active === 0 ? (
          <motion.div
            key={active === 0 ? "1" : "2"}
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className=" gap-10 max-[634px]:grid-cols-1"
          >
            <div className="max-w-[455px]">
              <span className="font-bold text-2xl block">Nike</span>
              <span className="opacity-50 block pt-2 pb-5">{name}</span>
              <p>{descr}</p>
            </div>
          </motion.div>
        ) : (
          active === 1 && (
            <motion.div
              key={active === 1 ? "2" : "1"}
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              exit={{ x: "-100vw" }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="grid grid-cols-4 gap-10 max-lg:grid-cols-2 max-[634px]:grid-cols-1"
            >
              <div className="flex flex-col gap-5">
                <span className="font-bold text-xl">
                  Оптимальное Время Доставки
                </span>
                <p>
                  Мы понимаем, что время ценно, поэтому мы предлагаем гибкие
                  варианты доставки, чтобы соответствовать вашему расписанию.
                  Сделайте заказ, и мы постараемся доставить его в удобное для
                  вас время.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <span className="font-bold text-xl">
                  Глобальная Доступность
                </span>
                <p>
                  Безграничные возможности выбора места доставки! Наша служба
                  доставки опережает географические ограничения, чтобы ваш заказ
                  мог быть доставлен в любую точку мира. Мы стремимся сделать
                  покупки удобными, независимо от вашего местоположения.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <span className="font-bold text-xl">
                  Безопасность и Отслеживание
                </span>
                <p>
                  Ваши покупки в надежных руках. Мы обеспечиваем безопасность и
                  надежность доставки, а также предоставляем возможность
                  отслеживать маршрут вашего заказа в реальном времени. Будьте
                  уверены, что ваш товар всегда под контролем.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <span className="font-bold text-xl">
                  Экологическая Ответственность
                </span>
                <p>
                  Мы ценим нашу планету. Поэтому наши усилия направлены на
                  создание экологически устойчивых методов доставки. Мы
                  стремимся сократить наше воздействие на окружающую среду,
                  сохраняя при этом высокое качество обслуживания.
                </p>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </Information>
  );
};

export { Description };
