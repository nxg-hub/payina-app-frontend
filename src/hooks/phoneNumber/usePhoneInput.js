// import { useState } from 'react';
//
// export function usePhoneInput(initialValue = '') {
//   const [phoneNumber, setPhoneNumber] = useState(initialValue);
//   const [error, setError] = useState('');
//
//   const validatePhoneNumber = (number) => {
//     if (!/^\d{11}$/.test(number)) {
//       setError('Phone number must be exactly 11 digits');
//     } else {
//       setError('');
//     }
//   };
//
//   const handlePhoneNumberChange = (e) => {
//     const number = e.target.value;
//     setPhoneNumber(number);
//     validatePhoneNumber(number);
//   };
//
//   return {
//     phoneNumber,
//     error,
//     handlePhoneNumberChange,
//   };
// }
