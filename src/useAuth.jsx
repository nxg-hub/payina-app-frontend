import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const REGISTRATION_LEVELS = {
  VALIDATE_OTP: 2,
  BVN_VERIFICATION_DOCUMENT_UPLOAD: 3,
  BVN_DETAILS_CONFIRMATION_SAVE_USERNAME: 4,
  FACIAL_CAPTURE_AND_UPLOAD: 5,
  CORPORATE_PROFILE_UPDATE_SET_PIN: 7,
  KYC_COMPLETED: 17
};

export function useAuth() {
  const navigate = useNavigate();

  const checkUserRegistrationLevel = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        // No token, handle unauthenticated state (e.g., redirect to login)
        navigate('/login');
        return;
      }

      const response = await axios.get(import.meta.env.VITE_REG_LEVEL_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const registrationLevel = response.data;
      const step = REGISTRATION_LEVELS[registrationLevel] || 0;

      localStorage.setItem('currentStep', step);

      if (step < 17) {
        navigate('/signup');
      } else {
        navigate('/account/dashboard');
      }
    } catch (error) {
      console.error('Error checking registration level:', error);
      navigate('/login'); // Fallback to login in case of an error
    }
  };

  useEffect(() => {
    // checkUserRegistrationLevel();
  }, []);

  return { checkUserRegistrationLevel };
}
