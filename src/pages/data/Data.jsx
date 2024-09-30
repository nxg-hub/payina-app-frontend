// // import React, { useEffect, useState } from 'react';
// // import Navbar from '../../components/navbar/navbar';
// // import Footer from '../../components/footer/footer';
// // import InputStyle from '../../utilities/InputStyle';
// // import Modal from '../../utilities/Modal';
// // import { formValidation } from '../../utilities/formValidation';
// // import { useNavigate } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// // import useAxios from '../../hooks/useAxios';
// // import { useForm } from '../../context/formContext';
// //
// // const DataPurchaseForm = () => {
// //   const { formValues, updateFormValues } = useForm();
// //   const navigate = useNavigate();
// //   const [network, setNetwork] = useState([]);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [isRegistered, setIsRegistered] = useState(null);
// //   const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', message: '' });
// //
// //   // Correctly initialize the form validation state
// //   const [isFormValid, setIsFormValid] = useState(false);
// //   const [isLoadingNetwork, setIsLoadingNetwork] = useState(false);
// //   const [isEmailChecking, setIsEmailChecking] = useState(false);
// //   const [showValidateButton, setShowValidateButton] = useState(false);
// //
// //   const { fetchData } = useAxios();
// //
// //   const handleNavigateToPlans = () => {
// //     if (formValues.selectedNetwork) {
// //       navigate(`/plans?network=${formValues.selectedNetwork.replace(' ', '_')}`);
// //     } else {
// //       navigate('/plans?network=MTN_NIGERIA'); // Default to MTN if no network is selected
// //     }
// //   };
// //
// //   const handleNetworkSelect = (slug) => {
// //     updateFormValues({ selectedNetwork: slug });
// //     setErrors((prevErrors) => ({ ...prevErrors, selectedNetwork: '' }));
// //     setShowDropdown(false);
// //   };
// //
// //   const handleNetworkChange = async () => {
// //     setIsLoadingNetwork(true);
// //     try {
// //       const response = await fetch(
// //         `https://payina-wallet-service-api.onrender.com/api/v1/vas/biller-enquiry-slug/AIRTIME_AND_DATA`
// //       );
// //       if (!response.ok) throw new Error('Network Error');
// //
// //       const data = await response.json();
// //       if (data.responseData && Array.isArray(data.responseData)) {
// //         const names = data.responseData.map((item) => item.name);
// //         setNetwork(names);
// //       } else {
// //         setNetwork([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching network:', error);
// //     } finally {
// //       setIsLoadingNetwork(false);
// //     }
// //   };
// //
// //   // const fetchPost = () => {
// //   //   const formattedUrl = formValues.selectedNetwork.replace(' ', '_');
// //   //   fetchData({
// //   //     method: 'GET',
// //   //     url: `/package-enquiry-slug/${formattedUrl}`,
// //   //     headers: {
// //   //       'Cache-Control': 'no-cache',
// //   //       Pragma: 'no-cache'
// //   //     }
// //   //   });
// //   // };
// //
// //   const handleInputClick = () => {
// //     setShowDropdown(!showDropdown);
// //     if (!network.length && !isLoadingNetwork) {
// //       handleNetworkChange();
// //     }
// //   };
// //
// //   const checkEmailRegistration = async () => {
// //     setShowValidateButton(false);
// //     setIsEmailChecking(true);
// //     try {
// //       const encodedEmail = encodeURIComponent(formValues.email);
// //       const response = await fetch(
// //         `https://payina-be-6f08cdfb4414.herokuapp.com/api/bill-customers/check-if-email-exist-in-db?email=${encodedEmail}`
// //       );
// //
// //       if (!response.ok) throw new Error('Network response was not ok');
// //
// //       const data = await response.json();
// //       sessionStorage.setItem('emailCheckResponse', JSON.stringify(data));
// //
// //       if (data.exists) {
// //         setIsRegistered(true);
// //         setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
// //         navigate(data.userType === 'PERSONAL' ? '/PERSONAL_LOGIN' : '/CORPORATE_LOGIN');
// //       } else {
// //         setIsRegistered(false);
// //         setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
// //       }
// //     } catch (error) {
// //       console.error('Error checking email registration:', error);
// //       setIsRegistered(null);
// //     } finally {
// //       setIsEmailChecking(false);
// //     }
// //   };
// //
// //   const validateEmail = (email) => {
// //     const errors = {};
// //     if (!email) {
// //       errors.email = 'Email is required';
// //     } else if (!/\S+@\S+\.\S+/.test(email)) {
// //       errors.email = 'Email address is invalid';
// //     }
// //     return errors;
// //   };
// //
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     updateFormValues({ [name]: value });
// //
// //     if (name === 'email') {
// //       setShowValidateButton(true);
// //       setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
// //     }
// //     if (name === 'phoneNumber') {
// //       setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
// //     }
// //     if (name === 'amount') {
// //       setErrors((prevErrors) => ({ ...prevErrors, amount: '' }));
// //     }
// //
// //     // Check if the form is valid
// //     const isFormFilled =
// //       formValues.email && formValues.phoneNumber && formValues.amount && formValues.selectedNetwork;
// //     setIsFormValid(isFormFilled); // Set form validity
// //   };
// //
// //   useEffect(() => {
// //     const validationErrors = validateEmail(formValues.email);
// //     setErrors(validationErrors);
// //   }, [formValues.email]);
// //
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (isRegistered === null) {
// //       setErrors({ email: 'Please check your email first.' });
// //       return;
// //     }
// //
// //     const validationErrors = formValidation(formValues);
// //     if (Object.keys(validationErrors).length) {
// //       setErrors(validationErrors);
// //       return;
// //     }
// //
// //     setModalInfo({ isOpen: true, title: 'Success', message: 'Data purchase successful!' });
// //   };
// //
// //   return (
// //     <section>
// //       <Navbar />
// //       <div className="container">
// //         <form onSubmit={handleSubmit} className="text-white">
// //           <InputStyle
// //             label="Email"
// //             type="email"
// //             name="email"
// //             value={formValues.email}
// //             onChange={handleChange}
// //             placeholder="Enter Email address"
// //             error={errors.email}
// //             onBlur={checkEmailRegistration}
// //           />
// //           {showValidateButton && !isEmailChecking && (
// //             <button
// //               type="button"
// //               onClick={checkEmailRegistration}
// //               className="mb-4 px-4 py-2 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200">
// //               Validate User Type
// //             </button>
// //           )}
// //           {isEmailChecking && <p>Checking email...</p>}
// //
// //           {isRegistered === false && (
// //             <>
// //               <div className="flex flex-col w-[100%]" onClick={handleInputClick}>
// //                 <label className="py-4">Network</label>
// //                 <div className="cursor-pointer">
// //                   <FontAwesomeIcon
// //                     icon={faChevronDown}
// //                     color="teal"
// //                     className="absolute pl-[75%] md:pl-[56%] min-w-1 py-4"
// //                   />
// //                   <InputStyle
// //                     type="text"
// //                     placeholder="Choose Network"
// //                     className="border-2 border-slate-400 rounded-[5px] px-5 py-2 bg-black text-slate-600 w-full"
// //                     value={formValues.selectedNetwork}
// //                     onClick={handleInputClick}
// //                     readOnly
// //                   />
// //                   {errors.selectedNetwork && (
// //                     <p className="error-message text-red-500">{errors.selectedNetwork}</p>
// //                   )}
// //                 </div>
// //               </div>
// //
// //               {isLoadingNetwork && <p>Loading networks...</p>}
// //               {showDropdown && (
// //                 <div className="ml-96 bg-white text-black dropdown-menu">
// //                   {network.map((name, index) => (
// //                     <p key={index} onClick={() => handleNetworkSelect(name)}>
// //                       {name}
// //                     </p>
// //                   ))}
// //                 </div>
// //               )}
// //
// //               <InputStyle
// //                 label="Phone"
// //                 type="text"
// //                 name="phoneNumber"
// //                 placeholder="Enter the Phone number you would like to subscribe"
// //                 error={errors.phoneNumber}
// //                 value={formValues.phoneNumber}
// //                 onChange={handleChange}
// //               />
// //               <InputStyle
// //                 label="Amount"
// //                 type="number"
// //                 name="amount"
// //                 value={formValues.amount}
// //                 onChange={handleChange}
// //                 placeholder="Enter amount"
// //                 error={errors.amount}
// //               />
// //             </>
// //           )}
// //
// //           <button
// //             onClick={handleNavigateToPlans}
// //             type="submit"
// //             className="text-primary mb-10 mt-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200">
// //             Proceed
// //           </button>
// //         </form>
// //
// //         {modalInfo.isOpen && (
// //           <Modal
// //             isOpen={modalInfo.isOpen}
// //             onClose={() => setModalInfo({ isOpen: false, title: '', message: '' })}
// //             title={modalInfo.title}
// //             message={modalInfo.message}
// //           />
// //         )}
// //       </div>
// //       <Footer />
// //     </section>
// //   );
// // };
// //
// // export default DataPurchaseForm;
//

// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
// import InputStyle from '../../utilities/InputStyle';
// import NetworkSelection from '../../components/NetworkSelection';
// import DataPlansSelection from '../../components/DataPlansSelection';
// import { useForm } from '../../context/formContext';
// import { EmailVerification } from '../../components/EmailVerification';
// import { useDataPlans } from '../../hooks/useDataPlans';
//
// export const DataPurchaseForm = () => {
//   const { formValues, updateFormValues } = useForm();
//   const navigate = useNavigate();
//   const [isRegistered, setIsRegistered] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [localEmail, setLocalEmail] = useState('');
//   const { plans, selectedPlan, setSelectedPlan, isLoading, error } = useDataPlans(
//     formValues.selectedNetwork
//   );
//
//   useEffect(() => {}, [localEmail, selectedPlan]);
//
//   const handleUserVerified = useCallback(
//     (registered, email) => {
//       setIsRegistered(registered);
//       if (registered) {
//         navigate(formValues.userType === 'PERSONAL' ? '/login' : '/login');
//       }
//       updateFormValues({ email });
//     },
//     [formValues.userType, navigate, updateFormValues]
//   );
//
//   const handleEmailChange = useCallback((e) => {
//     const email = e.target.value;
//     setLocalEmail(email);
//   }, []);
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateFormValues({ email: localEmail });
//
//     const newErrors = {};
//     if (!localEmail) newErrors.email = 'Email is required';
//     if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
//     if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
//     if (!selectedPlan) newErrors.selectedPlan = 'Plan selection is required';
//
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//
//     const stateToPass = {
//       formValues: { ...formValues, email: localEmail },
//       selectedPlan: selectedPlan
//         ? {
//             planName: selectedPlan.name,
//             planPrice: selectedPlan.amount,
//             planData: selectedPlan.slug
//           }
//         : null
//     };
//
//     navigate('/planb', { state: stateToPass });
//   };
//
//   const handlePlanSelection = useCallback(
//     (plan) => {
//       setSelectedPlan(plan);
//       updateFormValues({ amount: plan.amount });
//     },
//     [setSelectedPlan, updateFormValues]
//   );
//
//   return (
//     <section>
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <form onSubmit={handleSubmit} className="text-white">
//           <EmailVerification
//             onUserVerified={handleUserVerified}
//             value={localEmail}
//             onChange={handleEmailChange}
//             error={errors.email}
//           />
//           {isRegistered === false && (
//             <>
//               <InputStyle
//                 label="Phone"
//                 type="text"
//                 name="phoneNumber"
//                 placeholder="Enter your Phone number"
//                 error={errors.phoneNumber}
//                 value={formValues.phoneNumber}
//                 onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
//               />
//               <NetworkSelection
//                 selectedNetwork={formValues.selectedNetwork}
//                 onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
//                 error={errors.selectedNetwork}
//               />
//               {formValues.selectedNetwork && (
//                 <DataPlansSelection
//                   networkSlug={formValues.selectedNetwork}
//                   selectedPlan={selectedPlan}
//                   onPlanChange={handlePlanSelection}
//                   error={errors.selectedPlan}
//                   plans={plans}
//                 />
//               )}
//             </>
//           )}
//           <button
//             type="submit"
//             className="text-primary mb-10 mt-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200">
//             Proceed
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </section>
//   );
// };
//
// export default DataPurchaseForm;



import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import InputStyle from '../../utilities/InputStyle';
import NetworkSelection from '../../components/NetworkSelection';
import DataPlansSelection from '../../components/DataPlansSelection';
import { useForm } from '../../context/formContext';
import { EmailVerification } from '../../components/EmailVerification';
import { useDataPlans } from '../../hooks/useDataPlans';

export const DataPurchaseForm = () => {
  const { formValues, updateFormValues } = useForm();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(null);
  const [errors, setErrors] = useState({});
  const [localEmail, setLocalEmail] = useState('');
  const { plans, selectedPlan, setSelectedPlan, isLoading, error } = useDataPlans(
    formValues.selectedNetwork
  );

  useEffect(() => {}, [localEmail, selectedPlan]);

  const handleUserVerified = useCallback(
    (registered, email) => {
      setIsRegistered(registered);
      if (registered) {
        navigate(formValues.userType === 'PERSONAL' ? '/login' : '/login');
      }
      updateFormValues({ email });
    },
    [formValues.userType, navigate, updateFormValues]
  );

  const handleEmailChange = useCallback((e) => {
    const email = e.target.value;
    setLocalEmail(email);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormValues({ email: localEmail });

    const newErrors = {};
    if (!localEmail) newErrors.email = 'Email is required';
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
    if (!selectedPlan) newErrors.selectedPlan = 'Plan selection is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const stateToPass = {
      formValues: {
        ...formValues,
        email: localEmail,
        phoneNumber: formValues.phoneNumber,
        selectedNetwork: formValues.selectedNetwork
      },
      selectedPlan: {
        id: selectedPlan.id,
        planName: selectedPlan.name,
        planPrice: selectedPlan.amount,
        planSlug: selectedPlan.slug
      }
    };

    navigate('/planb', { state: stateToPass });
  };

  const handlePlanSelection = useCallback(
    (plan) => {
      setSelectedPlan(plan);
      updateFormValues({ amount: plan.amount });
    },
    [setSelectedPlan, updateFormValues]
  );

  return (
    <section>
      <Navbar />

      <div className="container">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
        <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
          Buy Data & get Cashback
        </p>
        {/*<form onSubmit={handleSubmit}>*/}



            <div className="container mx-auto p-4">
              <form onSubmit={handleSubmit} className="text-white">
                <button className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
                  Want to enjoy discounts?
                  <span className="text-yellow"> Register</span> or{' '}
                  <span className="text-yellow">Login</span>
                </button>
                <div className="flex flex-col">
                  <label className="py-4">Email</label>
                <EmailVerification
                  onUserVerified={handleUserVerified}
                  value={localEmail}
                  onChange={handleEmailChange}
                  error={errors.email}
                />
                </div>
                {isRegistered === false && (
                  <>
                    <InputStyle
                      label="Phone"
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter your Phone number"
                      error={errors.phoneNumber}
                      value={formValues.phoneNumber}
                      onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
                    />
                    <NetworkSelection
                      selectedNetwork={formValues.selectedNetwork}
                      onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
                      error={errors.selectedNetwork}
                    />
                    {formValues.selectedNetwork && (
                      <DataPlansSelection
                        networkSlug={formValues.selectedNetwork}
                        selectedPlan={selectedPlan}
                        onPlanChange={handlePlanSelection}
                        error={errors.selectedPlan}
                        plans={plans}
                      />
                    )}
                  </>
                )}
                <button
                  type="submit"
                  className="text-primary mb-10 mt-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200">
                  Proceed to Payment
                </button>
              </form>
            </div>
      </div>
      <Footer />
    </section>
  );
};

export default DataPurchaseForm;