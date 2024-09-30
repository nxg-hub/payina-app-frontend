// import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import useAxios from '../../hooks/useAxios';
// import PlanItem from '../../utilities/PlanItem';
//
// const Plans = () => {
//   const { response, error, loading, fetchData } = useAxios();
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState('');
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//
//   const phoneNumber = location.state?.phoneNumber || '';
//   const selectedNetwork = searchParams.get('network') || 'MTN_NIGERIA';
//
//   useEffect(() => {
//     const fetchPost = () => {
//       const formattedUrl = selectedNetwork.replace(' ', '_');
//       fetchData({
//         method: 'GET',
//         url: `/package-enquiry-slug/${formattedUrl}`,
//         headers: {
//           'Cache-Control': 'no-cache',
//           Pragma: 'no-cache'
//         }
//       });
//     };
//     fetchPost();
//   }, [selectedNetwork]);
//
//   useEffect(() => {
//     if (response) {
//       setPlans(response.responseData || []);
//     }
//   }, [response]);
//
//   if (loading) return <p>Loading plans...</p>;
//   if (error) return <p>Error loading plans: {error}</p>;
//
//   const handlePlanSelect = (e) => {
//     setSelectedPlan(e.target.value);
//   };
//
//   const handleProceed = () => {
//     if (selectedPlan) {
//       const plan = plans.find((plan) => plan.id === selectedPlan);
//       if (plan) {
//         navigate('/planb', { state: { selectedPlan: plan, phoneNumber } });
//       } else {
//         alert('Selected plan is not valid.');
//       }
//     } else {
//       alert('Please select a plan to proceed.');
//     }
//   };
//
//   const displayedPlans = plans.slice(1);
//
//   return (
//     <section>
//       <Navbar />
//       <div className="container">
//         <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
//           Buy Data & get Cashback
//         </p>
//
//         <div className="flex flex-wrap gap-4 mb-10 text-primary">
//           {displayedPlans.map((plan) => (
//             <PlanItem
//               key={plan.id}
//               plan={plan}
//               selectedPlan={selectedPlan}
//               onClick={() => setSelectedPlan(plan.id)}
//             />
//           ))}
//         </div>
//
//         <div className="mb-10">
//           <label htmlFor="planDropdown" className="text-primary">
//             Select a Data Plan:
//           </label>
//           <select
//             id="planDropdown"
//             value={selectedPlan}
//             onChange={handlePlanSelect}
//             className="block w-full mt-2 p-2 border rounded"
//           >
//             <option value="">Select a plan</option>
//             {displayedPlans.map((plan) => (
//               <option key={plan.id} value={plan.id}>
//                 {plan.name} - NGN {plan.amount || 'N/A'}
//               </option>
//             ))}
//           </select>
//         </div>
//
//         <button
//           onClick={handleProceed}
//           disabled={!selectedPlan}
//           className={`text-primary mb-10 mt-5 text-left px-16 py-4 border-none rounded-[5px] ${selectedPlan ? 'bg-lightBlue cursor-pointer hover:bg-neutral' : 'bg-gray-300 cursor-not-allowed'} transition-all duration-200`}
//         >
//           Proceed
//         </button>
//
//         <Footer />
//       </div>
//     </section>
//   );
// };
//
// export default Plans;
