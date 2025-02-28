// import React, { useState } from 'react';
// import backArrow from '../../../assets/images/Group-backArrow.png';
// import { Link } from 'react-router-dom';
// import payinaUserImg from '../../../assets/images/Layer_x0020_1.png';
// import anotherPersonImg from '../../../assets/images/Group-AnotherPerson.png';
// import RequestMoney from './requestMoney';
// import AccountDetails from './AccountDetails';
// import FundWallet from './fundWallet';
//
// const AddMoney = () => {
//   const [selectedForm, setSelectedForm] = useState(null);
//
//   const goBack = () => {
//     setSelectedForm(null);
//   };
//
//   const renderForm = () => {
//     switch (selectedForm) {
//       case 'accountDetails':
//         return <AccountDetails goBack={goBack} />;
//       case 'fundWallet':
//         return <FundWallet goBack={goBack} />;
//       case 'requestMoney':
//         return <RequestMoney goBack={goBack} />;
//       default:
//         return (
//           <div className="flex flex-col justify-center items-start ml-[50px] xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
//             <div className="flex flex-row justify-between items-left lg:gap-[45rem] gap-[10rem] mt-3">
//               <div className="text-xl md:text-3xl">Add Money</div>
//               <Link to="/account/dashboard">
//                 <div className="flex flex-row gap-2 cancelAction-img cursor-pointer">
//                   <img src={backArrow} alt="cancelAction"></img>
//                   <div className="text-md text-center mt-2">Back</div>
//                 </div>
//               </Link>
//             </div>
//             <div className="text-md md:text-xl font-bold mt-12">How do you want to add money?</div>
//             <div
//               onClick={() => setSelectedForm('accountDetails')}
//               className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 lg:px-10 px-2 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
//               <div className="border border-yellow rounded-full p-3">
//                 <img src={payinaUserImg} alt="payrollSelect" />
//               </div>
//               <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
//                 Payina Account Details
//               </div>
//             </div>
//             <div
//               onClick={() => setSelectedForm('fundWallet')}
//               className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 lg:px-20 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
//               <div className="border border-yellow rounded-full p-3">
//                 <img src={anotherPersonImg} alt="payrollSelect" />
//               </div>
//               <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
//                 Fund With Card
//               </div>
//             </div>
//             <div
//               onClick={() => setSelectedForm('requestMoney')}
//               className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 lg:px-20 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
//               <div className="border border-yellow rounded-full p-3">
//                 <img src={anotherPersonImg} alt="payrollSelect" />
//               </div>
//               <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
//                 Request Money
//               </div>
//             </div>
//           </div>
//         );
//     }
//   };
//
//   return <div className="">{renderForm()}</div>;
// };
//
// export default AddMoney;


import React, { useState } from 'react';
import backArrow from '../../../assets/images/Group-backArrow.png';
import { Link } from 'react-router-dom';
import payinaUserImg from '../../../assets/images/Layer_x0020_1.png';
import anotherPersonImg from '../../../assets/images/Group-AnotherPerson.png';
import RequestMoney from './requestMoney';
import AccountDetails from './AccountDetails';
import FundWallet from './fundWallet';

const AddOption = ({ iconSrc, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-3 md:space-x-4 bg-[#D9D9D9] border-[0.1px] border-[#006181] rounded-lg hover:border-yellow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 md:p-4 h-16 md:h-20">
    <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#D9D9D9] rounded-full border-4 md:border-6 lg:border-8 border-white flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-yellow"></div>
      <img src={iconSrc} alt={`${label} icon`} className="w-6 h-6 md:w-8 md:h-8" />
    </div>
    <span className="text-black font-medium text-sm md:text-base">{label}</span>
  </button>
);

const AddMoney = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const goBack = () => {
    setSelectedForm(null);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'accountDetails':
        return <AccountDetails goBack={goBack} />;
      case 'fundWallet':
        return <FundWallet goBack={goBack} />;
      case 'requestMoney':
        return <RequestMoney goBack={goBack} />;
      default:
        return (
          <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto w-full">
                <div className="flex justify-between items-center pt-8 md:pt-16 lg:pt-28">
                  <div>
                    <h1 className="text-xl md:text-3xl font-medium">Add Money</h1>
                  </div>
                  <Link to="/account/dashboard">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <img src={backArrow} alt="Back" className="w-6 h-6 md:w-8 md:h-8" />
                      <span className="text-sm md:text-base">Back</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
              <div className="max-w-md mx-auto w-full">
                <h2 className="text-md md:text-xl font-bold mb-6">How do you want to add money?</h2>

                <div className="space-y-3 md:space-y-4">
                  <AddOption
                    iconSrc={payinaUserImg}
                    label="Payina Account Details"
                    onClick={() => setSelectedForm('accountDetails')}
                  />

                  <AddOption
                    iconSrc={anotherPersonImg}
                    label="Fund With Card"
                    onClick={() => setSelectedForm('fundWallet')}
                  />

                  <AddOption
                    iconSrc={anotherPersonImg}
                    label="Request Money"
                    onClick={() => setSelectedForm('requestMoney')}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <>{renderForm()}</>;
};

export default AddMoney;