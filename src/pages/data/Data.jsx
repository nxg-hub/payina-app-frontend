import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import InputStyle from '../../utilities/InputStyle';
import DataPlansSelection from '../../components/DataPlansSelection';
import { useForm } from '../../context/formContext';
import EmailVerification from '../../components/EmailVerification';
import { useDataPlans } from '../../hooks/useDataPlans';
import NetworkSelectionNonPayinaUsers from '../../components/NetworkSelectionNonPayinaUsers.jsx';

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

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleEmailChange = useCallback((e) => {
    const email = e.target.value;
    setLocalEmail(email);
  }, []);

  const phone = formValues.phoneNumber;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormValues({ email: localEmail });

    const newErrors = {};
    if (!localEmail) newErrors.email = 'Email is required';
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (phone.length < 11) newErrors.phoneNumber = 'Phone number is incorrect';
    if (phone.length > 11) newErrors.phoneNumber = 'Phone number is over 11  digits';
    if (!formValues.selectedNetwork) newErrors.selectedNetwork = 'Network selection is required';
    if (!selectedPlan) newErrors.selectedPlan = 'Plan selection is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const stateToPass = {
      formValues: {
        ...formValues,
        amount: selectedPlan.amount,
        email: localEmail,
        phoneNumber: formValues.phoneNumber,
        selectedNetwork: formValues.selectedNetwork,
      },
      selectedPlan: {
        id: selectedPlan.id,
        planName: selectedPlan.name,
        planPrice: selectedPlan.amount,
        planSlug: selectedPlan.slug,
      },
    };
    navigate('/plans/review', { state: stateToPass });
  };
  const handlePlanSelection = useCallback(
    (plan) => {
      setSelectedPlan(plan);
      updateFormValues({ amount: plan.amount });
    },
    [setSelectedPlan, updateFormValues]
  );

  return (
    <section className="bg-black">
      <Navbar />

      <div className="container bg-black">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
        <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
          Buy Data & get Cashback
        </p>

        <div className="container mx-auto p-4">
          <form onSubmit={handleSubmit} className="text-white">
            <button className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
              Want to enjoy discounts?
              <Link className="px-2" to="/onboarding/email_verification">
                <span className="text-yellow">Register</span>
              </Link>
              or
              <Link className="px-2" to="/login">
                <span className="text-yellow">Login</span>
              </Link>
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
                <NetworkSelectionNonPayinaUsers
                  selectedNetwork={formValues.selectedNetwork}
                  onNetworkChange={(network) => updateFormValues({ selectedNetwork: network })}
                  error={errors.selectedNetwork}
                />
                {formValues.selectedNetwork && (
                  <DataPlansSelection
                    networkSlug={formValues.selectedNetwork}
                    selectedPlan={selectedPlan}
                    plans={plans}
                    onPlanChange={(plan) => {
                      setSelectedPlan(plan);
                      clearError('selectedPlan');
                    }}
                    error={errors.selectedPlan}
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
