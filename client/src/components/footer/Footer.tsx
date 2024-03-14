import { FC } from "react";

import style from "./footer.module.css";
const Footer: FC = () => {
  return (
    <footer className="border-t border-t-black pt-10">
      <div className="container">
        <ul className="grid grid-cols-4 justify-between max-lg:grid-cols-2 max-lg:gap-10 max-sm:grid-cols-1 max-sm:justify-items-center max-sm:text-center">
          <li className="flex flex-col gap-5">
            <h3 className={style.title}>О компании</h3>
            <span>Партнеры</span>
            <span>Вакансии</span>
            <span>Для инвесторов</span>
          </li>
          <li className="flex flex-col gap-5">
            <h3 className={style.title}>Для клиентов</h3>
            <span>Партнеры</span>
            <span>Вакансии</span>
            <span>Для инвесторов</span>
          </li>
          <li className="flex flex-col gap-5">
            <h3 className={style.title}>Скидки и программы</h3>
            <span>Партнеры</span>
            <span>Вакансии</span>
            <span>Для инвесторов</span>
          </li>
          <li className="flex flex-col gap-5">
            <h3 className={style.title}>Социальные сети</h3>
          </li>
        </ul>
      </div>
      <div className="py-5 bg-black text-white mt-12">
        <div className="container text-center">
          © Copyright 2023 NEXX UK Limited. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export { Footer };
