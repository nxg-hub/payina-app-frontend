import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../context/formContext';
import apiService from '../../../services/apiService';
import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import CustomButton from '../../../components/button/button.jsx';

const ALLOWED_SERVICES = [
  'PAY_TV',
  'BETTING_AND_LOTTERY',
  'TRANSPORT_AND_TOLL_PAYMENT',
  'COLLECTIONS',
  'GOVERNMENT_COLLECTIONS',
  'INTERNATIONAL_AIRTIME',
  'EDUCATION',
  'ENTERTAINMENT_AND_LIFESTYLE',
  'FOOD',
  'paymentss'
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

        console.log('API Response:', response);

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
        isBetting: selectedService?.slug === 'BETTING_AND_LOTTERY',
      },
      selectedBettingService: formValues.selectedBettingService,
      slug: selectedService ? selectedService.slug : '',
    };

    navigate('/account/bills/details', { state: stateToPass });
  };

  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="relative mb-8">
            <div className="w-4/5 h-1 bg-yellow-400 mx-auto -mt-0.5" />
          </div>

          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bills Payment</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="betting-service-select"
                         className="block text-sm font-medium text-gray-700">
                    Choose Service
                  </label>
                  <select
                    id="betting-service-select"
                    value={formValues.selectedBettingService || ''}
                    onChange={(e) => updateFormValues({ selectedBettingService: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                  >
                    <option value="">Select Service</option>
                    {bettingServices.map((service) => (
                      <option key={service.id} value={service.slug}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {errors.selectedBettingService && (
                    <p className="mt-2 text-sm text-red-600">{errors.selectedBettingService}</p>
                  )}
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Phone number"
                    value={formValues.phoneNumber || ''}
                    onChange={(e) => updateFormValues({ phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email address"
                    value={localEmail}
                    onChange={handleEmailChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <CustomButton
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                {isLoading ? 'Loading...' : 'Proceed'}
              </CustomButton>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default Billers;