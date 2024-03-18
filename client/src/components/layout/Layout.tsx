import { FC } from "react";
import { Header } from "../header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";

const Layout: FC = () => {
  return (
    
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export { Layout };
