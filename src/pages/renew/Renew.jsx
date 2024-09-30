// import React, { useState } from 'react';
// import { useForm } from '../../context/formContext';
// import { useNavigate } from 'react-router-dom';
//
// const RenewForm = () => {
//   const { selectedPlan } = useForm();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [email, setEmail] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [nameOnCard, setNameOnCard] = useState('');
//   const [expiryMonth, setExpiryMonth] = useState('');
//   const [expiryYear, setExpiryYear] = useState('');
//   const [cvv, setCvv] = useState('');
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//
//     try {
//       const amountInKobo = Math.round(selectedPlan.amount * 100);
//
//       // First API call to initiate payment
//       const response = await fetch(
//         'https://payina-wallet-service-api.onrender.com/api/v1/bill/initialize',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             planId: selectedPlan.id,
//             email: email,
//             amount: amountInKobo,
//           }),
//         }
//       );
//
//       const data = await response.json();
//
//       if (data.status === true && data.message === "Authorization URL created") {
//         const authorizationUrl = data.data.authorization_url;
//         const paymentReference = data.data.reference;
//
//         // Redirect to the payment page
//         window.open(authorizationUrl, '_blank');
//         navigate('/waiting-for-payment');
//
//         // Proceed to second API call using the reference from the first API respose data
//         const secondResponse = await fetch(
//           `https://payina-wallet-service-api.onrender.com/api/v1/vas/vend-value-non-payina-customer/${paymentReference}`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//
//         const secondData = await secondResponse.json();
//
//         if (secondData.status === true) {
//
//           console.log('Transaction successful:', secondData.message);
//         } else {
//           throw new Error(secondData.message || 'Second API call failed');
//         }
//       } else {
//         throw new Error(data.message || 'First API call failed');
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error('Error during form submission:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       {selectedPlan ? (
//         <div className="container">
//           <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-7 bg-yellow"></div>
//           <button
//             type="button"
//             className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
//             Review Your Order
//           </button>
//           <div className="flex text-primary flex-col w-[64%]">
//             <label className="py-4">Amount Payable</label>
//             <input
//               type="number"
//               value={selectedPlan.amount}
//               readOnly
//               className="border-2 rounded-[5px] px-2 py-2 text-xs border-primary bg-black text-primary mb-3"
//             />
//           </div>
//           <div className="flex text-primary flex-col w-[64%]">
//             <label className="pt-4">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="border-2 mt-2 mb-2 rounded-[5px] px-2 py-2 text-xs border-primary bg-black text-primary"
//               required
//             />
//           </div>
//           {/*<div className="flex text-primary flex-col w-[64%]">*/}
//           {/*  <label className="pt-4">Card Number</label>*/}
//           {/*  <input*/}
//           {/*    type="text"*/}
//           {/*    value={cardNumber}*/}
//           {/*    onChange={(e) => setCardNumber(e.target.value)}*/}
//           {/*    placeholder="Enter Card Number"*/}
//           {/*    className="border-2 mt-2 mb-2 rounded-[5px] px-2 py-2 text-xs border-primary bg-black text-slate-600"*/}
//           {/*    required*/}
//           {/*  />*/}
//           {/*</div>*/}
//           {/*<div className="flex text-primary flex-col w-[64%]">*/}
//           {/*  <label className="pt-4">Name On Card</label>*/}
//           {/*  <input*/}
//           {/*    type="text"*/}
//           {/*    value={nameOnCard}*/}
//           {/*    onChange={(e) => setNameOnCard(e.target.value)}*/}
//           {/*    placeholder="Enter Name On Card"*/}
//           {/*    className="border-2 mt-2 mb-3 rounded-[5px] px-2 py-2 text-xs border-primary bg-black text-slate-600"*/}
//           {/*    required*/}
//           {/*  />*/}
//           {/*</div>*/}
//           {/*<div className="md:flex flex-1 text-primary gap-6 mt-8 w-[300px]">*/}
//           {/*  <input*/}
//           {/*    type="number"*/}
//           {/*    value={expiryMonth}*/}
//           {/*    onChange={(e) => setExpiryMonth(e.target.value)}*/}
//           {/*    placeholder="MM"*/}
//           {/*    className="border-2 mb-5 md:static text-xs pl-2 px-24 py-2 rounded-[5px] border-primary bg-black text-slate-600"*/}
//           {/*    required*/}
//           {/*  />*/}
//           {/*  <input*/}
//           {/*    type="number"*/}
//           {/*    value={expiryYear}*/}
//           {/*    onChange={(e) => setExpiryYear(e.target.value)}*/}
//           {/*    placeholder="YY"*/}
//           {/*    className="mb-5 md:static text-xs pl-2 py-2 px-24 border-2 rounded-[5px] border-primary bg-black text-slate-600"*/}
//           {/*    required*/}
//           {/*  />*/}
//           {/*  <input*/}
//           {/*    type="number"*/}
//           {/*    value={cvv}*/}
//           {/*    onChange={(e) => setCvv(e.target.value)}*/}
//           {/*    placeholder="CVV"*/}
//           {/*    className="border-2 text-xs mb-5 md:static rounded-[5px] pl-2 px-24 py-2 border-primary bg-black text-slate-600"*/}
//           {/*    required*/}
//           {/*  />*/}
//           {/*</div>*/}
//           {error && <p className="text-red-500">{error}</p>}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`text-primary mt-7 mb-12 text-left px-16 py-4 border-none rounded-[5px] ${
//               isSubmitting
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-lightBlue cursor-pointer hover:bg-neutral'
//             } transition-all duration-200`}>
//             {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
//           </button>
//         </div>
//       ) : (
//         <p>No plan selected. Please go back and select a plan.</p>
//       )}
//     </form>
//   );
// };
//
// export default RenewForm;
