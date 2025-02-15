import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiService from './services/apiService.js';
import { useDispatch } from 'react-redux';
import { setStep } from './Redux/BusinessSignUpSlice.jsx';

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
  const dispatch = useDispatch();
  const checkUserRegistrationLevel = async () => {
    try {
      // Check for auth token
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      // Get user data and registration level in parallel
      const [userData, registrationResponse] = await Promise.all([
        apiService.getUser(),
        axios.get(import.meta.env.VITE_REG_LEVEL_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);
      // Process registration level
      // const registrationLevel = registrationResponse.data;

      // const step = REGISTRATION_LEVELS[registrationLevel] || 0;
      // // localStorage.setItem('currentStep', step);

      const isPersonalUser = userData?.userType === 'PERSONAL';
      const isCorporateUser = userData?.userType === 'CORPORATE';

      // Special handling for personal users
      if (isPersonalUser) {
        if (userData.registrationLevel === 'VALIDATE_OTP') {
          navigate('/personal/dashboard');
          return;
        }
        if (userData.registrationLevel === 'BVN_VERIFICATION_DOCUMENT_UPLOAD') {
          navigate('/personal/dashboard');
          return;
        }
        if (userData.registrationLevel === 'BVN_DETAILS_CONFIRMATION_SAVE_USERNAME') {
          navigate('/personal/dashboard');
          return;
        }

        if (userData.registrationLevel === 'FACIAL_CAPTURE_AND_UPLOAD') {
          navigate('/personal/dashboard');
          return;
        }
        

        if (userData.registrationLevel === 'SET_TRANSACTION_PIN') {
          navigate('/personal/dashboard');
          return;
        }
        if (userData.registrationLevel === 'KYC_COMPLETED') {
          navigate('/personal/dashboard');
          return;
        }
        // If not completed level 4, redirect to signup
        navigate('/signup');
        return;
      }

      // Corporate user flow remains the same
      if (isCorporateUser) {
        if (userData.registrationLevel === 'VALIDATE_OTP') {
          dispatch(setStep(2));
          navigate('/signup');
          return;
        }
        if (userData.registrationLevel === 'BVN_VERIFICATION_DOCUMENT_UPLOAD') {
          dispatch(setStep(3));
          navigate('/signup');
          return;
        }
        if (userData.registrationLevel === 'BVN_DETAILS_CONFIRMATION_SAVE_USERNAME') {
          dispatch(setStep(3));
          navigate('/signup');
          return;
        }
        if (userData.registrationLevel === 'FACIAL_CAPTURE_AND_UPLOAD') {
          dispatch(setStep(5));
          navigate('/signup');
          return;
        }
        if (userData.registrationLevel === 'SET_TRANSACTION_PIN') {
          dispatch(setStep(15));
          navigate('/signup');
          return;
        }
        if (userData.registrationLevel === 'KYC_COMPLETED') {
          navigate('/account/dashboard');
          return;
        }
      }
    } catch (error) {
      console.error('Error in authentication flow:', error);
      navigate('/login');
    }
  };

  return { checkUserRegistrationLevel };
}
