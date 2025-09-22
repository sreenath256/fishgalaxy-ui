import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { IoMdCart } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import axios from 'axios';
import { URL } from '../../Common/api';
import { config } from '../../Common/configurations';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ProductCard from './ProductCard';

const BestOffers = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get(`${URL}/user/offerProducts`, config);
      console.log(data)
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load best offers. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewAll = () => {
    // Navigate to shop page with filter for offer products
    navigate('/shop?isOfferProduct=true');
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Skeleton loading count based on screen size
  const skeletonCount = 5;



  return (
    <div className="py-12 bg-gray-50 relative">
       
      <div className='flex justify-between items-center w-[98%] md:w-11/12 mx-auto mb-8'>
        <h2 className="text-2xl lg:text-3xl font-medium text-black">
          {isLoading ? <Skeleton width={150} /> : 'Best Offers'}
        </h2>
        {!isLoading && !error && (
          <button
            onClick={handleViewAll}
            className='capitalize flex items-center gap-2 text-mainclr hover:text-mainhvr transition-colors'
          >
            <p>view all</p>
            <IoIosArrowRoundForward className='text-2xl' />
          </button>
        )}
      </div>

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

      {/* Custom Navigation Buttons - Only show when not loading and has products */}
      {!isLoading && products.length > 0 && (
        <div className="hidden absolute top-[40%] md:top-1/2 left-0 right-0 z-10 md:flex justify-between px-2">
          <button className="best-offers-prev bg-white p-2 w-10 grid place-items-center text-2xl h-10 rounded-full shadow-md hover:bg-blue-100 transition-colors">
            <IoIosArrowRoundBack />
          </button>
          <button className="best-offers-next bg-white p-2 w-10 grid place-items-center text-2xl h-10 rounded-full shadow-md hover:bg-blue-100 transition-colors">
            <IoIosArrowRoundForward />
          </button>
        </div>
      )}

      {/* Swiper Container */}
      <div className="w-[98%] md:w-11/12 mx-auto relative">
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-[calc(50%-10px)] sm:w-[calc(33.33%-10px)] md:w-[calc(25%-10px)] lg:w-[calc(20%-10px)]">
                <div className="bg-white rounded-sm overflow-hidden h-full flex flex-col border border-gray-100">
                  <Skeleton height={200} containerClassName="aspect-square block" />
                  <div className="p-4">
                    <Skeleton width="80%" className="mx-auto" />
                    <Skeleton width="60%" height={20} className="mt-2 mx-auto" />
                    <Skeleton width="40%" height={16} className="mt-2 mx-auto" />
                    <Skeleton width="100%" height={32} className="mt-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No best offers to display</p>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={2}
            loop={products.length > 1}
            navigation={{
              prevEl: '.best-offers-prev',
              nextEl: '.best-offers-next',
            }}
            pagination={{
              clickable: true,
              el: '.best-offers-pagination',
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
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id} className="pb-5">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Custom Pagination - Only show when not loading and has products */}
      {!isLoading && products.length > 0 && (
        <div className="best-offers-pagination flex justify-center space-x-2 mt-4"></div>
      )}
    </div>
  );
};

export default BestOffers;