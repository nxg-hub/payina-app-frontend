// // // import React, { useEffect } from 'react';
// // // import Navbar from '../../components/navbar/navbar';
// // // import Footer from '../../components/footer/footer';
// // // import { useLocation, useNavigate } from 'react-router-dom';
// // // import { useForm } from '../../context/formContext';
// // //
// // // const PlanB = () => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const { formValues, selectedPlan, updateSelectedPlan } = useForm();
// // //
// // //   useEffect(() => {
// // //     const planFromLocation = location.state?.selectedPlan;
// // //     if (planFromLocation) {
// // //       updateSelectedPlan(planFromLocation);
// // //     }
// // //   }, [location.state, updateSelectedPlan]);
// // //
// // //   if (!selectedPlan) {
// // //     return <p>No plan selected. Please go back and select a plan.</p>;
// // //   }
// // //
// // //   const { name: product, amount } = selectedPlan;
// // //   const network = product.split(' ')[0] || 'Unknown Network';
// // //   const phoneNumber = formValues.phoneNumber || '';
// // //
// // //   const handleProceed = () => {
// // //     if (selectedPlan) {
// // //       navigate('/renew');
// // //     } else {
// // //       alert('No plan selected.');
// // //     }
// // //   };
// // //   return (
// // //     <section className="text-primary">
// // //       <Navbar />
// // //       <div className="container">
// // //         <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-8 bg-yellow"></div>
// // //         <button className="text-primary mt-[25] text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
// // //           Review your Order
// // //         </button>
// // //         <div className="flex px-5 gap-4">
// // //           <p className="pt-8 pr-5 text-sm">Product</p>
// // //           <div className="w-[42%] mt-24 h-1 ml-5 border-none bg-yellow"></div>
// // //           <p className="pt-8 pl-5 text-sm">{product}</p>
// // //         </div>
// // //         <div className="flex px-5 gap-4">
// // //           <p className="pt-8 pr-5 text-sm">Network</p>
// // //           <div className="w-[42%] mt-24 ml-5 h-1 border-none bg-yellow"></div>
// // //           <p className="pt-8 pl-5 text-sm">{network}</p>
// // //         </div>
// // //         <div className="flex gap-4">
// // //           <p className="pt-8 pl-5 text-sm">Phone number</p>
// // //           <div className="w-[40%] mt-24 h-1 border-none bg-yellow"></div>
// // //           <p className="pt-8 text-sm">{phoneNumber}</p>
// // //         </div>
// // //         <div className="flex justify-start gap-4">
// // //           <p className="pt-8 pl-5 text-sm">Amount</p>
// // //           <div className="w-[40%] mt-24 h-[1] border-none bg-yellow"></div>
// // //           <p className="pt-14 text-sm">{amount}</p>
// // //         </div>
// // //         <button
// // //           onClick={handleProceed}
// // //           className="text-primary mb-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
// // //         >
// // //           Proceed
// // //         </button>
// // //       </div>
// // //       <div className="mt-10">
// // //         <Footer />
// // //       </div>
// // //     </section>
// // //   );
// // // };
// // //
// // // export default PlanB;


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import apiService from '../../services/apiService';
import NoValidSelection from '../../utilities/NoValidSelection';
import OrderReview from '../OrderReview/OrderReview.jsx';

const PlanB = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
  }, [location.state]);

  if (!formData) {
    return (
      <section className="text-primary">
        <Navbar />
        <NoValidSelection />
        <Footer />
      </section>
    );
  }

  const { formValues, selectedPlan } = formData;
  const { planName, planPrice } = selectedPlan || {};
  const network = formValues?.selectedNetwork || 'Unknown Network';
  const phoneNumber = formValues?.phoneNumber || '';
  const email = formValues?.email || '';

  const handleProceed = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const amountInKobo = Math.round(selectedPlan.planPrice * 100);

      const initializePaymentResponse = await apiService.initializePayment(
        selectedPlan.id,
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
      <Navbar />
      <OrderReview
        planName={planName}
        network={network}
        phoneNumber={phoneNumber}
        planPrice={planPrice}
        email={email}
      />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        className="text-primary mt-[25] text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
        onClick={handleProceed}
        disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
      </button>
      <Footer />
    </section>
  );
};

export default PlanB;
