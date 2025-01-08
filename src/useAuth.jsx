// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
//
// const REGISTRATION_LEVELS = {
//   VALIDATE_OTP: 2,
//   BVN_VERIFICATION_DOCUMENT_UPLOAD: 3,
//   BVN_DETAILS_CONFIRMATION_SAVE_USERNAME: 4,
//   FACIAL_CAPTURE_AND_UPLOAD: 5,
//   CORPORATE_PROFILE_UPDATE_SET_PIN: 7,
//   KYC_COMPLETED: 17,
// };
//
// export function useAuth() {
//   const navigate = useNavigate();
//
//   const checkUserRegistrationLevel = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         // No token, handle unauthenticated state (e.g., redirect to login)
//         navigate('/login');
//         return;
//       }
//       if (location.pathname === '/personal/login') {
//         // navigate('/account/dashboard');
//         navigate('/personal/dashboard');
//         return;
//       }
//
//       const response = await axios.get(import.meta.env.VITE_REG_LEVEL_ENDPOINT, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//
//       const registrationLevel = response.data;
//       const step = REGISTRATION_LEVELS[registrationLevel] || 0;
//
//       localStorage.setItem('currentStep', step);
//
//       if (step < 17) {
//         navigate('/signup');
//       } else {
//         navigate('/account/dashboard');
//       }
//     } catch (error) {
//       console.error('Error checking registration level:', error);
//       navigate('/login'); // Fallback to login in case of an error
//     }
//   };
//
//   useEffect(() => {
//     checkUserRegistrationLevel();
//   }, []);
//
//   return { checkUserRegistrationLevel };
// }
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
//
// const REGISTRATION_LEVELS = {
//   VALIDATE_OTP: 2,
//   BVN_VERIFICATION_DOCUMENT_UPLOAD: 3,
//   BVN_DETAILS_CONFIRMATION_SAVE_USERNAME: 4,
//   FACIAL_CAPTURE_AND_UPLOAD: 5,
//   CORPORATE_PROFILE_UPDATE_SET_PIN: 7,
//   KYC_COMPLETED: 17,
// };
//
// export function useAuth() {
//   const navigate = useNavigate();
//
//   const checkUserRegistrationLevel = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         navigate('/login');
//         return;
//       }
//
//       if (location.pathname === '/personal/login') {
//         // navigate('/account/dashboard');
//         navigate('/personal/dashboard');
//         return;
//       }
//
//       const response = await axios.get(import.meta.env.VITE_REG_LEVEL_ENDPOINT, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//
//       const registrationLevel = response.data;
//       const step = REGISTRATION_LEVELS[registrationLevel] || 0;
//
//       localStorage.setItem('currentStep', step);
//
//       if (step < 17) {
//         navigate('/signup');
//       } else {
//         navigate('/account/dashboard');
//       }
//     } catch (error) {
//       console.error('Error checking registration level:', error);
//       navigate('/login');
//     }
//   };
//
//   return { checkUserRegistrationLevel };
// }

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
      const registrationLevel = registrationResponse.data;
      console.log(registrationLevel, userData);

      const step = REGISTRATION_LEVELS[registrationLevel] || 0;
      localStorage.setItem('currentStep', step);

      const isPersonalUser = userData?.userType === 'PERSONAL';

      // Special handling for personal users
      if (isPersonalUser) {
        // Allow access if registration level is >= 4 (BVN_DETAILS_CONFIRMATION_SAVE_USERNAME)
        if (step >= REGISTRATION_LEVELS.BVN_DETAILS_CONFIRMATION_SAVE_USERNAME) {
          navigate('/personal/dashboard');
          return;
        }
        // If not completed level 4, redirect to signup
        navigate('/signup');
        return;
      }

      // Corporate user flow remains the same
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
