// // eslint-disable-next-line no-unused-vars
// import React, { useCallback, useState } from 'react';
// import Navbar from '../../components/navbar/navbar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import Footer from '../../components/footer/footer';
// import EmailVerification from '../../components/EmailVerification';
// import { useForm } from '../../context/formContext';
// import { useNavigate } from 'react-router-dom';
// import { useDataPlans } from '../../hooks/useDataPlans';
// import NetworkSelection from '../../components/NetworkSelection';
//
// const Airtime = () => {
//   // const [isRegistered, setIsRegistered] = useState(null);
//   const { formValues, updateFormValues } = useForm();
//   const navigate = useNavigate();
//   const [isRegistered, setIsRegistered] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [localEmail, setLocalEmail] = useState('');
//   const { plans, selectedPlan, setSelectedPlan, isLoading, error } = useDataPlans(
//     formValues.selectedNetwork
//   );
//
//   let handleUserVerified = useCallback((registered, email) => {
//     setIsRegistered(registered);
//     if (registered) {
//       navigate(formValues.userType) === 'PERSONAL' ? '/login' : '/login';
//     }
//   });
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
//           planName: selectedPlan.name,
//           planPrice: selectedPlan.amount,
//           planData: selectedPlan.slug
//         }
//         : null
//     };
//
//     navigate('/review-airtime-order', { state: stateToPass });
//   };
//
//   return (
//     <section className="text-primary w-full h-screen">
//       <Navbar className="pt-6" />
//       <div className=" container">
//         <div
//           className="w-[80%] h-1 border-none mr-auto ml-auto
//             mt-[-2px] mb-40 bg-yellow"></div>
//         <p className=" mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
//           Buy Airtime & get Cashback
//         </p>
//         <form>
//           <button
//             className="text-primary text-left p-10 border-none rounded-[5px]
//              w-[64%] bg-neutral px-4 py-2">
//             Want to enjoy discounts?
//             <span className="text-yellow"> Register</span> or{' '}
//             <span className=" text-yellow">Login</span>{' '}
//           </button>
//           <div className="flex flex-col w-[64%] ">
//             <label className="py-4">Email</label>
//             <EmailVerification
//               onUserVerified={handleUserVerified}
//               type="email"
//               placeholder="Enter Email address"
//               className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
//             />
//           </div>
//           {isRegistered === false && (
//             <>
//               <NetworkSelection
//                 selectedNetwork={formValues.selectedNetwork}
//                 onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
//                 error={errors.selectedNetwork}
//               />
//               {/*<div className="flex flex-col w-[64%] ">*/}
//               {/*  <label className="py-4">Network</label>*/}
//               {/*  <div className=" cursor-pointer ">*/}
//               {/*    <FontAwesomeIcon*/}
//               {/*      icon={faChevronDown}*/}
//               {/*      color="teal"*/}
//               {/*      className=" absolute */}
//               {/*             pl-[56%] min-w-1 py-4"*/}
//               {/*    />*/}
//               {/*    <input*/}
//               {/*      type="text"*/}
//               {/*      placeholder="Choose Network "*/}
//               {/*      className="border-2 rounded-[5px]  px-5 py-2 border-primary*/}
//               {/*         bg-black text-slate-600 w-full"*/}
//               {/*    />*/}
//               {/*  </div>*/}
//               {/*</div>*/}
//               <div className="flex flex-col w-[64%] ">
//                 <label className="py-4">Phone</label>
//                 <input
//                   type="number"
//                   placeholder="Enter Phone number"
//                   className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
//                 />
//               </div>
//               <div className="flex flex-col w-[64%] ">
//                 <label className="py-4">Amount</label>
//                 <input
//                   type="number"
//                   placeholder="Enter amount"
//                   className="border-2  mb-8 rounded-[5px] px-5 py-2
//                         border-primary bg-black text-slate-600"
//                 />
//               </div>
//             </>
//           )}
//           <button
//             className="text-primary mb-10 text-left px-16 py-4
//                     border-none rounded-[5px] bg-lightBlue cursor-pointer
//                      hover:bg-neutral transition-all duration-200 ">
//             Proceed
//           </button>
//         </form>
//       </div>
//       <div className="pt[-10]">
//         <Footer />
//       </div>
//     </section>
//   );
// };
//
// export default Airtime;

import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import EmailVerification from '../../components/EmailVerification';
import { useForm } from '../../context/formContext';
import { useDataPlans } from '../../hooks/useDataPlans';
import NetworkSelection from '../../components/NetworkSelection';

const Airtime = () => {
  const { formValues, updateFormValues } = useForm();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(null);
  const [errors, setErrors] = useState({});
  const [localEmail, setLocalEmail] = useState('');
  const [amount, setAmount] = useState('');
  const { selectedPlan, setSelectedPlan } = useDataPlans(formValues.selectedNetwork);

  const handleUserVerified = useCallback(
    (registered, email) => {
      setIsRegistered(registered);
      if (registered) {
        navigate(formValues.userType === 'PERSONAL' ? '/login' : '/login');
      }
    },
    [navigate, formValues.userType]
  );

  const handleEmailChange = useCallback((e) => {
    const email = e.target.value;
    setLocalEmail(email);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!localEmail) newErrors.email = 'Email is required';
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
    if (!amount) newErrors.amount = 'Amount is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedFormValues = {
      ...formValues,
      email: localEmail,
      amount: amount
    };

    updateFormValues(updatedFormValues);

    const stateToPass = {
      formValues: updatedFormValues,
      selectedPlan: {
        planName: 'Airtime',
        planPrice: amount,
        planData: `${formValues.selectedNetwork} Airtime`
      }
    };

    navigate('/planb', { state: stateToPass });
  };

  return (
    <section className="text-primary w-full h-screen">
      <Navbar className="pt-6" />
      <div className="container">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
        <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
          Buy Airtime & get Cashback
        </p>
        <form onSubmit={handleSubmit}>
          <button className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
            Want to enjoy discounts?
            <span className="text-yellow"> Register</span> or{' '}
            <span className="text-yellow">Login</span>
          </button>
          <div className="flex flex-col w-[64%]">
            <label className="py-4">Email</label>
            <EmailVerification
              onUserVerified={handleUserVerified}
              type="email"
              placeholder="Enter Email address"
              className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
              value={localEmail}
              onChange={handleEmailChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          {isRegistered === false && (
            <>
              <NetworkSelection
                selectedNetwork={formValues.selectedNetwork}
                onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
                error={errors.selectedNetwork}
              />
              <div className="flex flex-col w-[64%]">
                <label className="py-4">Phone</label>
                <input
                  type="number"
                  placeholder="Enter Phone number"
                  className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                  value={formValues.phoneNumber}
                  onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
                />
                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
              </div>
              <div className="flex flex-col w-[64%]">
                <label className="py-4">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="border-2 mb-8 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {errors.amount && <p className="text-red-500">{errors.amount}</p>}
              </div>
            </>
          )}
          <button
            type="submit"
            className="text-primary mb-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200">
            Proceed
          </button>
        </form>
      </div>
      <div className="pt[-10]">
        <Footer />
      </div>
    </section>
  );
};

export default Airtime;
