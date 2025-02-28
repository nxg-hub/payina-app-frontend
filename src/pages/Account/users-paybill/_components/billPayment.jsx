// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import wifiIcon from '../../../../assets/icons/data.svg';
// import phoneIcon from '../../../../assets/icons/airtime.svg';
// import zapIcon from '../../../../assets/icons/electricity.svg';
// import slidersIcon from '../../../../assets/icons/custombills.svg';
// import back from '../../../../assets/icons/back.svg';
//
// const BillOption = ({ iconSrc, label, onClick }) => (
//   <button
//     onClick={onClick}
//     className="w-full flex items-center space-x-3 md:space-x-4 bg-customGray border-[0.1px] border-lightBlue rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 md:p-4 h-16 md:h-20">
//     <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-customGray rounded-full border-4 md:border-6 lg:border-8 border-white flex items-center justify-center">
//       <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-yellow"></div>
//       <img src={iconSrc} alt={`${label} icon`} className="text-lightBlue w-6 h-6 md:w-8 md:h-8" />
//     </div>
//     <span className="text-gray-700 font-medium text-sm md:text-base">{label}</span>
//   </button>
// );
//
// const BillOptions = () => {
//   const navigate = useNavigate();
//
//   function handleBack() {
//     navigate(-1);
//   }
//
//   const handleElectricityClick = () => {
//     navigate('/account/bills/plans', {
//       state: {
//         formValues: {
//           selectedBettingService: 'ELECTRIC_DISCO',
//           isBetting: false,
//         },
//         selectedBettingService: 'ELECTRIC_DISCO',
//         slug: 'ELECTRIC_DISCO',
//       },
//       replace: true,
//     });
//   };
//
//   return (
//     <div className="bg-white min-h-screen">
//       <div className="container mx-auto px-4">
//         <div className="max-w-md mx-auto w-full">
//           <div className="flex justify-between items-center pt-8 md:pt-16 lg:pt-28">
//             <div>
//               <h1 className="text-xl md:text-2xl font-bold">Pay Bills</h1>
//               <h2 className="text-sm md:text-base mt-1">What bills are you paying today?</h2>
//             </div>
//             <div>
//               <button
//                 onClick={handleBack}
//                 className="bg-transparent hover:bg-gray-200 p-2 rounded-full transition duration-300">
//                 <img src={back} alt="Back" className="w-6 h-6 md:w-8 md:h-8" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container mx-auto px-4">
//         <div className="max-w-md mx-auto w-full">
//           <div className="space-y-3 md:space-y-4 mt-8 md:mt-12 lg:mt-16">
//             <BillOption
//               iconSrc={phoneIcon}
//               label="Airtime"
//               onClick={() => navigate('/account/airtime')}
//             />
//             <BillOption
//               iconSrc={wifiIcon}
//               label="Data"
//               onClick={() => navigate('/account/data')}
//             />
//             <BillOption
//               iconSrc={zapIcon}
//               label="Electricity"
//               onClick={handleElectricityClick}
//             />
//             <BillOption
//               iconSrc={slidersIcon}
//               label="Custom Bill"
//               onClick={() => navigate('/account/bills')}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default BillOptions;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import wifiIcon from '../../../../assets/icons/data.svg';
import phoneIcon from '../../../../assets/icons/airtime.svg';
import zapIcon from '../../../../assets/icons/electricity.svg';
import slidersIcon from '../../../../assets/icons/custombills.svg';
import bet9jaIcon from '../../../../assets/images/Bet9ja_Logo.svg';
import dsTvIcon from '../../../../assets/images/DSTVLogo.jpeg';
import jambIcon from '../../../../assets/images/jamb.png';
import lccIcon from '../../../../assets/images/lcc_logo.jpg';
import offeringIcon from '../../../../assets/images/rccg logo.png';
import milaIcon from '../../../../assets/images/milacinema logo.jpeg';
import wakanowIcon from '../../../../assets/images/wakanow logo.png';
import lasgIcon from '../../../../assets/images/cowry logo.png';
import back from '../../../../assets/icons/back.svg';

const tvIcon = slidersIcon; // Replace with actual TV icon when available
const bettingIcon = bet9jaIcon;
const transportIcon = lccIcon;
const collectionsIcon = offeringIcon;
const govIcon = dsTvIcon;
const intAirtimeIcon = wakanowIcon; // Replace with actual international airtime icon when available
const educationIcon = jambIcon;
const entertainmentIcon = milaIcon;
const foodIcon = lasgIcon;
const paymentsIcon = wakanowIcon; // Replace with actual payments icon when available

const BillOption = ({ iconSrc, label, onClick, isCustom = false, customIcons = [] }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-3 md:space-x-4 bg-customGray border-[0.1px] border-lightBlue rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 md:p-4 h-16 md:h-20">
    {!isCustom ? (
      <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-customGray rounded-full border-4 md:border-6 lg:border-8 border-white flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-yellow"></div>
        <img src={iconSrc} alt={`${label} icon`} className="text-lightBlue w-6 h-6 md:w-8 md:h-8" />
      </div>
    ) : (
      <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-customGray rounded-full border-4 md:border-6 lg:border-8 border-white flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-yellow"></div>
        <div className="grid grid-cols-3 gap-1 p-1 w-full h-full">
          {customIcons.slice(0, 9).map((icon, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={icon}
                alt={`Custom icon ${index}`}
                className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4"
              />
            </div>
          ))}
        </div>
      </div>
    )}
    <div className="flex flex-col">
      <span className="text-gray-700 font-medium text-left text-sm md:text-base">{label}</span>
      {isCustom && (
        <span className="text-gray-500 text-xs md:text-xs">
          TV, Betting, Education, Jamb, Church offering & more
        </span>
      )}
    </div>
  </button>
);

const BillOptions = () => {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  const handleElectricityClick = () => {
    navigate('/account/bills/plans', {
      state: {
        formValues: {
          selectedBettingService: 'ELECTRIC_DISCO',
          isBetting: false,
        },
        selectedBettingService: 'ELECTRIC_DISCO',
        slug: 'ELECTRIC_DISCO',
      },
      replace: true,
    });
  };

  const customIcons = [
    tvIcon,           // PAY_TV
    bettingIcon,      // BETTING_AND_LOTTERY
    transportIcon,    // TRANSPORT_AND_TOLL_PAYMENT
    collectionsIcon,  // COLLECTIONS
    govIcon,          // GOVERNMENT_COLLECTIONS
    intAirtimeIcon,   // INTERNATIONAL_AIRTIME
    educationIcon,    // EDUCATION
    entertainmentIcon,// ENTERTAINMENT_AND_LIFESTYLE
    foodIcon,         // FOOD
    paymentsIcon      // payments
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-between items-center pt-8 md:pt-16 lg:pt-28">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Pay Bills</h1>
              <h2 className="text-sm md:text-base mt-1">What bills are you paying today?</h2>
            </div>
            <div>
              <button
                onClick={handleBack}
                className="bg-transparent hover:bg-gray-200 p-2 rounded-full transition duration-300">
                <img src={back} alt="Back" className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto w-full">
          <div className="space-y-3 md:space-y-4 mt-8 md:mt-12 lg:mt-16 pb-10">
            <BillOption
              iconSrc={phoneIcon}
              label="Airtime"
              onClick={() => navigate('/account/airtime')}
            />
            <BillOption
              iconSrc={wifiIcon}
              label="Data"
              onClick={() => navigate('/account/data')}
            />
            <BillOption
              iconSrc={zapIcon}
              label="Electricity"
              onClick={handleElectricityClick}
            />
            <BillOption
              isCustom={true}
              customIcons={customIcons}
              label="Custom Bills"
              onClick={() => navigate('/account/bills')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillOptions;