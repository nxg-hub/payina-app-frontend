// import React from 'react';
// import { useNavigate } from 'react-router-dom';
//
// export const HandleProceed = ({ selectedPlan, phoneNumber, onProceed }) => {
//   const navigate = useNavigate();
//
//   const handleClick = () => {
//     if (selectedPlan && phoneNumber) {
//       onProceed(selectedPlan, phoneNumber);
//       navigate('/planb', { state: { selectedPlan, phoneNumber } });
//     } else {
//       alert('Please select a plan and enter a phone number to proceed.');
//     }
//   };
//
//   return (
//     <button
//       onClick={handleClick}
//       disabled={!selectedPlan || !phoneNumber}
//       className={`proceed-button ${(!selectedPlan || !phoneNumber) ? 'disabled' : ''}`}
//     >
//       Proceed
//     </button>
//   );
// };
// export default HandleProceed;