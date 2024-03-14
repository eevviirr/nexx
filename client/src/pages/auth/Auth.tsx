import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "src/shared/button/Button";
import { Input } from "src/shared/input/Input";
import { auth } from "./api";
import { useAppDispatch } from "src/app/hooks/useAppDispatch";
import { useAppSelector } from "src/app/hooks/useAppSelector";

const Auth: FC = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isReg, setIsReg] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.isAuth);
  const status = useAppSelector((state) => state.userSlice.status);
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="container pb-24">
      {status !== "loading" && status !== "succeeded" ? (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 max-w-[500px] w-full bg-accent bg-opacity-80 z-50 text-white font-bold text-2xl p-10">
          <span className="block">
            {status !== "loading" && status !== "succeeded" ? status : ""}
          </span>
        </div>
      ) : (
        ""
      )}

      <div className="max-w-[840px] w-full mx-auto pt-20 max-lg:pt-32 relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isReg ? "registration" : "login"}
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -500 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="absolute top-0 left-0 max-w-[600px] w-full h-[500px] max-md:h-[660px] bg-[#343434] z-0 p-[60px] max-sm:p-5 flex flex-col justify-between"
          >
            <h2 className="text-6xl max-md:text-4xl text-white font-bold block break-all max-w-[280px] max-lg:max-w-full max-sm:text-2xl">
              {isReg ? "Регистрация" : "Вход"}
            </h2>
            <div className="flex flex-col gap-2">
              <span className="text-white/50">
                {isReg ? " Есть аккаунт ?" : "Еще нет аккаунта ?"}
              </span>
              <span
                className="font-bold text-white cursor-pointer"
                onClick={() => setIsReg(!isReg)}
              >
                {isReg ? "Войти " : "Зарегестрироваться"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.form
            key={isReg ? "reg" : "log"}
            initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 500 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            onSubmit={(e) =>
              auth(e, value.name, value.email, value.password, isReg, dispatch)
            }
            className="z-10 relative h-[580px] max-w-[480px] w-full bg-black/50 max-md:bg-transparent ml-auto py-20 max-md:pt-5 max-sm:pt-0 px-[70px] max-sm:px-5 flex flex-col gap-10 max-md:mx-auto pointer-events-none"
          >
            {isReg && (
              <Input
                setValue={(e) => setValue({ ...value, name: e.target.value })}
                value={value.name}
                placeholder="Имя"
                className="bg-transparent !border-white placeholder:text-white/50 text-white pointer-events-auto"
              />
            )}
            <Input
              setValue={(e) => setValue({ ...value, email: e.target.value })}
              value={value.email}
              placeholder="Email"
              type="email"
              className="bg-transparent !border-white placeholder:text-white/50 text-white pointer-events-auto"
            />
            <Input
              type="password"
              setValue={(e) => setValue({ ...value, password: e.target.value })}
              value={value.password}
              placeholder="Пароль"
              className="bg-transparent !border-white placeholder:text-white/50 text-white pointer-events-auto"
            />
            <Button
              title={isReg ? "Зарегестрироваться" : "Войти"}
              className="bg-white !text-black mt-10 max-sm:!text-xs pointer-events-auto"
            />
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
};

export { Auth };
