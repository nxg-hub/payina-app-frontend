import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../_components';
import { useForm } from '../../../context/formContext';
import apiService from '../../../services/apiService';
import Footer from '../../../components/footer/footer';
import CustomButton from '../../../components/button/button.jsx';

const ALLOWED_SERVICES = [
  'ELECTRIC_DISCO',
  'PAY_TV',
  'BETTING_AND_LOTTERY',
  'TRANSPORT_AND_TOLL_PAYMENT',
  'COLLECTIONS',
  'GOVERNMENT_COLLECTIONS',
  'INTERNATIONAL_AIRTIME',
  'EDUCATION',
  'ENTERTAINMENT_AND_LIFESTYLE',
  'FOOD',
  'paymentss',
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBettingServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('Fetching betting services...');
        const response = await apiService.fetchBettingServices();
        console.log('API Response for betting services:', response);

        if (!response) {
          throw new Error('No response received from API');
        }

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

        console.log('Filtered services:', filteredServices);
        setBettingServices(filteredServices);

        if (filteredServices.length === 0) {
          setError('No matching services found');
        }
      } catch (err) {
        const errorMessage = err.message || 'Error fetching services';
        console.error('Error fetching services:', err);
        setError(errorMessage);
        setBettingServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBettingServices();
  }, []);

  const validateForm = () => {
    console.log('Validating form values:', { formValues, localEmail });
    const newErrors = {};

    if (!formValues.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,11}$/.test(formValues.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10-11 digits';
    }

    if (!formValues.selectedBettingService) {
      newErrors.selectedBettingService = 'Service selection is required';
    }

    console.log('Validation errors:', newErrors);
    return newErrors;
  };

  const handleNavigation = useCallback((stateToPass) => {
    console.log('Navigating with state:', stateToPass);
    try {
      navigate('/account/bills/plans', {
        state: stateToPass,
        replace: true // Prevents going back to form
      });
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Navigation failed. Please try again.');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission started');

    if (isSubmitting) {
      console.log('Submission already in progress');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        console.log('Validation failed:', validationErrors);
        setErrors(validationErrors);
        return;
      }

      // Find selected service
      const selectedService = bettingServices.find(
        (service) => service.slug === formValues.selectedBettingService
      );
      console.log('Selected service:', selectedService);

      if (!selectedService) {
        throw new Error('Selected service not found');
      }

      const stateToPass = {
        formValues: {
          ...formValues,
          email: localEmail,
          isBetting: selectedService.slug === 'BETTING_AND_LOTTERY',
          timestamp: new Date().toISOString(), // Add timestamp for tracking
        },
        selectedBettingService: formValues.selectedBettingService,
        slug: selectedService.slug,
        serviceDetails: {
          name: selectedService.name,
          id: selectedService.id,
        },
      };

      console.log('Proceeding with form submission:', stateToPass);

      // Navigate to plans page
      handleNavigation(stateToPass);

    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'An error occurred while processing your request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 py-8 lg:px-8 mt-16">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select a Service</h2>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <CustomButton
                  type="button"
                  className="w-full mb-6 text-center bg-blue-50 text-blue-600 p-4 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  Paybills
                  {/*<span className="font-semibold">Register</span> or{' '}*/}
                  {/*<span className="font-semibold">Login</span>*/}
                </CustomButton>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Choose Service
                      </label>
                      <select
                        id="betting-service-select"
                        value={formValues.selectedBettingService || ''}
                        onChange={(e) => {
                          console.log('Service selected:', e.target.value);
                          updateFormValues({ selectedBettingService: e.target.value });
                        }}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Service</option>
                        {bettingServices.map((service) => (
                          <option key={service.id} value={service.slug}>
                            {service.name.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      {errors.selectedBettingService && (
                        <p className="mt-2 text-sm text-red-600">{errors.selectedBettingService}</p>
                      )}
                      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                    </div>

                    {/*<div className="space-y-2">*/}
                    {/*  <label className="block text-sm font-medium text-gray-700">*/}
                    {/*    Phone Number*/}
                    {/*  </label>*/}
                    {/*  <input*/}
                    {/*    type="number"*/}
                    {/*    placeholder="Enter Phone number"*/}
                    {/*    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                    {/*    value={formValues.phoneNumber || ''}*/}
                    {/*    onChange={(e) => {*/}
                    {/*      console.log('Phone number updated:', e.target.value);*/}
                    {/*      updateFormValues({ phoneNumber: e.target.value });*/}
                    {/*    }}*/}
                    {/*  />*/}
                    {/*  {errors.phoneNumber && (*/}
                    {/*    <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>*/}
                    {/*  )}*/}
                    {/*</div>*/}
                  </div>

                  <CustomButton
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting ? 'Processing...' : isLoading ? 'Loading...' : 'Proceed'}
                  </CustomButton>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Billers;