import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import "~/assets/styles/layouts/slide.less"
import Button from "~/components/Button"
import usePublicStore from "~/stores/public";
import { useEffect } from "react";

function Slide() {
  const publicStore = usePublicStore()  
  
  useEffect(() => {
    publicStore.fetchSlides()
  }, [])

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper" loop={true}>
        {publicStore.slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide">
              <img src={slide.image} />
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <Button>
                XEM SẢN PHẨM
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Slide