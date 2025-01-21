import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import apiService from '../../services/apiService';
import NoValidSelection from '../../utilities/NoValidSelection';
import OrderReview from '../OrderReview/OrderReview.jsx';

const ReviewOrder = () => {
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
      const amountInKobo = Math.round(selectedPlan.planPrice);

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

export default ReviewOrder;
