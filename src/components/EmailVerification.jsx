// import React, { useEffect } from 'react';
// import { useEmailVerification } from '../hooks/useEmailVerification';
// import InputStyle from '../utilities/InputStyle';
//
// export const EmailVerification = ({ onUserVerified, value, onChange, error }) => {
//   const { isEmailChecking, isRegistered, checkEmailRegistration } = useEmailVerification();
//
//   useEffect(() => {
//     if (isRegistered !== null) {
//       onUserVerified(isRegistered, value);
//     }
//   }, [isRegistered, onUserVerified, value]);
//
//   useEffect(() => {
//     if (isRegistered !== null) {
//       onUserVerified(isRegistered, value);
//     }
//   }, [isRegistered, onUserVerified]);
//
//   return (
//     <div>
//       <InputStyle
//         type="email"
//         value={value}
//         onChange={onChange}
//         placeholder="Enter your email"
//         error={error}
//       />
//       <button
//         onClick={() => {
//           checkEmailRegistration();
//         }}
//         disabled={isEmailChecking}
//         type="button">
//         {isEmailChecking ? 'Checking...' : 'Verify Email'}
//       </button>
//     </div>
//   );
// };
//
// export default EmailVerification;


// import React, { useState } from 'react';
// import { apiService } from '../services/apiService';
//
// function EmailVerification() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//
//     try {
//       const result = await apiService.checkEmailRegistration(email);
//       console.log('Result:', result);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <InputStyle
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter email"
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? 'Checking...' : 'Check Email'}
//       </button>
//       {error && <p style={{color: 'red'}}>{error}</p>}
//     </form>
//   );
// }
//
// export default EmailVerification;


// import React, { useState } from 'react';
// import { apiService } from '../services/apiService';
// import InputStyle from '../utilities/InputStyle'
//
// function EmailVerification() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//
//     try {
//       const result = await apiService.checkEmailRegistration(email);
//       console.log('Result:', result);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <InputStyle
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter email"
//         required
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? 'Checking...' : 'Check Email'}
//       </button>
//       {error && <p style={{color: 'red'}}>{error}</p>}
//     </form>
//   );
// }
//
// export default EmailVerification;


// import React, { useState } from 'react';
// import { apiService } from '../services/apiService';
// import InputStyle from '../utilities/InputStyle'
//
// function EmailVerification() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//
//     try {
//       const result = await apiService.checkEmailRegistration(email);
//       console.log('Result:', result);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div>
//       <InputStyle
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter email"
//         required
//       />
//       <button type="button" onClick={handleSubmit} disabled={loading}>
//         {loading ? 'Checking...' : 'Check Email'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }
//
// export default EmailVerification;


import React, { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';

const EmailVerification = ({
                             onUserVerified,
                             value,
                             onChange,
                             type = "email",
                             placeholder = "Enter Email address",
                             className = "border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                           }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyEmail = useCallback(async (email) => {
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const response = await apiService.checkEmailRegistration(email);

      // Assuming the API returns { exists: boolean, message: string, userType: string | null }
      const isRegistered = response.exists;

      // Call the callback with the verification result and email
      onUserVerified(isRegistered, email, response.userType);

      if (!isRegistered) {
        // If user doesn't exist, we don't show an error, as this is expected behavior
        setError('');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during verification');
    } finally {
      setLoading(false);
    }
  }, [onUserVerified]);

  const handleChange = useCallback((e) => {
    const newEmail = e.target.value;
    onChange(e);  // Call the parent's onChange handler

    // Clear any existing error when the user types
    if (error) setError('');
  }, [onChange, error]);

  const handleBlur = useCallback((e) => {
    verifyEmail(e.target.value);
  }, [verifyEmail]);

  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={className}
        disabled={loading}
      />
      {loading && <span className="text-yellow">Verifying...</span>}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default EmailVerification;