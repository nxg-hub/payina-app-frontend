import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
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



function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoute = location.pathname;
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  // console.log(data);

  // const handleNextStep = (newData) => {
  //   setData((prev) => ({ ...prev, ...newData }));
  //   setCurrentStep((prev) => {
  //     const nextStep = prev + 1;
  //     // Save progress in localStorage
  //     localStorage.setItem('signupStep', nextStep);
  //     return nextStep;
  //   });
  //     };
  useEffect(() => {
    const fetchUserStep = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_REG_LEVEL_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        const savedStep = response.data.registrationLevel;
        console.log(savedStep);

        if (savedStep) {
          setCurrentStep(savedStep);
          if (savedStep < 17) {
            navigate('/signup');
          } else {
            navigate('/account/dashboard');
          }
        }
      } catch (error) {
        console.error('Error fetching user step:', error);
      }
    };

    fetchUserStep();
  }, [navigate]);

  const handleNextStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <UserContext.Provider value={{ data, setData }}>
      <Routes>

        <Route
            path="/signup"
            element={<Signup data={data} currentStep={currentStep} handleNextStep={handleNextStep} />}
        />
        {/*<Route*/}
        {/*  path="/signup"*/}
        {/*  element={<Signup data={data} currentStep={currentStep} handleNextStep={handleNextStep} />}*/}
        {/*/>*/}

         {/* Dynamic route for incomplete signup step */}
  {/*       <Route*/}
  {/*path="/signup"*/}
  {/*element={<Signup data={data} handleNextStep={handleNextStep} />}*/}
  {/*      />*/}
        <Route path="/paybills" element={<Paybills />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account/dashboard" element={<Dashboard />} />
        <Route path="/account/invoice" element={<Invoice />} />
        <Route path="invoice/createinvoice" element={<Createinvoice />} />
        <Route path="/account/payroll" element={<Payroll />} />
        <Route path="/account/transaction" element={<Transaction />} />
        <Route path="/account/inventory" element={<Inventory />} />
        <Route path="/account/settings" element={<Settings />} />
        <Route path="/airtime" element={<Airtime />} />
        <Route
          path={currentRoute}
          element={
            currentRoute === '/' ? (
              <PersonalPage />
            ) : currentRoute === '/business' ? (
              <BusinessPage />
            ) : (
              ''
            ) 
          }
        />
      
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
