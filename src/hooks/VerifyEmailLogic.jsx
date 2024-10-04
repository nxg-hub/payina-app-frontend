// // VerifyEmailLogic.js
// import React, { useState } from 'react';
// import { verifyEmailAPI } from './APICallsLogic'; // Placeholder for API call
//
// const VerifyEmailLogic = ({ onUserVerified }) => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//
//   const handleVerifyEmail = async () => {
//     setLoading(true);
//     const result = await verifyEmailAPI(email);
//     setLoading(false);
//     onUserVerified(result); // Passing the result to parent
//   };
//
//   return (
//     <>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter Email"
//       />
//       <button disabled={loading} onClick={handleVerifyEmail}>
//         {loading ? 'Checking...' : 'Verify Email'}
//       </button>
//     </>
//   );
// };
//
// export default VerifyEmailLogic;
