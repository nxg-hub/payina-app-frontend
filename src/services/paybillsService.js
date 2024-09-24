import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

export const paybillsService = () => {
  const [bettingServices, setBettingServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBettingServices = async () => {
      try {
        const data = await apiService.fetchBettingServices();
        setBettingServices(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch betting services');
        setIsLoading(false);
      }
    };

    fetchBettingServices();
  }, []);

  return { bettingServices, isLoading, error };
};
export default paybillsService;