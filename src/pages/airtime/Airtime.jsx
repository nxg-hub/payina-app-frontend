import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import EmailVerification from '../../components/EmailVerification';
import { useForm } from '../../context/formContext';
import { useDataPlans } from '../../hooks/useDataPlans';
import NetworkSelection from '../../components/NetworkSelectionNonPayinaUsers';
import DataPlansSelection from '../../components/DataPlansSelection';

const Airtime = () => {
  const { formValues, updateFormValues } = useForm();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(null);
  const [errors, setErrors] = useState({});
  const [localEmail, setLocalEmail] = useState('');
  const [amount, setAmount] = useState('');

  const { plans, selectedPlan, setSelectedPlan, isLoading, error } = useDataPlans(
    formValues.selectedNetwork
  );
  const filteredPlans = plans.length > 0 ? [plans[0]] : [];

  useEffect(() => {
    if (filteredPlans.length > 0 && !selectedPlan) {
      setSelectedPlan(filteredPlans[0]); // Set the first plan as the selected plan
    }
  }, [filteredPlans, selectedPlan, setSelectedPlan]);

  useEffect(() => {
    if (selectedPlan) {
      updateFormValues({ selectedNetworkSlug: selectedPlan.slug });
    }
  }, [selectedPlan, updateFormValues]);

  const handleUserVerified = useCallback(
    (registered, email) => {
      setIsRegistered(registered);
      if (registered) {
        navigate(formValues.userType === 'PERSONAL' ? '/login' : '/login');
      }
    },
    [navigate, formValues.userType]
  );

  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setAmount(enteredAmount);

    const newErrors = { ...errors };
    if (Number(enteredAmount) < 70) {
      newErrors.amount = 'Amount must be 70 Naira or above';
    } else {
      delete newErrors.amount;
    }
    setErrors(newErrors);
  };

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
    if (amount && Number(amount) < 70) newErrors.amount = 'Amount must be 70 Naira or above';
    if (!selectedPlan) newErrors.selectedPlan = 'Please select a data plan';

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
      selectedPlan: selectedPlan
        ? {
            planName: selectedPlan.name,
            planPrice: selectedPlan.amount || amount,
            planData: `${formValues.selectedNetwork} - ${selectedPlan.name}`,
            planSlug: selectedPlan.slug
          }
        : null
    };

    navigate('/plans/review', { state: stateToPass });
  };

  return (
    <section className="w-full h-screen text-white">
      <Navbar className="pt-6" />
      <div className="container bg-black">
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
          <div className="flex flex-col">
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
              <DataPlansSelection
                plans={filteredPlans}
                selectedPlan={selectedPlan}
                onPlanChange={setSelectedPlan}
                error={errors.selectedPlan}
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
                  onChange={handleAmountChange}
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
