import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ isComplete }) => {
  const brandName = "Fish Galaxy";

  // Wave animation variants for each letter
  const letterVariants = {
    initial: { y: 0, opacity: 0 },
    animate: (i) => ({
      y: [0, -20, 0],
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white z-[9999]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.5, 
              ease: "easeInOut",
              delay: 0.2 // Small delay to ensure letters finish their animation
            }
          }}
        >
          <motion.div className="flex flex-col items-center">
            <div className="flex">
              {brandName.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-2xl md:text-3xl font-semibold text-indigo-600"
                  custom={i}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;