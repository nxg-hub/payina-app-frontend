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

import React, { useEffect } from 'react';
import { useEmailVerification } from '../hooks/useEmailVerification';
import InputStyle from '../utilities/InputStyle';

export const EmailVerification = ({ onUserVerified, value, onChange, error }) => {
  const { isEmailChecking, isRegistered, checkEmailRegistration } = useEmailVerification();

  useEffect(() => {
    if (isRegistered !== null) {
      onUserVerified(isRegistered, value);
    }
  }, [isRegistered, onUserVerified, value]);

  const handleVerification = () => {
    checkEmailRegistration();
  };

  return (
    <>
      <InputStyle
        type="email"
        placeholder="Enter your email"
        value={value}
        onChange={onChange}
        error={error}
      />
      <button
        onClick={handleVerification}
        disabled={isEmailChecking}
        type="button"
      >
        {isEmailChecking ? 'Checking...' : 'Verify Email'}
      </button>
    </>
  );
};

export default EmailVerification;
