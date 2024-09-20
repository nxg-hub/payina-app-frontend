// import { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const useAxios = () => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//
//   const axiosInstance = axios.create({
//     baseURL: '/api/v1/vas'
//   });
//
//   // Request interceptor
//   axiosInstance.interceptors.request.use(
//     (config) => config,
//     (error) => Promise.reject(error)
//   );
//
//   // Response interceptor
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => Promise.reject(error)
//   );
//
//   let controller = new AbortController();
//
//   useEffect(() => {
//     // Cleanup on unmount
//     return () => {
//       if (controller) controller.abort();
//     };
//   }, []);
//
//   // const fetchData = async ({ url, method, data = {}, params = {} }) => {
//   const fetchData = async ({ url, method, data = {}, params = {} }) => {
//     setLoading(true);
//
//     if (controller) controller.abort(); // Abort any previous requests
//     controller = new AbortController();
//
//     try {
//       const result = await axiosInstance({
//         url,
//         method,
//         data,
//         params,
//         signal: controller.signal
//       });
//       setResponse(result.data);
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.error('Request cancelled', error.message);
//       } else {
//         setError(error.response ? error.response.data : error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return { response, loading, error, fetchData };
// };
//
// export default useAxios;

import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(new AbortController());

  // https://payina-wallet-service-api.onrender.com/api/v1/vas/package-enquiry-slug/MTN_NIGERIA
  const axiosInstance = axios.create({
    baseURL: 'https://payina-wallet-service-api.onrender.com/api/v1/vas',
    headers: {
      Accept: 'application/json', // Ensures you get a JSON response
      'Content-Type': 'application/json' // Ensures the request is sent as JSON
    }
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (controller) controller.abort();
    };
  }, [controller]);

  const fetchData = async ({ url, method, data = {}, params = {} }) => {
    setLoading(true);

    // Abort any previous requests
    if (controller) controller.abort();

    // Create a new AbortController for the new request
    const newController = new AbortController();
    setController(newController);

    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        signal: newController.signal, // Use the new controller's signal
        headers: {
          'Cache-Control': 'no-cache', // Disable caching
          Pragma: 'no-cache', // HTTP/1.0 compatibility
          'If-None-Match': '', // Prevent `304 Not Modified`
          'If-Modified-Since': '0' // Ensure a fresh response
        }
      });
      setResponse(result.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request cancelled', error.message);
      } else {
        setError(error.response ? error.response.data : error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, fetchData };
};

export default useAxios;
