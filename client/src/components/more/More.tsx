import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "src/shared/button/Button";

interface IMore {
    title: string;
    link: string;
}
const More: FC<IMore> = ({ title, link }) => {
    const navigate = useNavigate();
    const navTo = () => {
        navigate(link);
    };
    return (
        <div className='flex justify-between items-center py-5'>
            <span className="text-2xl font-bold">{title}</span>
            <Button title='Посмотреть' onClick={navTo} />
        </div>
    );
};

export { More };
