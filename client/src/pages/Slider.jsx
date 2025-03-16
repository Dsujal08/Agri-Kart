import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const ImageCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="w-full h-[600px]" // Set a valid height
    >
      <SwiperSlide>
        <img
          src="/src/images/Green Modern Agriculture Presentation.jpg"
          alt="Green Modern Agriculture"
          className="w-full h-full object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
      </SwiperSlide>
      {/* <SwiperSlide>
        <img
          src="/src/cards/brands_img/slider.png"
          alt="Agriculture Machinery"
          className=" h-full object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/src/cards/brands_img/slider3.png"
          alt="Farming Tools"
          className="w-full h-full object-cover rounded-lg shadow-lg"
          loading="lazy"
        />
      </SwiperSlide> */}
    </Swiper>
  );
};

export default ImageCarousel;
