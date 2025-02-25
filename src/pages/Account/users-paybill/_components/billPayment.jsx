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
//     className="w-full h-20 pl-2 flex items-center space-x-4 bg-customGray border-[0.1px] border-lightBlue rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//     <div className="relative w-24 h-24 bg-customGray rounded-full border-8 border-white -ml-4 -mt-4 -mb-4 flex items-center justify-center">
//       <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-yellow"></div>
//       <img src={iconSrc} alt={`${label} icon`} className="text-lightBlue" />
//     </div>
//     <span className="text-gray-700 font-medium">{label}</span>
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
//         <div className="mx-auto ml-[25%]">
//           <div className="flex justify-between items-center mt-28">
//             <div>
//               <h1 className="text-2xl font-bold">Pay Bills</h1>
//             </div>
//             <div>
//               <button
//                 onClick={handleBack}
//                 className="bg-transparent hover:bg-gray-200 p-2 rounded-full transition duration-300">
//                 <img src={back} alt="Back" className="w-15 h-15" />
//               </button>
//             </div>
//           </div>
//           <h1>What bills are you paying today?</h1>
//         </div>
//       </div>
//       <div className="container mx-auto px-4">
//         <div className="max-w-md mx-auto ml-[25%] w-3/4">
//           <div className="space-y-4 mt-20">
//             <BillOption
//               iconSrc={phoneIcon}
//               label="Airtime"
//               onClick={() => navigate('/account/airtime')}
//             />
//             <BillOption iconSrc={wifiIcon} label="Data" onClick={() => navigate('/account/data')} />
//             <BillOption iconSrc={zapIcon} label="Electricity" onClick={handleElectricityClick} />
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
import back from '../../../../assets/icons/back.svg';

const BillOption = ({ iconSrc, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-3 md:space-x-4 bg-customGray border-[0.1px] border-lightBlue rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 md:p-4 h-16 md:h-20">
    <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-customGray rounded-full border-4 md:border-6 lg:border-8 border-white flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-yellow"></div>
      <img src={iconSrc} alt={`${label} icon`} className="text-lightBlue w-6 h-6 md:w-8 md:h-8" />
    </div>
    <span className="text-gray-700 font-medium text-sm md:text-base">{label}</span>
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
          <div className="space-y-3 md:space-y-4 mt-8 md:mt-12 lg:mt-16">
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
              iconSrc={slidersIcon}
              label="Custom Bill"
              onClick={() => navigate('/account/bills')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillOptions;