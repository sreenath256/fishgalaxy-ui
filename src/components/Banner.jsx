import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import ban1 from '../assets/images/fishban1 (1).jpg';
import ban2 from '../assets/images/fishban2 (1).jpg';
import { Link } from 'react-router-dom';
// Slide data array
const bannerData = [
  {
    id: 1,
    title: "Premium Aquarium Essentials",
    description: "Everything you need for a thriving underwater ecosystem",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: ban1
  },
  {
    id: 2,
    title: "Tropical Fish Specials",
    description: "New arrivals of exotic species - limited quantities available!",
    buttonText: "Explore more",
    buttonLink: "/shop",
    image: ban2
  }
];
const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, bannerData.length]);

  // Handle manual slide change
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  // Handle next/prev navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
    setAutoPlay(false);
  };
  return (
    <div>
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full group">
        <AnimatePresence initial={false}>
          <motion.div
            key={bannerData[currentSlide].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Background Image - Changed to img tag */}
            <img
              src={bannerData[currentSlide].image}
              alt={bannerData[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

            {/* Content */}
            <div className="w-10/12 mx-auto h-full flex text-center md:text-left items-center relative z-10 px-4">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-white max-w-xl"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {bannerData[currentSlide].title}
                </h1>
                <p className="text-lg md:text-xl mb-6">
                  {bannerData[currentSlide].description}
                </p>
                <Link to={bannerData[currentSlide].buttonLink} className="bg-white text-mainclr px-6 py-3 rounded-md font-medium hover:bg-indigo-100 transition-colors duration-300">
                  {bannerData[currentSlide].buttonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-[90%] xl:top-1/2 -translate-y-1/2 bg-white opacity-0 group-hover:opacity-100 bg-opacity-30 p-2 rounded-full hover:bg-opacity-80 transition-all z-20"
        >
          <IoIosArrowRoundBack className="text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-[90%] xl:top-1/2 -translate-y-1/2 bg-white opacity-0 group-hover:opacity-100 bg-opacity-30 p-2 rounded-full hover:bg-opacity-80 transition-all z-20"
        >
          <IoIosArrowRoundForward className="text-2xl" />
        </button>

        {/* Pagination */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Banner
