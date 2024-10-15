import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import { useForm } from '../../../context/formContext';
import apiService from '../../../services/apiService';

const ALLOWED_SERVICES = [
  'ELECTRIC_DISCO',
  'PAY_TV',
  'BETTING_AND_LOTTERY',
  'TRANSPORT_AND_TOLL_PAYMENT',
  'COLLECTIONS',
  'GOVERNMENT_COLLECTIONS',
  'INTERNATIONAL_AIRTIME',
  'EDUCATION'
];

const Billers = () => {
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
      setError(null);
      try {
        const response = await apiService.fetchBettingServices();

        // Log the entire response for debugging
        console.log('API Response:', response);

        // Check if response exists
        if (!response) {
          throw new Error('No response received from API');
        }

        // Handle different response formats
        let serviceData;
        if (Array.isArray(response)) {
          serviceData = response;
        } else if (typeof response === 'object') {
          if (Array.isArray(response.responseData)) {
            serviceData = response.responseData;
          } else if (response.data && Array.isArray(response.data)) {
            serviceData = response.data;
          } else if (response.responseData && Array.isArray(response.responseData.services)) {
            serviceData = response.responseData.services;
          } else {
            console.error('Unexpected response structure:', response);
            throw new Error('Unexpected API response structure');
          }
        } else {
          throw new Error('Invalid API response format');
        }

        const filteredServices = serviceData.filter(
          (service) => service && service.slug && ALLOWED_SERVICES.includes(service.slug)
        );
        // Filter services
        // const filteredServices = serviceData.filter((service) => service && service.slug);

        console.log('Filtered services:', filteredServices);

        setBettingServices(filteredServices);

        if (filteredServices.length === 0) {
          setError('No matching services found');
        }
      } catch (err) {
        const errorMessage = err.message || 'Error fetching services';
        setError(errorMessage);
        console.error('Error details:', err);
        setBettingServices([]);
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
      newErrors.selectedBettingService = 'Service selection is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedService = bettingServices.find(
      (service) => service.slug === formValues.selectedBettingService
    );

    const stateToPass = {
      formValues: {
        ...formValues,
        email: localEmail,
        isBetting: selectedService?.slug === 'BETTING_AND_LOTTERY'
      },
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
        <form onSubmit={handleSubmit} className="text-white">
          <div className="flex flex-col w-[64%]">
            <label htmlFor="betting-service-select" className="py-4">
              Choose Service
            </label>
            <select
              id="betting-service-select"
              value={formValues.selectedBettingService || ''}
              onChange={(e) => updateFormValues({ selectedBettingService: e.target.value })}
              className="border-2 text-xs rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600 w-full">
              <option value="">Select Service</option>
              {bettingServices.map((service) => (
                <option key={service.id} value={service.slug}>
                  {service.name}
                </option>
              ))}
            </select>
            {errors.selectedBettingService && (
              <p className="text-red-500 mt-1">{errors.selectedBettingService}</p>
            )}
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex flex-col w-[64%]">
            <label className="py-4">Phone</label>
            <input
              type="number"
              placeholder="Enter Phone number"
              className="border-2 text-xs rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
              value={formValues.phoneNumber || ''}
              onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
            />
            {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber}</p>}
          </div>
          {/*</>*/}
          {/*)}*/}
          <button
            type="submit"
            className="text-primary mb-10 mt-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
            disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Proceed to Next Step'}
          </button>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default Billers;
