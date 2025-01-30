import React from 'react';
import { motion } from 'framer-motion';
import payinaLogo from '../assets/images/payina_real-logo-crop.jpg';

const PayinaLoader = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-32 h-32"
        >
          <img
            src={payinaLogo}
            alt="Payina Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>
        <p className="mt-4 text-gray-700 font-medium">Processing your transaction...</p>
      </div>
    </div>
  );
};

export default PayinaLoader;