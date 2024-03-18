import { FC } from "react";

interface IModal {
  children: React.ReactNode;
  isActive?: boolean;
}

const Modal: FC<IModal> = ({ children, isActive }) => {
  return (
    <>
      {isActive && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
          {children}
        </div>
      )}
    </>
  );
};

export { Modal };
