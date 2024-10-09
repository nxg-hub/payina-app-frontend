import { useState } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
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
import ChooseNetwork from './pages/chooseNetwork/ChooseNetwork';
import ReviewAirtime from './pages/reviewAirtime/ReviewAirtime';
import Thanks from './pages/thanks/Thanks';
import Data from './pages/data/Data';
import Plans from './pages/plans/Plans';
import Planb from './pages/planb/Planb';
import Review from './pages/review/Review';
import {useAuth} from "./useAuth";
import ChooseBill from './pages/chooseBill/ChooseBill';
import BillPlatforms from './pages/billPlatforms/BillPlatforms';
import ConfirmOrder from './pages/confirmOrder/ConfirmOrder';
import ReviewOrder from './pages/reviewOrder/ReviewOrder';



function App() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  // console.log(data);

  const handleNextStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => {
      const nextStep = prev + 1;
      // Save progress in localStorage
      localStorage.setItem('signupStep', nextStep);
      return nextStep;
    });
      };


  return (
    <UserContext.Provider value={{ data, setData }}>
      <Routes>
        <Route
          path="/signup"
          element={<Signup data={data} currentStep={currentStep} handleNextStep={handleNextStep} />}
        />

        
         <Route
         path="/signup"
         element={<Signup data={data} handleNextStep={handleNextStep} />}
        />
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
        <Route path="/chooseNetwork" element={<ChooseNetwork />} />
        <Route path="/reviewAirtime"  element={<ReviewAirtime />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/data" element={<Data />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/planb" element={<Planb />} />
        <Route path="/review" element={<Review />} />
        <Route path="/chooseBill" element={<ChooseBill/>} />
        <Route path="/billPlatforms" element={<BillPlatforms />} />
        <Route path="/confirmOrder" element={<ConfirmOrder />} />
        <Route path="/reviewOrder" element={<ReviewOrder />} />
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
