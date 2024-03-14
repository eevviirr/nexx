import { FC } from "react";
import { Navigate } from "react-router-dom";

interface IReqAuth {
    isAuth: boolean;
    children: React.ReactNode;
}
const ReqAuth: FC<IReqAuth> = ({ isAuth, children }) => {
    if (!isAuth && !localStorage.getItem('token')) {
        return <Navigate to={"/"} />;
    }
    return children;
};

export { ReqAuth };
