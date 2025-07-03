import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { aquariumProducts } from '../../components/Data';
import { IoMdCart } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const NewArrivals = () => {
  const newArrivals = aquariumProducts.filter(product => 
    product.categories.includes('New Arrivals')
  );

  return (
    <div className="py-12 bg-gray-50 relative">
      <div className='flex justify-between items-center w-[98%] md:w-11/12 mx-auto mb-8'>
        <h2 className="text-3xl font-medium text-mainclr">New Arrivals</h2>
        <Link to={'/shop'} className='capitalize flex items-center gap-2'>
          <p>view all</p> 
          <IoIosArrowRoundForward className='text-2xl'/>
        </Link>
      </div>
      
      {/* Custom Navigation Buttons */}
      <div className="hidden absolute top-[40%] md:top-1/2 left-0 right-0 z-10 md:flex justify-between px-2">
        <button className="new-arrivals-prev bg-white p-2 w-10 grid place-items-center text-2xl h-10 rounded-full shadow-md hover:bg-blue-100 transition-colors">
          <IoIosArrowRoundBack/>
        </button>
        <button className="new-arrivals-next bg-white p-2 w-10 grid place-items-center text-2xl h-10 rounded-full shadow-md hover:bg-blue-100 transition-colors">
          <IoIosArrowRoundForward/>
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        loop={true}
        navigation={{
          prevEl: '.new-arrivals-prev',
          nextEl: '.new-arrivals-next',
        }}
        pagination={{
          clickable: true,
          el: '.new-arrivals-pagination',
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
        className="w-[98%] md:w-11/12 mx-auto relative"
      >
        {newArrivals?.slice(0, 10).map((product) => (
          <SwiperSlide key={product.id} className="pb-5">
            <Link to={`/shop/${product.id}`}>
              <div className="bg-white rounded-sm overflow-hidden hover:shadow-sm transition-shadow duration-300 h-full flex flex-col border border-gray-100 group">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.offerPrice < product.price && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round((1 - product.offerPrice/product.price) * 100)}% OFF
                    </span>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-medium text-sm text-center text-gray-800 group-hover:text-mainclr transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Pricing */}
                  <div className="mt-2 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <span className="font-medium text-mainclr">
                        ₹{product.offerPrice}
                      </span>
                      {product.offerPrice < product.price && (
                        <span className="text-gray-500 line-through text-sm">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                    
                    {/* Stock Status */}
                    <div className="flex justify-center items-center mt-2 text-xs">
                      <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                      {product.stock > 0 && (
                        <span className="ml-2 bg-gray-100 text-mainclr px-1 py-0.5 rounded">
                          {product.stock} left
                        </span>
                      )}
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                      className="mt-3 w-full text-sm bg-mainclr hover:bg-mainhvr text-white py-2 px-4 rounded-sm transition-colors flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic here
                      }}
                    >
                      <IoMdCart/>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Container */}
      <div className="new-arrivals-pagination flex justify-center space-x-2"></div>
    </div>
  );
};

export default NewArrivals;