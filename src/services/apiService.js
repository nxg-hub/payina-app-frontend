// import axios from 'axios';
//
// const BASE_URL = 'https://payina-wallet-service-api.onrender.com/api/v1';
//
// export const apiService = {
//   checkEmailRegistration: async (email) => {
//     const encodedEmail = encodeURIComponent(email);
//     const response = await axios.get(
//       `https://payina-be-6f08cdfb4414.herokuapp.com/api/bill-customers/check-if-email-exist-in-db?email=${encodedEmail}`
//     );
//     return response.data;
//   },
//
//   fetchNetworks: async () => {
//     const response = await axios.get(`${BASE_URL}/vas/biller-enquiry-slug/AIRTIME_AND_DATA`);
//     return response.data.responseData;
//   },
//
//   fetchDataPlans: async (networkSlug) => {
//     const formattedUrl = networkSlug.replace(' ', '_');
//     const response = await axios.get(`${BASE_URL}/vas/package-enquiry-slug/${formattedUrl}`);
//     return response.data.responseData;
//   },
//
//   initializePayment: async (planId, email, amount) => {
//     const response = await axios.post(`${BASE_URL}/bill/initialize`, {
//       planId,
//       email,
//       amount,
//     });
//     return response.data;
//   },
//
//   vendValue: async (paymentReference) => {
//     const response = await axios.post(`${BASE_URL}/vas/vend-value-non-payina-customer/${paymentReference}`);
//     return response.data;
//   },
//
//   // Add other API calls as needed
// };
//
// export default apiService;


import axios from 'axios';

const BASE_URL = 'https://payina-wallet-service-api.onrender.com/api/v1';

export const apiService = {
  checkEmailRegistration: async (email) => {
    const encodedEmail = encodeURIComponent(email);
    const response = await axios.get(
      `https://payina-be-6f08cdfb4414.herokuapp.com/api/bill-customers/check-if-email-exist-in-db?email=${encodedEmail}`
    );
    return response.data;
  },

  fetchNetworks: async () => {
    const response = await axios.get(`${BASE_URL}/vas/biller-enquiry-slug/AIRTIME_AND_DATA`);
    return response.data.responseData;
  },

  fetchDataPlans: async (networkSlug) => {
    const formattedUrl = networkSlug.replace(' ', '_');
    const response = await axios.get(`${BASE_URL}/vas/package-enquiry-slug/${formattedUrl}`);
    return response.data.responseData;
  },

  initializePayment: async (planId, email, amount) => {
    const response = await axios.post(`${BASE_URL}/bill/initialize`, {
      planId,
      email,
      amount,
    });
    return response.data;
  },

  vendValue: async (paymentReference) => {
    const response = await axios.post(`${BASE_URL}/vas/vend-value-non-payina-customer/${paymentReference}`);
    return response.data;
  },

  // Add other API calls as needed
};

export default apiService;