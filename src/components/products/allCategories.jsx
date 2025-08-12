import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import axios from 'axios';
import { URL } from '../../Common/api';
import { config } from '../../Common/configurations';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import { NoImage } from '../../assets';

const CategoriesCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get(`${URL}/user/categories`, config);
      setCategories(data.categories);
    } catch (err) {
      console.error(err);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  // Skeleton loading count based on screen size
  const skeletonCount = 6;

  return (
    <div className="py-12 bg-gray-50 relative">
      <h2 className="text-2xl lg:text-3xl font-medium text-center mb-8 text-mainclr">
        {isLoading ? <Skeleton width={150} className="mx-auto" /> : 'Categories'}
      </h2>

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-500 mb-4">
          {error}
          <button 
            onClick={fetchData}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            Retry
          </button>
        </div>
      )}

      {/* Custom Navigation Buttons - Only show when not loading */}
      {!isLoading && categories.length > 0 && (
        <div className="hidden absolute top-[40%] md:top-1/2 left-0 right-0 z-10 md:flex justify-between px-2">
          <button className="categories-prev bg-white p-2 w-10 grid place-items-center text-2xl h-10 rounded-full shadow-md hover:bg-blue-100 transition-colors">
            <IoIosArrowRoundBack />
          </button>
          <button className="categories-next bg-white p-2 w-10 grid place-items-center text-2xl h-10 rounded-full shadow-md hover:bg-blue-100 transition-colors">
            <IoIosArrowRoundForward />
          </button>
        </div>
      )}

      {/* Swiper Container */}
      <div className="w-[98%] md:w-11/12 mx-auto relative">
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[calc(50%-10px)] sm:w-[calc(33.33%-10px)] md:w-[calc(25%-10px)] lg:w-[calc(20%-10px)] xl:w-[calc(16.66%-10px)]">
                <div className="bg-white rounded-sm overflow-hidden h-full flex flex-col border border-gray-100">
                  <Skeleton height={150} containerClassName="aspect-square block" />
                  <div className="p-4">
                    <Skeleton width="80%" className="mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No categories to display</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={2}
            loop={categories.length > 1}
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
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id} className="pb-5">
                <div 
                  className="bg-white rounded-sm overflow-hidden hover:shadow-sm transition-shadow duration-300 h-full flex flex-col border border-gray-100 group cursor-pointer"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={category.imgURL || NoImage}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col items-center">
                    <h3 className="font-medium text-sm text-center text-gray-800 group-hover:text-mainclr transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Custom Pagination - Only show when not loading and has categories */}
      {!isLoading && categories.length > 0 && (
        <div className="categories-pagination flex justify-center space-x-2 mt-4"></div>
      )}
    </div>
  );
};

export default CategoriesCarousel;