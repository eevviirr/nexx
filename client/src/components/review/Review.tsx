import { FC } from "react";

import starImg from "src/app/assets/starIcon.svg";

interface IReview {
    comment: string;
    username: string;
    date: string;
    starCount: number;
}

const Review: FC<IReview> = ({ comment, username, date, starCount }) => {
    return (
        <div>
            <div className='flex gap-2'>
                {[...Array(starCount)].map((_, i) => (
                    <img key={i} src={starImg} alt='star img' />
                ))}
            </div>
            <div className='flex gap-5 mt-5'>
                <div className='w-10 col-span-1 h-10 bg-black'></div>
                <div className='flex flex-col'>
                    <span>{username}</span>
                    <span>{date}</span>
                </div>
            </div>
            <p>{comment}</p>
        </div>
    );
};

export { Review };
