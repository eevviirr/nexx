import { FC } from "react";
import { NavLink } from "react-router-dom";

const Navigation: FC = () => {
  const navigateLink = [
    {
      link: "/catalog/3",
      title: "Новинки",
    },
    {
      link: "/catalog/1",
      title: "Одежда",
    },
    {
      link: "/catalog/2",
      title: "обувь",
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
