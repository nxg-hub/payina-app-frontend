import { useState, useEffect } from 'react';
import { VITE_FETCH_NETWORKS } from '../env.js';

export const useNetworkSelection = () => {
  const [networks, setNetworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNetworks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${VITE_FETCH_NETWORKS}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Ensure data.responseData exists and is an array
        if (data.responseData && Array.isArray(data.responseData)) {
          const networkNames = data.responseData.map((item) => item.name);
          setNetworks(networkNames);
        } else {
          setNetworks([]);
        }
      } catch (error) {
        setError('Error Fetching Network Providers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetworks();
  }, []);

  return { networks, isLoading, error };
};
