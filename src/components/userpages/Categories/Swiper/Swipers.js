import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./Styles.css";

// import required modules
import { EffectCards,Autoplay } from "swiper";

export default function Swipers(props) {
  const {books}=props;
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCards,Autoplay]}
        className="mySwiper"
      >
        {books.map((book)=>(
                          <SwiperSlide key={book.url}>
                            <img src={book.url} alt="" />
                          </SwiperSlide>
                          ))}
      </Swiper>
    </>
  );
}


