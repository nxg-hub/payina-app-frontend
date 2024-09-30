import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import EmailVerification from '../../components/EmailVerification';
import { useForm } from '../../context/formContext';
import { apiService } from '../../services/apiService';

const Betone = () => {
  const { formValues, updateFormValues } = useForm();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(null);
  const [errors, setErrors] = useState({});
  const [localEmail, setLocalEmail] = useState('');
  const [bettingServices, setBettingServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBettingServices = async () => {
      setIsLoading(true);
      try {
        const services = await apiService.fetchBettingServices();
        setBettingServices(services);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching betting services:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBettingServices();
  }, []);

  const handleUserVerified = useCallback(
    (registered, email) => {
      setIsRegistered(registered);
      if (registered) {
        navigate('/login');
      }
      updateFormValues({ email });
    },
    [navigate, updateFormValues]
  );

  const handleEmailChange = useCallback((e) => {
    setLocalEmail(e.target.value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!localEmail) newErrors.email = 'Email is required';
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formValues.selectedBettingService)
      newErrors.selectedBettingService = 'Betting service selection is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedService = bettingServices.find(
      (service) => service.slug === formValues.selectedBettingService
    );
    const stateToPass = {
      formValues: { ...formValues, email: localEmail },
      selectedBettingService: formValues.selectedBettingService,
      slug: selectedService ? selectedService.slug : ''
    };

    navigate('/bettwo', { state: stateToPass });
  };

  return (
    <section>
      <Navbar />
      <div className="container">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
        <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
          Place Bets & get Cashback
        </p>
        <form onSubmit={handleSubmit} className="text-white">
          <button className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
            Want to enjoy discounts?
            <span className="text-yellow"> Register</span> or{' '}
            <span className="text-yellow">Login</span>{' '}
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
              <div className="flex flex-col w-[64%]">
                <label htmlFor="betting-service-select" className="py-4">
                  Choose Betting Service
                </label>
                <select
                  id="betting-service-select"
                  value={formValues.selectedBettingService}
                  onChange={(e) => updateFormValues({ selectedBettingService: e.target.value })}
                  className="border-2 text-xs rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600 w-full">
                  <option value="">Select Betting Service</option>
                  {bettingServices.length > 0 ? (
                    bettingServices.map((service) => (
                      <option key={service.id} value={service.slug}>
                        {service.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      {isLoading ? 'Loading betting services...' : 'No betting services available'}
                    </option>
                  )}
                </select>
                {errors.selectedBettingService && (
                  <p className="text-red-500 mt-1">{errors.selectedBettingService}</p>
                )}
              </div>
              <div className="flex flex-col w-[64%]">
                <label className="py-4">Phone</label>
                <input
                  type="number"
                  placeholder="Enter Phone number"
                  className="border-2 text-xs rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                  value={formValues.phoneNumber}
                  onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
                />
                {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber}</p>}
              </div>
            </>
          )}
          <button
            type="submit"
            className="text-primary mb-10 mt-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200">
            Proceed to Bettwo
          </button>
        </form>
        <Footer />
      </div>
    </section>
  );
};

export default Betone;
