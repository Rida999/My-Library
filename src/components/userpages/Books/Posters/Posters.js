import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Pagination,EffectCards,Autoplay } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination,EffectCards,Autoplay]}
        className="Posters shadow-xl"
      >
        <SwiperSlide><img src="https://static01.nyt.com/images/2021/03/26/books/26athome-newsletter-1/00APRIL-BOOKS-COMBO-mobileMasterAt3x.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://content.fortune.com/wp-content/uploads/2021/08/Fall-2021-books.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}
