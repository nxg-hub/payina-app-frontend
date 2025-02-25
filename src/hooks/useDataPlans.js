import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

export const useDataPlans = (networkSlug) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (networkSlug) {
      fetchDataPlans(networkSlug);
    }
  }, [networkSlug]);

  const fetchDataPlans = async (networkSlug) => {
    setIsLoading(true);
    setError('');
    try {
      const data = await apiService.fetchDataPlans(networkSlug);
      const sortedPlans = [...(data || [])].sort((a, b) => a.amount - b.amount);
      setPlans(sortedPlans);
    } catch (err) {
      setError('Error fetching data plans');
    } finally {
      setIsLoading(false);
    }
  };

  return { plans, selectedPlan, setSelectedPlan, isLoading, error };
};