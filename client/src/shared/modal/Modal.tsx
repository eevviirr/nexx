import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

interface IModal {
  children: React.ReactNode;
  isActive?: boolean;
}

const Modal: FC<IModal> = ({ children, isActive }) => {
  motion;
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Modal };
