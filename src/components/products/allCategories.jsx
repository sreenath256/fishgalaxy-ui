import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { categoryImages } from '../Data';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const CategoriesCarousel = () => {
  // Get all unique categories from the categoryImages object
  const categories = Object.keys(categoryImages);

  return (
    <div className="py-12 bg-gray-50 relative">
      <h2 className="text-2xl lg:text-3xl font-medium text-center mb-8 text-mainclr">Categories</h2>
      
      {/* Custom Navigation Buttons */}
      <div className="hidden absolute top-[40%] md:top-1/2 left-0 right-0 z-10 md:flex justify-between px-2">
        <button className="categories-prev bg-white p-2 w-10 grid place-items-center text-2xl h-10 rounded-full shadow-md hover:bg-blue-100 transition-colors">
          <IoIosArrowRoundBack/>
        </button>
        <button className="categories-next bg-white p-2 w-10 grid place-items-center text-2xl h-10 rounded-full shadow-md hover:bg-blue-100 transition-colors">
          <IoIosArrowRoundForward/>
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        loop={true}
        navigation={{
          prevEl: '.categories-prev',
          nextEl: '.categories-next',
        }}
        pagination={{
          clickable: true,
          el: '.categories-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
          renderBullet: (index, className) => {
            return `<span class="${className} bg-indigo-400 hover:bg-mainclr w-3 h-3 mx-1 rounded-full transition-colors"></span>`;
          },
        }}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        breakpoints={{
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        className="w-[98%] md:w-11/12 mx-auto relative"
      >
        {categories.map((category) => (
          <SwiperSlide key={category} className="pb-5">
            <div className="bg-white rounded-sm overflow-hidden hover:shadow-sm transition-shadow duration-300 h-full flex flex-col border border-gray-100 group">
              {/* Category Image */}
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={categoryImages[category]} 
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Category Title */}
              <div className="p-4 flex-grow flex flex-col items-center">
                <h3 className="font-medium text-sm text-center text-gray-800 group-hover:text-mainclr transition-colors">
                  {category}
                </h3>
                {/* <button className="mt-2 text-sm text-mainclr hover:text-indigo-800 transition-colors">
                  Shop Now →
                </button> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Container */}
      <div className="categories-pagination flex justify-center space-x-2 "></div>
    </div>
  );
};

export default CategoriesCarousel;