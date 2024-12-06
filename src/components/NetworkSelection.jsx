// import React, { useState, useEffect } from 'react';
// import { ChevronDown } from 'lucide-react';
// import NetworkLogos from '../utilities/NetworkLogos.jsx';
//
// const NetworkSelection = ({
//   selectedNetwork,
//   onNetworkChange,
//   phoneNumber,
//   onPhoneChange,
//   error: propError,
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [providers, setProviders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const fetchNetworks = async () => {
//       setIsLoading(true);
//       setError(null);
//
//       try {
//         const response = await fetch(`${import.meta.env.VITE_FETCH_NETWORKS}`);
//
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//
//         const data = await response.json();
//
//         if (data.responseData && Array.isArray(data.responseData)) {
//           // Filter and transform the providers data
//           const filteredProviders = data.responseData
//             .filter(
//               (provider) =>
//                 // Filter out duplicates and variations (e.g., MTN_BILL_PAYMENT)
//                 !provider.slug.includes('_BILL_PAYMENT') &&
//                 !provider.slug.includes('_2') &&
//                 !provider.slug.includes('_3')
//             )
//             .map((provider) => ({
//               id: provider.id,
//               name: provider.name,
//               slug: provider.slug,
//               hasLogo: ['MTN', 'AIRTEL', 'GLO', '9MOBILE'].some((network) =>
//                 provider.slug.includes(network)
//               ),
//             }));
//
//           setProviders(filteredProviders);
//
//           // Set MTN as default if no network is selected
//           if (!selectedNetwork) {
//             const mtnProvider = filteredProviders.find((p) => p.slug === 'MTN_NIGERIA');
//             if (mtnProvider) {
//               onNetworkChange(mtnProvider.slug);
//             }
//           }
//         }
//       } catch (err) {
//         setError('Error fetching network providers');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//
//     fetchNetworks();
//   }, []);
//
//   const getProviderLogo = (providerSlug) => {
//     if (providerSlug.includes('MTN')) return NetworkLogos.MTN;
//     if (providerSlug.includes('AIRTEL')) return NetworkLogos.AIRTEL;
//     if (providerSlug.includes('GLO')) return NetworkLogos.GLO;
//     if (providerSlug.includes('9MOBILE')) return NetworkLogos['9MOBILE'];
//     return null;
//   };
//
//   const getCurrentProvider = () => {
//     return providers.find((p) => p.slug === selectedNetwork);
//   };
//
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-12">
//         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
//       </div>
//     );
//   }
//
//   if (error) {
//     return <div className="text-red-500 text-sm">{error}</div>;
//   }
//
//   return (
//     <div className="flex flex-col">
//       <div className="flex">
//         <div className="relative w-1/3">
//           <button
//             type="button"
//             className="w-full h-12 px-2 border border-r-0 rounded-l-lg flex items-center justify-between bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//             {selectedNetwork ? (
//               <div className="flex items-center space-x-2">
//                 {getCurrentProvider()?.hasLogo ? (
//                   React.createElement(getProviderLogo(selectedNetwork))
//                 ) : (
//                   <span className="text-sm">{getCurrentProvider()?.name}</span>
//                 )}
//               </div>
//             ) : (
//               <span className="text-sm text-gray-500">Select Network</span>
//             )}
//             <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
//           </button>
//
//           {isDropdownOpen && (
//             <div className="absolute z-10 w-48 mt-1 bg-white border rounded-lg shadow-lg">
//               {providers.map((provider) => (
//                 <button
//                   key={provider.id}
//                   className="w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 focus:outline-none"
//                   onClick={() => {
//                     onNetworkChange(provider.slug);
//                     setIsDropdownOpen(false);
//                   }}>
//                   {provider.hasLogo ? (
//                     React.createElement(getProviderLogo(provider.slug))
//                   ) : (
//                     <span className="text-sm">{provider.name}</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//
//         <div className="w-2/3">
//           <input
//             type="tel"
//             placeholder="+234-XXX-XXX-XX"
//             value={phoneNumber}
//             onChange={onPhoneChange}
//             className="w-full h-12 px-4 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>
//
//       {(propError || error) && <p className="mt-2 text-sm text-red-500">{propError || error}</p>}
//     </div>
//   );
// };
//
// export default NetworkSelection;

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import NetworkLogos from '../utilities/NetworkLogos.jsx';
import useLocalStorage from '../hooks/useLocalStorage';

const NetworkSelection = ({
  selectedNetwork,
  onNetworkChange,
  phoneNumber,
  onPhoneChange,
  error: propError,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [authToken] = useLocalStorage('authToken', '');
  const [apiKey] = useLocalStorage('apiKey', import.meta.env.VITE_API_KEY);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!authToken) return; // Skip if no auth token

      try {
        const userResponse = await fetch(import.meta.env.VITE_GET_USER, {
          method: 'GET',
          headers: {
            accept: '*/*',
            apiKey: apiKey,
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userDataResponse = await userResponse.json();
        setUserData(userDataResponse);

        // If there's no phone number already set, populate with user's phone number
        if (!phoneNumber && userDataResponse.phoneNumber) {
          onPhoneChange({ target: { value: userDataResponse.phoneNumber } });
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error fetching user details');
      }
    };

    fetchUserData();
  }, [authToken, apiKey]);

  useEffect(() => {
    const fetchNetworks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_FETCH_NETWORKS}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.responseData && Array.isArray(data.responseData)) {
          const filteredProviders = data.responseData
            .filter(
              (provider) =>
                !provider.slug.includes('_BILL_PAYMENT') &&
                !provider.slug.includes('_2') &&
                !provider.slug.includes('_3')
            )
            .map((provider) => ({
              id: provider.id,
              name: provider.name,
              slug: provider.slug,
              hasLogo: ['MTN', 'AIRTEL', 'GLO', '9MOBILE'].some((network) =>
                provider.slug.includes(network)
              ),
            }));

          setProviders(filteredProviders);

          // Set MTN as default if no network is selected
          if (!selectedNetwork) {
            const mtnProvider = filteredProviders.find((p) => p.slug === 'MTN_NIGERIA');
            if (mtnProvider) {
              onNetworkChange(mtnProvider.slug);
            }
          }
        }
      } catch (err) {
        setError('Error fetching network providers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetworks();
  }, []);

  const getProviderLogo = (providerSlug) => {
    if (providerSlug.includes('MTN')) return NetworkLogos.MTN;
    if (providerSlug.includes('AIRTEL')) return NetworkLogos.AIRTEL;
    if (providerSlug.includes('GLO')) return NetworkLogos.GLO;
    if (providerSlug.includes('9MOBILE')) return NetworkLogos['9MOBILE'];
    return null;
  };

  const getCurrentProvider = () => {
    return providers.find((p) => p.slug === selectedNetwork);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-12">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="relative w-1/3">
          <button
            type="button"
            className="w-full h-12 px-2 border border-r-0 rounded-l-lg flex items-center justify-between bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedNetwork ? (
              <div className="flex items-center space-x-2">
                {getCurrentProvider()?.hasLogo ? (
                  React.createElement(getProviderLogo(selectedNetwork))
                ) : (
                  <span className="text-sm">{getCurrentProvider()?.name}</span>
                )}
              </div>
            ) : (
              <span className="text-sm text-gray-500">Select Network</span>
            )}
            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-48 mt-1 bg-white border rounded-lg shadow-lg">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  className="w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 focus:outline-none"
                  onClick={() => {
                    onNetworkChange(provider.slug);
                    setIsDropdownOpen(false);
                  }}>
                  {provider.hasLogo ? (
                    React.createElement(getProviderLogo(provider.slug))
                  ) : (
                    <span className="text-sm">{provider.name}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-2/3">
          <input
            type="tel"
            placeholder={userData?.phoneNumber || '+234-XXX-XXX-XX'}
            value={phoneNumber}
            onChange={onPhoneChange}
            className="w-full h-12 px-4 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {(propError || error) && <p className="mt-2 text-sm text-red-500">{propError || error}</p>}
    </div>
  );
};

export default NetworkSelection;
