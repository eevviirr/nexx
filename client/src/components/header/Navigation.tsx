import { FC } from "react";
import { NavLink } from "react-router-dom";

const Navigation: FC = () => {
  const navigateLink = [
    {
      link: "/catalog",
      title: "Каталог",
    },
    {
      link: "/catalog/new",
      title: "Новинки",
    },
    {
      link: "/catalog/sale",
      title: "Скидки",
    },
  ];
  return (
    <nav className="mt-5">
      <ul className="flex gap-10">
        {navigateLink.map(({ link, title }, i) => (
          <li key={i}>
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-b border-b-black" : "opacity-50"
              }
              to={link}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Navigation };
