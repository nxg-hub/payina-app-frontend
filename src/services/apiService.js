import axios from 'axios';

export const apiService = {
  checkEmailRegistration: async (email) => {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const encodedEmail = encodeURIComponent(email);
      const response = await axios.get(`${import.meta.env.VITE_EMAIL_CHECK}?email=${encodedEmail}`);
      return response.data;
    } catch (error) {
      console.error('Error checking email registration:', error);
      throw error;
    }
  },

  fetchNetworks: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_FETCH_NETWORKS);
      return response.data.responseData;
    } catch (error) {
      console.error('Error fetching networks:', error);
      throw error;
    }
  },

  fetchDataPlans: async (networkSlug) => {
    try {
      const formattedUrl = networkSlug.replace(' ', '_');
      const response = await axios.get(`${import.meta.env.VITE_FETCH_DATA_PLANS}/${formattedUrl}`);
      return response.data.responseData;
    } catch (error) {
      console.error('Error fetching data plans:', error);
      throw error;
    }
  },

  initializePayment: async (planId, email, amount) => {
    try {
      const response = await axios.post(import.meta.env.VITE_INITIALIZE_PAYMENT, {
        planId,
        email,
        amount
      });
      return response.data;
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  },

  vendValue: async (reference, payload) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_VEND_VALUE}/${reference}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error vending value:', error);
      throw error;
    }
  },

  fetchServices: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_FETCH_SERVICES);
      return response.data.responseData;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  fetchBettingServices: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_FETCH_BILLER_GROUPS);
      if (!response.data || !Array.isArray(response.data.responseData)) {
        throw new Error('Invalid response format: responseData not found or not an array');
      }
      return response.data.responseData;
    } catch (error) {
      console.error('Error fetching betting services:', error);
      throw error;
    }
  },

  fetchBillerBySlug: async (billerGroupSlug) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FETCH_BILLER_SLUG}/${billerGroupSlug}`
      );
      return response.data.responseData;
    } catch (error) {
      console.error('Error fetching biller by slug:', error);
      throw error;
    }
  },

  fetchBillerPlans: async (billerSlug) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_FETCH_BILLER_PLANS}/${billerSlug}`);
      return response.data.responseData;
    } catch (error) {
      console.error('Error fetching biller plans:', error);
      throw error;
    }
  },

  verifyCustomer: async (payload) => {
    try {
      const response = await axios.post(import.meta.env.VITE_CUSTOMER_ENQUIRY, payload);
      return response.data;
    } catch (error) {
      console.error('Error verifying customer:', error);
      throw error;
    }
  }
};

export default apiService;
