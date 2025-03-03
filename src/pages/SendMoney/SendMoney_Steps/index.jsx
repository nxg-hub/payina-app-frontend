// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
// import cancelImg from '../../../assets/images/CancelSendMoney.png';
// import { Link } from 'react-router-dom';
// import PayinaUser from './PayinaUser/index';
// import AnotherBank from './AnotherBank/index';
// import Beneficiaries from './BeneficiariesAccount/index';
// import payinaUserImg from '../../../assets/images/Layer_x0020_1.png';
// import anotherBankImg from '../../../assets/images/Group-AnotherBank.png';
// import beneficiaryImg from '../../../assets/images/Group-beneficiaries.png';
// import Stepper from '../stepper';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCoorperateCustomerDetails } from '../../../Redux/CoorperateCustomerSlice';
// import { hideLoading, showLoading } from '../../../Redux/loadingSlice';
//
// const SendMoneySteps = () => {
//   const [selectedForm, setSelectedForm] = useState(null);
//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 4;
//   //getting the customerId from the redux store
//   const userDetails = useSelector((state) => state.user.user);
//   const customerId = useSelector((state) => state.user.user.customerId);
//   const success = useSelector((state) => state.coporateCustomerProfile.success);
//   const loading = useSelector((state) => state.coporateCustomerProfile.loading);
//   const error = useSelector((state) => state.coporateCustomerProfile.error);
//   const dispatch = useDispatch();
//   const userType = userDetails.userType;
//   if (loading) {
//     dispatch(showLoading());
//   } else if (success) {
//     dispatch(hideLoading());
//   } else {
//     dispatch(hideLoading());
//   }
//   useEffect(() => {
//     if (success || userType !== 'CORPORATE') {
//       return; //do not dispatch the function once it is successful or if user is not a coporate user
//     }
//     dispatch(fetchCoorperateCustomerDetails(customerId));
//   }, []);
//   const resetFormSelection = () => {
//     setSelectedForm(null);
//     setCurrentStep(1);
//   };
//
//   const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
//   const handlePrev = () => {
//     if (currentStep === 1) {
//       resetFormSelection();
//     } else {
//       setCurrentStep((prev) => Math.max(prev - 1, 1));
//     }
//   };
//
//   const renderForm = () => {
//     switch (selectedForm) {
//       case 'payinaUser':
//         return (
//           <PayinaUser
//             currentStep={currentStep}
//             totalSteps={totalSteps}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             resetFormSelection={resetFormSelection}
//           />
//         );
//       case 'anotherBank':
//         return (
//           <AnotherBank
//             currentStep={currentStep}
//             totalSteps={totalSteps}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             resetFormSelection={resetFormSelection}
//           />
//         );
//       case 'beneficiaries':
//         return (
//           <Beneficiaries
//             currentStep={currentStep}
//             totalSteps={totalSteps}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             resetFormSelection={resetFormSelection}
//           />
//         );
//       default:
//         return (
//           <div className="flex flex-col justify-center items-start ml-[50px] xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
//             {
//               // loading ? (
//               //   <div className="absolute w-[5 top-[30%] left-[45%] md:left-[55%]">
//               //     <h2 className="font-bold text-center">loading...</h2>
//               //   </div>
//               // ) :
//               <>
//                 <div className="flex flex-row justify-between items-left gap-[5rem] lg:gap-[45rem]">
//                   <div className="text-xl md:text-3xl font-medium">Send Money</div>
//                   <Link to="/account/dashboard">
//                     <div className="cancelAction-img">
//                       <img src={cancelImg} alt="cancelAction"></img>
//                     </div>
//                   </Link>
//                 </div>
//                 <div className="item-center mt-5 mx-auto">
//                   <Stepper currentStep={selectedForm ? 1 : 0} numberOfSteps={totalSteps} />
//                 </div>
//                 <div className="text-md md:text-xl font-medium mt-5">Send To</div>
//                 <div
//                   onClick={() => setSelectedForm('payinaUser')}
//                   className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
//                   <div className="border border-yellow rounded-full p-3">
//                     <img src={payinaUserImg} alt="payrollSelect" />
//                   </div>
//                   <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
//                     Payina User
//                   </div>
//                 </div>
//                 <div
//                   onClick={() => setSelectedForm('anotherBank')}
//                   className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
//                   <div className="border border-yellow rounded-full p-3">
//                     <img src={anotherBankImg} alt="payrollSelect" />
//                   </div>
//                   <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
//                     Another Bank
//                   </div>
//                 </div>
//                 <div
//                   onClick={() => setSelectedForm('beneficiaries')}
//                   className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
//                   <div className="border border-yellow rounded-full p-3">
//                     <img src={beneficiaryImg} alt="payrollSelect" />
//                   </div>
//                   <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
//                     Beneficiaries
//                   </div>
//                 </div>
//               </>
//             }
//           </div>
//         );
//     }
//   };
//
//   return <div className="">{renderForm()}</div>;
// };
//
// export default SendMoneySteps;

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import cancelImg from '../../../assets/images/CancelSendMoney.png';
import { Link } from 'react-router-dom';
import PayinaUser from './PayinaUser/index';
import AnotherBank from './AnotherBank/index';
import Beneficiaries from './BeneficiariesAccount/index';
import payinaUserImg from '../../../assets/images/Layer_x0020_1.png';
import anotherBankImg from '../../../assets/images/Group-AnotherBank.png';
import beneficiaryImg from '../../../assets/images/Group-beneficiaries.png';
import Stepper from '../stepper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoorperateCustomerDetails } from '../../../Redux/CoorperateCustomerSlice';
import { hideLoading, showLoading } from '../../../Redux/loadingSlice';

const SendOption = ({ iconSrc, label, onClick }) => (
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

const SendMoneySteps = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  //getting the customerId from the redux store
  const userDetails = useSelector((state) => state.user.user);
  const customerId = useSelector((state) => state.user.user.customerId);
  const success = useSelector((state) => state.coporateCustomerProfile.success);
  const loading = useSelector((state) => state.coporateCustomerProfile.loading);
  const error = useSelector((state) => state.coporateCustomerProfile.error);
  const dispatch = useDispatch();
  const userType = userDetails.userType;

  if (loading) {
    dispatch(showLoading());
  } else if (success) {
    dispatch(hideLoading());
  } else {
    dispatch(hideLoading());
  }

  useEffect(() => {
    if (success || userType !== 'CORPORATE') {
      return; //do not dispatch the function once it is successful or if user is not a coporate user
    }
    dispatch(fetchCoorperateCustomerDetails(customerId));
  }, []);

  const resetFormSelection = () => {
    setSelectedForm(null);
    setCurrentStep(1);
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const handlePrev = () => {
    if (currentStep === 1) {
      resetFormSelection();
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'payinaUser':
        return (
          <PayinaUser
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handlePrev={handlePrev}
            resetFormSelection={resetFormSelection}
          />
        );
      case 'anotherBank':
        return (
          <AnotherBank
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handlePrev={handlePrev}
            resetFormSelection={resetFormSelection}
          />
        );
      case 'beneficiaries':
        return (
          <Beneficiaries
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleNext={handleNext}
            handlePrev={handlePrev}
            resetFormSelection={resetFormSelection}
          />
        );
      default:
        return (
          <div className="bg-white min-h-screen w-[90%] m-auto">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto w-[100%]">
                <div className="flex justify-between items-center pt-8 md:pt-16 lg:pt-28">
                  <div>
                    <h1 className="text-xl md:text-3xl font-medium">Send Money</h1>
                  </div>
                  <Link to="/account/dashboard">
                    <div className="bg-transparent hover:bg-gray-200 p-2 rounded-full transition duration-300">
                      <img src={cancelImg} alt="cancelAction" className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 mt-6">
              <div className="max-w-md mx-auto w-full">
                <Stepper currentStep={selectedForm ? 1 : 0} numberOfSteps={totalSteps} />
              </div>
            </div>

            <div className="container mx-auto px-4 mt-6">
              <div className="max-w-md mx-auto w-full">
                <h2 className="text-md md:text-xl font-medium mb-4">Send To</h2>

                <div className="space-y-3 md:space-y-4 mt-4">
                  <SendOption
                    iconSrc={payinaUserImg}
                    label="Payina User"
                    onClick={() => setSelectedForm('payinaUser')}
                  />

                  <SendOption
                    iconSrc={anotherBankImg}
                    label="Another Bank"
                    onClick={() => setSelectedForm('anotherBank')}
                  />

                  <SendOption
                    iconSrc={beneficiaryImg}
                    label="Beneficiaries"
                    onClick={() => setSelectedForm('beneficiaries')}
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

export default SendMoneySteps;
