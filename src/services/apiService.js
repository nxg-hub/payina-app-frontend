import axios from 'axios';
import {
  BASE_URL2,
  VITE_FETCH_BILLER_GROUPS,
  VITE_FETCH_BILLER_PLANS,
  VITE_FETCH_DATA_PLANS,
  VITE_FETCH_SERVICES,
  VITE_INITIALIZE_PAYMENT,
  VITE_VEND_VALUE
} from '../env';

export const apiService = {
  checkEmailRegistration: async (email) => {
    const encodedEmail = encodeURIComponent(email);
    const response = await axios.get(
      `${BASE_URL2}/bill-customers/check-if-email-exist-in-db?email=${encodedEmail}`
    );
    return response.data;
  },

  fetchNetworks: async () => {
    const response = await axios.get(`${BASE_URL}/vas/biller-enquiry-slug/AIRTIME_AND_DATA`);
    return response.data.responseData;
  },

  fetchDataPlans: async (networkSlug) => {
    const formattedUrl = networkSlug.replace(' ', '_');
    const response = await axios.get(`${VITE_FETCH_DATA_PLANS}/${formattedUrl}`);
    return response.data.responseData;
  },

  initializePayment: async (planId, email, amount) => {
    const response = await axios.post(`${VITE_INITIALIZE_PAYMENT}`, {
      planId,
      email,
      amount
    });
    return response.data;
  },

  vendValue: async (reference, payload) => {
    const response = await axios.post(`${VITE_VEND_VALUE}/${reference}`, payload);
    return response.data;
  },
  // vendValue: async (reference, payload) => {
  //   try {
  //     const response = await axios.post(
  //       `${BASE_URL}/vas/vend-value-non-payina-customer/${reference}`,
  //       payload
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  fetchServices: async (serviceType) => {
    try {
      const response = await axios.get(`${VITE_FETCH_SERVICES}`);
      return response.data.responseData;
    } catch (error) {
      console.error(`Error fetching ${serviceType} services:`, error);
      throw error;
    }
  },

  fetchBettingServices: async () => {
    try {
      const response = await fetch(`${VITE_FETCH_BILLER_GROUPS}`);
      if (!response.ok) {
        throw new Error('Failed to fetch betting services');
      }
      const data = await response.json();

      // Check if data.responseData exists and is an array
      if (!data || !Array.isArray(data.responseData)) {
        throw new Error('Invalid response format: responseData not found or not an array');
      }

      return data.responseData;
    } catch (error) {
      console.error('Error fetching betting services:', error);
      throw error;
    }
  },

  // fetchBettingServices: async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/vas/biller-enquiry-slug/BETTING_AND_LOTTERY`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch betting services');
  //     }
  //     const data = await response.json();
  //
  //     // Check if data.billers exists before accessing it
  //     if (!data || !data.billers) {
  //       throw new Error('Invalid response format: billers not found');
  //     }
  //
  //     return data.billers;
  //   } catch (error) {
  //     console.error('Error fetching betting services:', error);
  //     throw error;
  //   }
  // },

  fetchBillerPlans: async (billerSlug) => {
    try {
      const response = await axios.get(`${VITE_FETCH_BILLER_PLANS}/${billerSlug}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching biller details:', error);
      throw error;
    }
  }
};

export default apiService;
