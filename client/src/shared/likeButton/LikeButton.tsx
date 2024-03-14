import { FC } from "react";

interface ILikeButton {
  favorite: boolean;
  setFavorite: (n: boolean) => void;
  className?: string;
}

const LikeButton: FC<ILikeButton> = ({ favorite, setFavorite, className }) => {
  return (
    <button
      className={`favorite w-[50px] h-[50px] flex items-center justify-center bg-black rounded-full cursor-pointer 
        relative before:transition-all before:duration-200
        max-md:w-[40px] max-md:h-[40px] hover:scale-110 duration-200 ease-pop
        ${
          favorite
            ? "before:w-full before:h-full before:bg-white before:absolute before:rounded-full z-0 before:scale-105 before:border"
            : "before:w-full before:h-full before:bg-white before:absolute before:rounded-full z-0 before:scale-0"
        } ${className}`}
      onClick={() => {
        setFavorite(!favorite);
      }}
    >
      <svg
        className="relative z-10 w-[18px] h-[16px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 16"
        dur={"1s"}
        fill={favorite ? "red" : "transparent"}
      >
        <path
          d="M12.2889 1C15.1067 1 17 3.6075 17 6.04C17 10.9663 9.14222 15 9 15C8.85778 15 1 10.9663 1 6.04C1 3.6075 2.89333 1 5.71111 1C7.32889 1 8.38667 1.79625 9 2.49625C9.61333 1.79625 10.6711 1 12.2889 1Z"
          stroke={favorite ? "red" : "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export { LikeButton };
