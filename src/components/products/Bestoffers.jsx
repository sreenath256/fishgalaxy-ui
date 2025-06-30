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



const BestOffers = () => {
  const bestOffers = aquariumProducts.filter(product => 
    product.categories.includes('Best Offers')
  );

  return (
    <div className="w-[98%] md:w-11/12 mx-auto py-12 relative">
      <div className='flex justify-between items-center mb-8'>
        <h2 className="text-3xl font-medium text-mainclr">Best Offers</h2>
        <Link to={'/shop'} className='capitalize flex items-center gap-2'><p>view all</p> <IoIosArrowRoundForward className='text-2xl'/></Link>
      </div>
      
      <div className=' relative grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
        {bestOffers?.slice(0, 10).map((product,i)=>(
        <>
        <Link to={`/shop/1`}>
        <div key={i} className="bg-white rounded-md overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                      {/* Product Image */}
                      <div className="aspect-square overflow-hidden relative">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                        />
                        {product.offerPrice < product.price && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {Math.round((1 - product.offerPrice/product.price) * 100)}% OFF
                          </span>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="font-medium text-sm xl:text-base mb-2 text-gray-800">{product.name}</h3>
                        
                        {/* Pricing with ₹ symbol */}
                        <div className="mt-auto">
                          <div className="flex text-sm xl:text-base  items-center gap-2">
                            <span className=" font-medium text-mainclr">
                              ₹{product.offerPrice}
                            </span>
                            {product.offerPrice < product.price && (
                              <span className=" text-gray-500 line-through">
                                ₹{product.price}
                              </span>
                            )}
                          </div>
                          
                          {/* Stock Status */}
                          <div className="flex text-xs xl:text-sm  items-center mt-2">
                            <span className={` ${
                              product.stock > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                            {product.stock > 0 && (
                              <span className="ml-2  bg-gray-100 text-mainclr px-2 py-1 rounded">
                                {product.stock} left
                              </span>
                            )}
                          </div>
                          
                          {/* Add to Cart Button */}
                          <button className="mt-4 w-full text-sm bg-mainclr hover:bg-mainhvr text-white py-2 px-4 rounded-sm transition-colors flex items-center justify-center gap-2">
                            <IoMdCart/>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                    </Link>
        </>
      ))}
      </div>

    </div>
  );
};

export default BestOffers;