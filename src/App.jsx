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
import SendMoney from './pages/SendMoney/index';
import AddMoney from './pages/AddMoney/index.jsx';
import Airtime from './pages/airtime/Airtime';
import Card from './pages/card/Card';
import Ren from './pages/ren/Ren';
import Thanks from './pages/thanks/Thanks';
import Data from './pages/data/Data';
import Planb from './pages/planb/Planb.jsx';
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
import TransactionHistory from './pages/Account/Dashboard/_components/transaction-history/transaction-history.jsx';
import BillerDetails from './pages/Account/UserPages/billerDetails.jsx';
// import PlansReview from './pages/befour/PlansReview.jsx';
import BillerPlans from './pages/Account/UserPages/billerPlans.jsx';
import AddInventory from './pages/Account/Inventory/AddInventory.jsx';
import PersonalLogin from './pages/PersonalLogin/index.jsx';
import PersonalSignup from './pages/PersonalSignup/index.jsx';
// import PaymentPage from './pages/Account/UserPages/fund_wallet';
// import Register from './pages/PersonalSignup/Register.jsx';
import PersonalDashboard from './pages/Account/PersonalDashboard/index.jsx';
import Onboarding from './pages/Onboarding/Onboarding.jsx';
// import { StepEight } from './pages/PersonalSignup/_components/step-eight.jsx';
import TierTwo from './pages/PersonalSignup/upgrade/tier-two.jsx';
import More from './pages/More/More.jsx';
import TierOne from './pages/PersonalSignup/id-verification/tier-one.jsx';
import { VirtualCards } from './pages/Cards/pages/VirtualCards.jsx';
import ForgotPassword from './pages/forgotPassword/ForgotPassword.jsx';
import PasswordOtpValidate from './pages/ValidatePasswordOtp/PasswordOtpValidate.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
import SwitchAccount from './pages/More/SwitchAccount.jsx';
import AccountLimits from './pages/More/Limits.jsx';
import Terms from './pages/More/Terms.jsx';
import EmailVerification from './pages/Onboarding/EmailVerification.jsx';

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
            <Route
              path="/upgrade"
              element={
                <TierTwo data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
              }
            />
            <Route
              path="/upgrade"
              element={<TierTwo data={data} handleNextStep={handleNextStep} />}
            />
            <Route path="/paybills" element={<Paybills />} />
            Payina-in-app-transaction-one
            {/*<Route path="/account/fund_wallet" element={<PaymentPage />} />*/}
            <Route path="/sendMoney" element={<SendMoney />} />
            <Route path="/addMoney" element={<AddMoney />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/account/dashboard" element={<Dashboard />} />
            <Route path="/personal/dashboard" element={<PersonalDashboard />} />
            <Route path="/account/onboarding" element={<Onboarding />} />
            <Route path="/onboarding/email_verification" element={<EmailVerification />} />
            <Route path="/account/invoice" element={<Invoice />} />
            <Route path="invoice/createinvoice" element={<Createinvoice />} />
            <Route path="/account/payroll" element={<Payroll />} />
            <Route path="/account/transaction" element={<Transaction />} />
            <Route path="/account/inventory" element={<Inventory />} />
            <Route path="/account/inventoryAdd" element={<AddInventory />} />
            <Route path="/account/more" element={<More />} />
            <Route path="/account/switch" element={<SwitchAccount />} />
            <Route path="/account/settings" element={<Settings />} />
            <Route path="/account/airtime" element={<UserAirtime />} />
            <Route path="/airtime" element={<Airtime />} />
            <Route path="/account/bills" element={<Billers />} />
            <Route path="/account/bills/details" element={<BillerDetails />} />
            <Route path="/account/bills/plans" element={<BillerPlans />} />
            <Route path="/account/fund-wallet" element={<FundWallet />} />
            <Route path="/account/transaction-history" element={<TransactionHistory />} />
            <Route path="/account/data" element={<UserData />} />
            <Route path="/account/billers" element={<BillPayment />} />
            <Route path="/account/electricity" element={<Electricity />} />
            <Route path="/personal/cards" element={<VirtualCards />} />
            <Route path="/personal/login" element={<PersonalLogin />} />
            <Route path="/personal/signup" element={<PersonalSignup />} />
            <Route path="/verify" element={<TierOne />} />
            <Route path="/ren" element={<Ren />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/account-limits" element={<AccountLimits />} />
            <Route path="/support" element={<Support />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/validate-otp" element={<PasswordOtpValidate />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/data" element={<Data />} />
            <Route path="/plans/review" element={<Planb />} />
            <Route path="/bills" element={<Betone />} />
            <Route path="/bills/plans" element={<Bettwo />} />
            <Route path="/bills-payment" element={<UsersPaybill />} />
            <Route path="/bills/review" element={<Befour />} />
            {/*<Route path="/bills/review" element={<PlansReview />} />*/}
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
