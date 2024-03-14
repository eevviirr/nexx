import { FC } from "react";
import { Link } from "react-router-dom";

import logo from "src/app/assets/logo.svg";

const Logotype: FC = () => (
    <Link to={"/"} className="inline w-max">
        <img src={logo} alt='logo' />
    </Link>
);

export { Logotype };
