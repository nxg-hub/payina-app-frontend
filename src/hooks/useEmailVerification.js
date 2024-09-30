// import { useState } from 'react';
// import { apiService } from '../services/apiService';
//
// export const useEmailVerification = () => {
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(null);
//   const [error, setError] = useState('');
//
//   const verifyEmail = async (email) => {
//     setIsVerifying(true);
//     setError('');
//     try {
//       const data = await apiService.checkEmailRegistration(email);
//       setIsRegistered(data.exists);
//       return data.exists;
//     } catch (err) {
//       setError('Verification failed. Please try again.');
//       throw err;
//     } finally {
//       setIsVerifying(false);
//     }
//   };
//
//   return { isVerifying, isRegistered, error, verifyEmail };
// };
import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService'; // Update the path as needed
export const useEmailVerification = () => {
  const [email, setEmail] = useState('');
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const [isRegistered, setIsRegistered] = useState(null);
  const [errors, setErrors] = useState({});

  const checkEmailRegistration = async () => {
    setIsEmailChecking(true);
    setErrors({});

    try {
      const response = await apiService.checkEmailRegistration(email);
      setIsRegistered(response.exists);
      if (response.exists) {
        // Redirect or handle registered user case
      }
    } catch (error) {
      setErrors({ email: 'Error checking email registration' });
    } finally {
      setIsEmailChecking(false);
    }
  };

  useEffect(() => {
    if (email) {
      const validationErrors = validateEmail(email);
      setErrors(validationErrors);
    }
  }, [email]);

  const validateEmail = (email) => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    return errors;
  };

  return { email, setEmail, isEmailChecking, isRegistered, errors, checkEmailRegistration };
};
export default useEmailVerification;
