import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "./header.module.css";
import { Search } from "src/features/search/Search";
import { Logotype } from "src/shared/logotype/Logotype";
import basketIcon from "src/app/assets/basket.svg";
import { Navigation } from "./Navigation";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { useAppDispatch } from "src/app/hooks/useAppDispatch";
import { logOut } from "src/app/store/slices/userSlice";
import { setSearch } from "src/app/store/slices/searchSlice";

const Header: FC = () => {
  const user = useAppSelector((state) => state.userSlice);
  const search = useAppSelector((state) => state.searchSlice.search);
  const [sexActive, setSexActive] = useState(0);
  const sex = ["Мужчинам", "Женьщинам"];
  const navigate = useNavigate();
  const onFocus = () => {
    navigate("/search");
  };
  const onBlur = () => {
    navigate(-1);
  };
  
  const dispatch = useAppDispatch();
  return (
    <header className="py-8 container">
      <div className={style.header__top}>
        <Logotype />
        <Search
          onFocus={onFocus}
          onBlur={onBlur}
          search={search}
          setSearch={e => dispatch(setSearch(e.currentTarget.value))}
        />
        <ul className="flex gap-10 items-center justify-center">
          {sex.map((item, i) => (
            <li
              key={i}
              onClick={() => setSexActive(i)}
              className={`${sexActive === i ? "font-bold" : ""} cursor-pointer`}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex gap-10 items-center justify-end">
          {user.isAuth ? (
            <>
              <span
                className="font-bold cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logOut());
                }}
              >
                Выход
              </span>
              <Link to={"/basket"} className="flex items-center gap-2">
                Корзина
                <img src={basketIcon} alt="basketIcon" />
                <div className="relative">
                  {user && user.user.basket.length > 0 && (
                    <span className="w-6 h-6 bg-red-400 absolute -top-2 -right-3 rounded-full flex items-center justify-center text-white p-1">
                      {user.user.basket.length > 9
                        ? "9+"
                        : user?.user.basket.length}
                    </span>
                  )}
                </div>
              </Link>
            </>
          ) : (
            <Link to={"/auth"} className="font-bold">
              Вход
            </Link>
          )}
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export { Header };
