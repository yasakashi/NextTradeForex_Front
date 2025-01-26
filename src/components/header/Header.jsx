// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import "./Header.css";

const Item = () => {
  return (
    <div className="bg-white w-[100px] px-4 py-1 border-l h-[40px]">
      <h3 className="text-sm leading-4">USDCHF</h3>
      <div className="flex items-center space-x-3">
        <span className="text-xl">1.23699</span>
        <div className="flex items-center gap-2">
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="green"
            >
              <path d="M24 22h-24l12-20z" />
            </svg>
          </span>
          <span className="text-green-700 text-sm">1.64%</span>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <>
      <div class="custom-ticker">
        <div class="marquee text-2xl text-white h-[50px] overflow-hidden relative">
          <div class="custom-marquee block w-[200%] absolute overflow-hidden">
            <span>
              <iframe
                scrolling="no"
                allowtransparency="true"
                frameborder="0"
                width="100%"
                height="50"
                src="https://www.mql5.com/quotes/widget?type=ticker&amp;filter=EURUSD%2CUSDJPY%2CGBPUSD%2CAUDUSD%2CUSDCAD%2CUSDCHF%2CNZDUSD%2CWTI_F3%2CXAUUSD%2CXAGUSD%2CGBPAUD%2CEURJPY%2CBRENT_G3%2CUS30%2CGER30M&amp;id=quotesWidgetTicker&amp;utm_source=localhost"
              ></iframe>
            </span>

            <span>
              <iframe
                scrolling="no"
                allowtransparency="true"
                frameborder="0"
                width="100%"
                height="50"
                src="https://www.mql5.com/quotes/widget?type=ticker&amp;filter=EURUSD%2CUSDJPY%2CGBPUSD%2CAUDUSD%2CUSDCAD%2CUSDCHF%2CNZDUSD%2CWTI_F3%2CXAUUSD%2CXAGUSD%2CGBPAUD%2CEURJPY%2CBRENT_G3%2CUS30%2CGER30M&amp;id=quotesWidgetTicker&amp;utm_source=localhost"
              ></iframe>
            </span>
          </div>
        </div>
      </div>
      {/* <Swiper
        direction="horizontal"
        slidesPerView={7}
        simulateTouch={false}
        effect="slide"
        // slidesPerView="auto"
        // spaceBetween={10}
        loop={true}
        // centeredSlides={true}
        autoplay={{
          enabled: true,
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        centerInsufficientSlides={true}
        speed={1600}
        loopAdditionalSlides={true}
        // noSwipingClass="swiper-slide"
        // autoplay={{
        //   delay: 0,
        //   disableOnInteraction: true,
        //   // pauseOnMouseEnter: false,
        // }}
        // breakpoints={{
        //   640: {
        //     slidesPerView: 1,
        //     spaceBetween: 20,
        //   },
        //   768: {
        //     slidesPerView: 4,
        //     spaceBetween: 40,
        //   },
        //   1024: {
        //     slidesPerView: 5,
        //     spaceBetween: 50,
        //   },
        // }}
        modules={[Autoplay]}
        className="mySwiper space-x-0"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
          <SwiperSlide key={index} className="!mr-0 !w-[200px]">
            <Item />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </>
  );
};

export default Header;
