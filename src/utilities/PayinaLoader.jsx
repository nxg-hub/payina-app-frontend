// import React from 'react';
// import { motion } from 'framer-motion';
// import payinaLogo from '../assets/images/payina_real-logo-crop.jpg';
//
// const PayinaLoader = ({ isVisible }) => {
//   if (!isVisible) return null;
//
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
//         <motion.div
//           animate={{
//             y: [0, -20, 0],
//           }}
//           transition={{
//             duration: 1.5,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//           className="w-32 h-32"
//         >
//           <img
//             src={payinaLogo}
//             alt="Payina Logo"
//             className="w-full h-full object-contain"
//           />
//         </motion.div>
//         <p className="mt-4 text-gray-700 font-medium">Processing your transaction...</p>
//       </div>
//     </div>
//   );
// };
//
// export default PayinaLoader;

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
