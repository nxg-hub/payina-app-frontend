// // src/hooks/useNetworkSelection.jsx
// import { useState, useEffect } from 'react';
//
// export const useNetworkSelection = () => {
//   const [networks, setNetworks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     // Simulate a network request
//     const fetchNetworks = async () => {
//       try {
//         const response = await fetch('/api/networks');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setNetworks(data);
//       } catch (error) {
//         setError('Error Fetching Networks');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//
//     fetchNetworks();
//   }, []);
//
//   return { networks, isLoading, error };
// };

import { useState, useEffect } from 'react';

export const useNetworkSelection = () => {
  const [networks, setNetworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNetworks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://payina-wallet-service-api.onrender.com/api/v1/vas/biller-enquiry-slug/AIRTIME_AND_DATA'
        );

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
