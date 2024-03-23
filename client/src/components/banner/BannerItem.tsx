import { FC } from "react";

interface IBannerItem {
  link: string;
}
const BannerItem: FC<IBannerItem> = () => {
  return (
    <div className="relative pl-[120px] pt-[96px] max-md:pl-0 min-h-[500px]">
      <img
        src={
          "https://kaliningrad.rybak96.ru/wa-data/public/shop/promos/02/00/2/promo_5ffedb6c38b52850703868.png"
        }
        alt="bannerImg"
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
    </div>
  );
};

export { BannerItem };
