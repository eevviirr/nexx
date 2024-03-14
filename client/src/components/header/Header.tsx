import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import style from "./header.module.css";
import { Search } from "src/features/search/Search";
import { Logotype } from "src/shared/logotype/Logotype";
import heartIcon from "src/app/assets/heart.svg";
import basketIcon from "src/app/assets/basket.svg";
import { Navigation } from "./Navigation";
import { useAppSelector } from "src/app/hooks/useAppSelector";
import { useAppDispatch } from "src/app/hooks/useAppDispatch";
import { logOut } from "src/app/store/slices/userSlice";
import { setSearch } from "src/app/store/slices/searchSlice";

const Header: FC = () => {
  const user = useAppSelector((state) => state.userSlice);
  const search = useAppSelector((state) => state.searchSlice.search);
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
          setSearch={(e) => dispatch(setSearch(e.currentTarget.value))}
        />
        <div className="flex gap-4 items-center justify-end max-xl:justify-start max-md:col-span-2">
          {user.isAuth ? (
            <>
              <span
                className="font-bold cursor-pointer mr-10"
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logOut());
                }}
              >
                Выход
              </span>
              <Link to={"/favorites"}>
                <img src={heartIcon} alt="basketIcon" />
              </Link>
              <Link to={"/basket"} className="flex items-center gap-2 relative">
                <img src={basketIcon} alt="basketIcon" />

                {user && user.user.basket.length > 0 && (
                  <span className="w-6 h-6 bg-red-400 absolute -top-2 -right-3 rounded-full flex items-center justify-center text-white p-1">
                    {user.user.basket.length > 9
                      ? "9+"
                      : user?.user.basket.length}
                  </span>
                )}
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
