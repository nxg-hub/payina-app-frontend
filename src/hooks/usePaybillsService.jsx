import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

export const usePaybillsService = (serviceType) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiService.fetchServices(serviceType);
        setServices(data);
        setIsLoading(false);
      } catch (err) {
        setError(`Failed to fetch ${serviceType} services`);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [serviceType]);

  return { services, isLoading, error };
};
export default usePaybillsService;