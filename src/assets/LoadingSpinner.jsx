// import React from 'react';

// const Loader = () => (
  // <div className="flex justify-center items-center">
  //   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  // </div>
// );

// export default Loader;


import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import logo from '../assets/images/logo.png'

const Loader = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) return null; // Hide loader when not loading

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50">
      <div className="relative flex justify-center items-center">
        {/* Big Black Circle */}
        <motion.div
          className="w-24 h-24 md:w-32 md:h-32 bg-black rounded-full"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-16 h-16 md:w-20 md:h-20 bg-blue-300 rounded-full flex justify-center items-center"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <img src={logo} alt="Logo" className="w-18 h-18 md:w-15 md:h-15 object-contain" />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
