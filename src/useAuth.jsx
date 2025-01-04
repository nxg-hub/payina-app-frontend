import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiService from './services/apiService.js';

const REGISTRATION_LEVELS = {
  VALIDATE_OTP: 3,
  BVN_VERIFICATION_DOCUMENT_UPLOAD: 4,
  BVN_DETAILS_CONFIRMATION_SAVE_USERNAME: 5,
  FACIAL_CAPTURE_AND_UPLOAD: 6,
  CORPORATE_PROFILE_UPDATE_SET_PIN: 8,
  KYC_COMPLETED: 17,
};

export function useAuth() {
  const navigate = useNavigate();

  const checkUserRegistrationLevel = async () => {
    try {
      // Check for auth token
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      // Fetch user data to determine user type
      const userData = await apiService.getUser();
      const isPersonalUser = userData?.userType === 'PERSONAL';

      // Allow personal users to log in without checking registration level
      if (isPersonalUser) {
        navigate('/personal/dashboard');
        return;
      }

      // For corporate users, check registration level
      const registrationResponse = await axios.get(import.meta.env.VITE_REG_LEVEL_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Process registration level for corporate users
      const registrationLevel = registrationResponse.data;
      const step = REGISTRATION_LEVELS[registrationLevel] || 0;
      localStorage.setItem('currentStep', step);

      // Redirect based on registration level for corporate users
      if (step < REGISTRATION_LEVELS.KYC_COMPLETED) {
        navigate('/signup');
        return;
      }

      navigate('/account/dashboard');
    } catch (error) {
      console.error('Error in authentication flow:', error);
      navigate('/login');
    }
  };

  return { checkUserRegistrationLevel };
}
