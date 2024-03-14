import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { BannerItem } from "./BannerItem";

const Banner: FC = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
        }}
        speed={2000}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {[...Array(8)].map((_, i) => (
          <SwiperSlide key={i}>
            <BannerItem link="/catalog" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export { Banner };
