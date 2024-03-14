import { FC } from "react";
import { motion } from "framer-motion";

interface IButton {
  title: string;
  onClick?: () => void;
  className?: string;
}
const Button: FC<IButton> = ({ title, onClick, className }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.9,
      }}
      transition={{
        ease: "backOut",
        duration: 0.2,
      }}
      onClick={onClick}
      className={`px-[20px] py-[15px] bg-black text-white font-bold text-lg ${className}`}
    >
      {title}
    </motion.button>
  );
};

export { Button };
