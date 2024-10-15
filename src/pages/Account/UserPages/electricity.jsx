import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import { useForm } from '../../../context/formContext';
import apiService from '../../../services/apiService';

const ALLOWED_SERVICES = ['ELECTRIC_DISCO'];

const Electricity = () => {
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

        if (!response) {
          throw new Error('No response received from API');
        }

        let serviceData;
        if (Array.isArray(response)) {
          serviceData = response;
        } else if (typeof response === 'object') {
          serviceData = response.responseData?.services ||
            response.responseData ||
            response.data || [];
        } else {
          throw new Error('Invalid API response format');
        }

        const filteredServices = serviceData.filter(
          (service) => service?.slug && ALLOWED_SERVICES.includes(service.slug)
        );

        setBettingServices(filteredServices);

        if (filteredServices.length === 0) {
          setError('No matching services found');
        }
      } catch (err) {
        setError(err.message || 'Error fetching services');
        console.error('Error details:', err);
        setBettingServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBettingServices();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formValues.selectedBettingService) {
      newErrors.selectedBettingService = 'Service selection is required';
    }
    return newErrors;
  };

  const handleNavigateToBetTwo = useCallback(() => {
    const selectedService = bettingServices.find(
      (service) => service.slug === formValues.selectedBettingService
    );

    const stateToPass = {
      formValues: {
        ...formValues,
        isBetting: selectedService?.slug === 'BETTING_AND_LOTTERY'
      },
      selectedBettingService: formValues.selectedBettingService,
      slug: selectedService?.slug || ''
    };

    navigate('/bettwo', {
      state: stateToPass,
      replace: true // Use replace to prevent going back to this page
    });
  }, [navigate, formValues, bettingServices]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    handleNavigateToBetTwo();
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

export default Electricity;
