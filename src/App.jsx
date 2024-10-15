import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import Card from './pages/card/Card';
import Ren from './pages/ren/Ren';
import Thanks from './pages/thanks/Thanks';
import Data from './pages/data/Data';
import Planb from './pages/planb/Planb';
import Betone from './pages/betone/Betone';
import Bettwo from './pages/bettwo/Bettwo';
import Befour from './pages/befour/Befour';
import { FormProvider } from './context/formContext';
import ErrorBoundary from './utilities/ErrorBoundaryComponent';
import ReviewOrder from './pages/airtime/ReviewOrder';
import AboutUs from './pages/aboutus/AboutUs';
import ContactUs from './pages/contactus/contactUs';
import Support from './pages/support/support';
import TermsOfService from './pages/terms/TermsOfService';
import UsersPaybill from './pages/Account/users-paybill';
import BillPayment from './pages/Account/users-paybill';
import UserAirtime from './pages/Account/UserPages/airtime';
import UserData from './pages/Account/UserPages/data';
import FundWallet from './pages/airtime/FundWallet';
import Billers from './pages/Account/UserPages/billers';
import Electricity from './pages/Account/UserPages/electricity';
import { StepSeventeen } from './pages/Signup/_components';
// import PaymentPage from './pages/Account/UserPages/fund_wallet';

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

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
      <FormProvider>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/signup"
              element={
                <Signup data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
              }
            />

            <Route
              path="/signup"
              element={<Signup data={data} handleNextStep={handleNextStep} />}
            />
            <Route path="/paybills" element={<Paybills />} />
            {/*<Route path="/account/fund_wallet" element={<PaymentPage />} />*/}
            <Route path="/login" element={<Login />} />
            <Route path="/account/dashboard" element={<Dashboard />} />
            <Route path="/account/invoice" element={<Invoice />} />
            <Route path="/account/step" element={<StepSeventeen />} />
            <Route path="invoice/createinvoice" element={<Createinvoice />} />
            <Route path="/account/payroll" element={<Payroll />} />
            <Route path="/account/transaction" element={<Transaction />} />
            <Route path="/account/inventory" element={<Inventory />} />
            <Route path="/account/settings" element={<Settings />} />
            <Route path="/airtime" element={<Airtime />} />
            <Route path="/account/airtime" element={<UserAirtime />} />
            <Route path="/account/bills" element={<Billers />} />
            <Route path="/account/fund-wallet" element={<FundWallet />} />
            <Route path="/account/data" element={<UserData />} />
            <Route path="/account/billers" element={<BillPayment />} />
            <Route path="/account/electricity" element={<Electricity />} />
            <Route path="/card" element={<Card />} />
            <Route path="/ren" element={<Ren />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/data" element={<Data />} />
            <Route path="/planb" element={<Planb />} />
            <Route path="/betone" element={<Betone />} />
            <Route path="/bettwo" element={<Bettwo />} />
            <Route path="/bills-payment" element={<UsersPaybill />} />
            <Route path="/befour" element={<Befour />} />
            <Route path="/review-airtime-order" element={<ReviewOrder />} />
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
        </ErrorBoundary>
      </FormProvider>
    </UserContext.Provider>
  );
}

export default App;
