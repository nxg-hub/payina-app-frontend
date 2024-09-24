// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
//
// const Befour = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { selectedBiller, amount, customerReference } = location.state || {};
//
//   const handleProceed = () => {
//     // Handle the proceed action, e.g., navigate to the next page or submit the order
//     navigate('/thanks');
//   };
//
//   return (
//     <section className="text-primary">
//       <Navbar className="pt-6" />
//       <div className="container">
//         <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-8 bg-yellow"></div>
//         <button className="text-primary mt-[25] text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
//           Review your Order
//         </button>
//         <div className="flex px-5 gap-4">
//           <p className="pt-8 pr-5 text-sm">Product</p>
//           <div className="w-[42%] mt-24 h-1 ml-5 border-none bg-yellow"></div>
//           <p className="pt-8 text-sm">Bet</p>
//         </div>
//         <div className="flex px-5 gap-4">
//           <p className="pt-8 pr-5 text-sm">Platform</p>
//           <div className="w-[42%] mt-24 ml-5 h-1 border-none bg-yellow"></div>
//           <p className="pt-8 text-sm">{selectedBiller?.name || 'N/A'}</p>
//         </div>
//         <div className="flex gap-4">
//           <p className="pt-8 pl-5 pr-5 text-sm">Custom Ref</p>
//           <div className="w-[41%] mt-24 h-1 border-none pl-32 bg-yellow"></div>
//           <p className="pt-8 text-sm">{customerReference || 'N/A'}</p>
//         </div>
//         <div className="flex justify-start gap-4">
//           <p className="pt-8 pl-5 text-sm">Amount</p>
//           <div className="w-[40%] mt-24 h-[1] border-none bg-yellow"></div>
//           <p className="pt-8 pl-14 text-sm">{amount || 'N/A'}</p>
//         </div>
//         <div>
//           <button
//             onClick={handleProceed}
//             className="text-primary mb-10 mt-3 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
//           >
//             Proceed
//           </button>
//         </div>
//       </div>
//       <div className="mt-10">
//         <Footer />
//       </div>
//     </section>
//   );
// };
//
// export default Befour;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import apiService from '../../services/apiService';

const Befour = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { selectedBiller, amount, customerReference, email } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedBiller, amount, customerReference, email } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleProceed = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //
  //   try {
  //     const planId = selectedBiller?.id;
  //
  //     if (!planId || !email || !amount) {
  //       throw new Error('Missing required information for payment');
  //     }
  //
  //
  //     // Initialize payment
  //     const initializeResponse = await apiService.initializePayment(planId, email, amount);
  //     console.log('Payment initialized:', initializeResponse);
  //
  //     if (initializeResponse.status === 'success') {
  //       // Vend value
  //       const vendResponse = await apiService.vendValue(initializeResponse.data.paymentReference);
  //       console.log('Value vended:', vendResponse);
  //
  //       if (vendResponse.status === 'success') {
  //         navigate('/thanks', { state: { transactionDetails: vendResponse.data } });
  //       } else {
  //         setError('Value vending failed. Please try again.');
  //       }
  //     } else {
  //       setError('Payment initialization failed. Please try again.');
  //     }
  //   } catch (err) {
  //     console.error('Error during payment process:', err);
  //     setError(err.message || 'An error occurred during the payment process. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleProceed = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const planId = selectedBiller?.id;

      if (!planId || !email || !amount) {
        throw new Error('Missing required information for payment');
      }

      // try {
      const amountInKobo = Math.round(amount * 100);

      const initializePaymentResponse = await apiService.initializePayment(
        planId,
        email,
        amountInKobo
      );

      if (
        initializePaymentResponse.status === true &&
        initializePaymentResponse.message === 'Authorization URL created'
      ) {
        const authorizationUrl = initializePaymentResponse.data.authorization_url;
        const paymentReference = initializePaymentResponse.data.reference;

        window.open(authorizationUrl, '_blank');

        const vendValueResponse = await apiService.vendValue(paymentReference);

        if (vendValueResponse.status === true) {
          navigate('/transaction-success', { state: { message: vendValueResponse.message } });
        } else {
          throw new Error(vendValueResponse.message || 'Vend value API call failed');
        }
      } else {
        throw new Error(initializePaymentResponse.message || 'Payment initialization failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="text-primary">
      <Navbar className="pt-6" />
      <div className="container">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-8 bg-yellow"></div>
        <button className="text-primary mt-[25] text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
          Review your Order
        </button>
        <div className="flex px-5 gap-4">
          <p className="pt-8 pr-5 text-sm">Product</p>
          <div className="w-[42%] mt-24 h-1 ml-5 border-none bg-yellow"></div>
          <p className="pt-8 text-sm">Bet</p>
        </div>
        <div className="flex px-5 gap-4">
          <p className="pt-8 pr-5 text-sm">Platform</p>
          <div className="w-[42%] mt-24 ml-5 h-1 border-none bg-yellow"></div>
          <p className="pt-8 text-sm">{selectedBiller?.name || 'N/A'}</p>
        </div>
        <div className="flex gap-4">
          <p className="pt-8 pl-5 pr-5 text-sm">Custom Ref</p>
          <div className="w-[41%] mt-24 h-1 border-none pl-32 bg-yellow"></div>
          <p className="pt-8 text-sm">{customerReference || 'N/A'}</p>
        </div>
        <div className="flex justify-start gap-4">
          <p className="pt-8 pl-5 text-sm">Amount</p>
          <div className="w-[40%] mt-24 h-[1] border-none bg-yellow"></div>
          <p className="pt-8 pl-14 text-sm">{amount || 'N/A'}</p>
        </div>
        <div className="flex justify-start gap-4">
          <p className="pt-8 pl-5 text-sm">Email</p>
          <div className="w-[40%] mt-24 h-[1] border-none bg-yellow"></div>
          <p className="pt-8 pl-14 text-sm">{email || 'N/A'}</p>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div>
          <button
            onClick={handleProceed}
            disabled={isLoading || !email || !amount || !selectedBiller}
            className={`text-primary mb-10 mt-3 text-left px-16 py-4 border-none rounded-[5px] ${
              isLoading || !email || !amount || !selectedBiller
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-lightBlue cursor-pointer hover:bg-neutral'
            } transition-all duration-200`}>
            {isLoading ? 'Processing...' : 'Proceed'}
          </button>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </section>
  );
};

export default Befour;
