import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PersonalPage from './pages/Personal';
import BusinessPage from './pages/Business';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { UserContext } from './context/context';
import Dashboard from './pages/Account/Dashboard';
import Invoice from './pages/Account/Invoice';
import Payroll from './pages/Account/Payroll';
import Transaction from './pages/Account/Transaction';
import Inventory from './pages/Account/Inventory';
import Settings from './pages/Account/Settings';
import Createinvoice from './pages/Account/Invoice/_components/Createinvoice';
import Paybills from './pages/paybills/Paybills';
import Airtime from './pages/airtime/Airtime';
import axios from 'axios';

const REGISTRATION_LEVELS = {
  BVN_VERIFICATION_DOCUMENT_UPLOAD: 0,
  BVN_DETAILS_CONFIRMATION: 1,
  FACIAL_CAPTURE_AND_UPLOAD: 2,
  CORPORATE_PROFILE_UPDATE: 3,
  SET_TRANSACTION_PIN: 4,
  KYC_COMPLETED: 5,
  // Add more mappings if necessary
};

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(null); // Changed to null for better control

  useEffect(() => {
    const fetchUserStep = async () => {
      try {
        const token = localStorage.getItem('authToken');

        // Check if token exists and fetch user step only if token is present
        if (token) {
          const response = await axios.get(import.meta.env.VITE_REG_LEVEL_ENDPOINT, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const registrationLevel = response.data;
          console.log('registrationLevel:', registrationLevel); // Debugging line

          // Convert registration level string to step index
          const savedStep = REGISTRATION_LEVELS[registrationLevel] || 0;

          console.log('savedStep:', savedStep); // Debugging line

          setCurrentStep(savedStep);

          // Navigate based on the step
          if (savedStep < 17) {
            navigate('/signup');
          } else {
            navigate('/account/dashboard');
          }
        } else {
          // No token, allow access to public routes
          setCurrentStep(null); // Indicate that current step is not determined
        }
      } catch (error) {
        console.error('Error fetching user step:', error);
        // Handle error appropriately; could redirect to login if necessary
      }
    };

    fetchUserStep();
  }, [navigate]);

  // Handle currentStep being null (loading state)
  if (currentStep === null) {
    return <div>Loading...</div>;
  }

  return (
      <UserContext.Provider value={{ data, setData }}>
        <Routes>
          <Route path="/" element={<PersonalPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/signup" element={<Signup data={data} currentStep={currentStep} handleNextStep={handleNextStep} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account/dashboard" element={<Dashboard />} />
          <Route path="/account/invoice" element={<Invoice />} />
          <Route path="/invoice/createinvoice" element={<Createinvoice />} />
          <Route path="/account/payroll" element={<Payroll />} />
          <Route path="/account/transaction" element={<Transaction />} />
          <Route path="/account/inventory" element={<Inventory />} />
          <Route path="/account/settings" element={<Settings />} />
          <Route path="/paybills" element={<Paybills />} />
          <Route path="/airtime" element={<Airtime />} />
        </Routes>
      </UserContext.Provider>
  );
}

export default App;


// import React, { useEffect, useState } from 'react';
// import { Routes, Route, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
// import PersonalPage from './pages/Personal';
// import BusinessPage from './pages/Business';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import { UserContext } from './context/context';
// import Dashboard from './pages/Account/Dashboard';
// import Invoice from './pages/Account/Invoice';
// import Payroll from './pages/Account/Payroll';
// import Transaction from './pages/Account/Transaction';
// import Inventory from './pages/Account/Inventory';
// import Settings from './pages/Account/Settings';
// import Createinvoice from './pages/Account/Invoice/_components/Createinvoice';
// import Paybills from './pages/paybills/Paybills';
// import Airtime from './pages/airtime/Airtime';
// import axios from 'axios';
//
// const REGISTRATION_LEVELS = {
//   BVN_VERIFICATION_DOCUMENT_UPLOAD: 0,
//   BVN_DETAILS_CONFIRMATION: 1,
//   FACIAL_CAPTURE_AND_UPLOAD: 2,
//   CORPORATE_PROFILE_UPDATE: 3,
//   SET_TRANSACTION_PIN: 4,
//   KYC_COMPLETED: 5,
//   // Add more mappings if necessary
// };
//
//
//
// function App() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const currentRoute = location.pathname;
//   const [data, setData] = useState({});
//   const [currentStep, setCurrentStep] = useState(0);
//   // console.log(data);
//
//   // const handleNextStep = (newData) => {
//   //   setData((prev) => ({ ...prev, ...newData }));
//   //   setCurrentStep((prev) => {
//   //     const nextStep = prev + 1;
//   //     // Save progress in localStorage
//   //     localStorage.setItem('signupStep', nextStep);
//   //     return nextStep;
//   //   });
//   //     };
//   useEffect(() => {
//     const fetchUserStep = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           // No token, handle unauthenticated state (e.g., redirect to landing page)
//           navigate('/');
//           return;
//         }
//         const response = await axios.get(import.meta.env.VITE_REG_LEVEL_ENDPOINT, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//           },
//         });
//
//         const registrationLevel = response.data;
//         console.log('registrationLevel:', registrationLevel); // Debugging line
//
//         // Convert registration level string to step index
//         const savedStep = REGISTRATION_LEVELS[registrationLevel] || 0;
//
//         console.log('savedStep:', savedStep); // Debugging line
//
//         setCurrentStep(savedStep);
//
//         // Navigate based on the step
//         if (savedStep < 17) {
//           navigate('/signup');
//         } else {
//           navigate('/account/dashboard');
//         }
//       } catch (error) {
//         console.error('Error fetching user step:', error);
//         navigate('/signup'); // Default to signup if there's an error
//       }
//     };
//
//     fetchUserStep();
//   }, [navigate]);
//
//   const handleNextStep = (newData) => {
//     setData((prev) => ({ ...prev, ...newData }));
//     setCurrentStep((prev) => prev + 1);
//   };
//
//   return (
//     <UserContext.Provider value={{ data, setData }}>
//       <Routes>
//
//         <Route
//             path="/signup"
//             element={<Signup data={data} currentStep={currentStep} handleNextStep={handleNextStep} />}
//         />
//         {/*<Route*/}
//         {/*  path="/signup"*/}
//         {/*  element={<Signup data={data} currentStep={currentStep} handleNextStep={handleNextStep} />}*/}
//         {/*/>*/}
//
//          {/* Dynamic route for incomplete signup step */}
//   {/*       <Route*/}
//   {/*path="/signup"*/}
//   {/*element={<Signup data={data} handleNextStep={handleNextStep} />}*/}
//   {/*      />*/}
//         <Route path="/paybills" element={<Paybills />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/account/dashboard" element={<Dashboard />} />
//         <Route path="/account/invoice" element={<Invoice />} />
//         <Route path="invoice/createinvoice" element={<Createinvoice />} />
//         <Route path="/account/payroll" element={<Payroll />} />
//         <Route path="/account/transaction" element={<Transaction />} />
//         <Route path="/account/inventory" element={<Inventory />} />
//         <Route path="/account/settings" element={<Settings />} />
//         <Route path="/airtime" element={<Airtime />} />
//         <Route
//           path={currentRoute}
//           element={
//             currentRoute === '/' ? (
//               <PersonalPage />
//             ) : currentRoute === '/business' ? (
//               <BusinessPage />
//             ) : (
//               ''
//             )
//           }
//         />
//
//       </Routes>
//     </UserContext.Provider>
//   );
// }
//
// export default App;
