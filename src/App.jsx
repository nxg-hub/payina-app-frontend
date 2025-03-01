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
import PersonalDashboard from './pages/Account/PersonalDashboard/index.jsx';
import Onboarding from './pages/Onboarding/Onboarding.jsx';
import TierTwo from './pages/PersonalSignup/upgrade/tier-two.jsx';
import More from './pages/More/index.jsx';
import TierOne from './pages/PersonalSignup/id-verification/tier-one.jsx';
import Scan from './pages/Scan/scan.jsx';
import ForgotPassword from './pages/forgotPassword/ForgotPassword.jsx';
import PasswordOtpValidate from './pages/ValidatePasswordOtp/PasswordOtpValidate.jsx';
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx';
// import SwitchAccount from './pages/More/SwitchAccount.jsx';
// import AccountLimits from './pages/More/Limits.jsx';
// import Terms from './pages/More/Terms.jsx';
import EmailVerification from './pages/Onboarding/EmailVerification.jsx';
import Loader from './assets/LoadingSpinner.jsx';
import ProtectedRoute from './utilities/ProtectedRoute.jsx';
import AccountStatement from './pages/Account/Transaction/_components/AccountStatement.jsx';
import Vend from './pages/vend/Vend.jsx';
import PayinaQRTransfer from './pages/Scan/payina_to_payina.jsx';
import TransferSuccess from './pages/TransferSuccess/TransferSuccess.jsx';
import TransferFailed from './pages/TransferFail/TransferFailed.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ContactForm from './pages/contactus/contact.jsx';

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => {
      const nextStep = prev + 1;
      localStorage.setItem('signupStep', nextStep);
      return nextStep;
    });
  };

  return (
    <UserContext.Provider value={{ data, setData }}>
      <FormProvider>
        <ErrorBoundary>
          <Routes>
            {/* Public routes */}
            <Route
              path="/signup"
              element={
                <Signup data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/personal/login" element={<PersonalLogin />} />
            <Route path="/personal/signup" element={<PersonalSignup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/validate-otp" element={<PasswordOtpValidate />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/account/contact-us" element={<ContactForm />} />
            <Route path="/support" element={<Support />} />
            <Route path="/onboarding/email_verification" element={<EmailVerification />} />
            <Route path="/account/onboarding" element={<Onboarding />} />
            <Route path="/paybills" element={<Paybills />} />
            <Route path="/airtime" element={<Airtime />} />
            <Route path="/ren" element={<Ren />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/transferSuccess" element={<TransferSuccess />} />
            <Route path="/transferFailed" element={<TransferFailed />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* <Route path="/terms" element={<Terms />} /> */}
            <Route path="/contact-us" element={<ContactUs />} />
            {/* <Route path="/account-limits" element={<AccountLimits />} /> */}
            <Route path="/support" element={<Support />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/data" element={<Data />} />
            <Route path="/plans/review" element={<Planb />} />
            <Route path="/bills" element={<Betone />} />
            <Route path="/vend" element={<Vend />} />
            <Route path="/bills/plans" element={<Bettwo />} />
            <Route path="/bills-payment" element={<UsersPaybill />} />
            <Route path="/bills/review" element={<Befour />} />
            <Route path="/review-airtime-order" element={<ReviewOrder />} />

            {/* Protected Personal Dashboard Routes */}
            <Route
              path="/personal/dashboard"
              element={
                <ProtectedRoute>
                  <PersonalDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scan/payina-to-payina"
              element={
                <ProtectedRoute>
                  <PayinaQRTransfer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scan"
              element={
                <ProtectedRoute>
                  <Scan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify"
              element={
                <ProtectedRoute>
                  <TierOne />
                </ProtectedRoute>
              }
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

            {/* Protected Business Dashboard Routes */}
            <Route
              path="/account/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/invoice"
              element={
                <ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>
              }
            />
            <Route
              path="invoice/createinvoice"
              element={
                <ProtectedRoute>
                  <Createinvoice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/payroll"
              element={
                <ProtectedRoute>
                  <Payroll />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/transaction"
              element={
                <ProtectedRoute>
                  <Transaction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/statement"
              element={
                <ProtectedRoute>
                  <AccountStatement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/inventory"
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/inventoryAdd"
              element={
                <ProtectedRoute>
                  <AddInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/account/bills"
              element={
                <ProtectedRoute>
                  <Billers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/bills/details"
              element={
                <ProtectedRoute>
                  <BillerDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/bills/plans"
              element={
                <ProtectedRoute>
                  <BillerPlans />
                </ProtectedRoute>
              }
            />

            <Route
              path="/account/more"
              element={
                <ProtectedRoute>
                  <More />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/account/switch"
              element={
                <ProtectedRoute>
                  <SwitchAccount />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/account/bills"
              element={
                <ProtectedRoute>
                  <Billers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/bills/details"
              element={
                <ProtectedRoute>
                  <BillerDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/bills/plans"
              element={
                <ProtectedRoute>
                  <BillerPlans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/fund-wallet"
              element={
                <ProtectedRoute>
                  <FundWallet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/transaction-history"
              element={
                <ProtectedRoute>
                  <TransactionHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/data"
              element={
                <ProtectedRoute>
                  <UserData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/airtime"
              element={
                <ProtectedRoute>
                  <UserAirtime />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/electricity"
              element={
                <ProtectedRoute>
                  <Electricity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/billers"
              element={
                <ProtectedRoute>
                  <BillPayment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute>
                  <ForgotPassword />{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/validate-otp"
              element={
                <ProtectedRoute>
                  <PasswordOtpValidate />{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute>
                  <ResetPassword />{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/sendMoney"
              element={
                <ProtectedRoute>
                  {' '}
                  <SendMoney />{' '}
                </ProtectedRoute>
              }
            />
            <Route
              path="/addMoney"
              element={
                <ProtectedRoute>
                  {' '}
                  <AddMoney />{' '}
                </ProtectedRoute>
              }
            />

            {/* Landing page routes */}
            <Route path="/" element={<PersonalPage />} />
            <Route path="/business" element={<BusinessPage />} />
            {/*<Route*/}
            {/*  path={currentRoute}*/}
            {/*  element={*/}
            {/*    currentRoute === '/' ? (*/}
            {/*      <PersonalPage />*/}
            {/*    ) : currentRoute === '/business' ? (*/}
            {/*      <BusinessPage />*/}
            {/*    ) : (*/}
            {/*      ''*/}
            {/*    )*/}
            {/*  }*/}
            {/*/>*/}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Loader />
        </ErrorBoundary>
      </FormProvider>
    </UserContext.Provider>
  );
}

export default App;
