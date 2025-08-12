
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaShoppingBag } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Success = () => {

  const location = useLocation();
  const orderData = location.state;

  const navigate = useNavigate()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const checkVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.6 }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.8 }
    },
    hover: { scale: 1.05 }
  };


useEffect(() => {
  if (!orderData) {
    navigate('/');
  }
}, [navigate, orderData]);

if (!orderData) {
  return null; // or <LoadingSpinner />;
}


  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
        {/* Animated Checkmark */}
        <motion.div
          className="mx-auto flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          variants={checkVariants}
        >
          <FaCheck className="text-green-500 text-4xl" />
        </motion.div>

        {/* Success Text */}
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-3"
          variants={textVariants}
        >
          Order Successful!
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8"
          variants={textVariants}
        >
          Order ID: {orderData.orderId}
        </motion.p>

        <motion.p
          className="text-gray-600 mb-8"
          variants={textVariants}
        >
          Order Total: {orderData.totalPrice}
        </motion.p>




        <motion.p
          className="text-gray-600 mb-8"
          variants={textVariants}
        >
          Thank you for your purchase. Your order has been received and is being processed.
        </motion.p>

        {/* Order Details (optional) */}
        <motion.div
          className="bg-gray-50 rounded-lg p-4 mb-8 text-left"
          variants={textVariants}
        >
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-medium"> {orderData.orderId}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Totoal Price:</span>
            <span className="font-medium"> {orderData.totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span className="font-medium">July 10, 2023</span>
          </div>
        </motion.div>

        {/* Back to Shopping Button */}
        <motion.div variants={buttonVariants}>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            whileHover="hover"
          >
            <FaShoppingBag className="mr-2" />
            Back to Shopping
          </Link>
        </motion.div>

        {/* Additional Help Text */}
        <motion.p
          className="text-sm text-gray-500 mt-6"
          variants={textVariants}
        >
          Need help? <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Success;