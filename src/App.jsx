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

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  // console.log(data);

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
        <Route path="/login" element={<Login />} />
        <Route path="/account/dashboard" element={<Dashboard />} />
        <Route path="/account/invoice" element={<Invoice />} />
        <Route path="/account/payroll" element={<Payroll />} />
        <Route path="/account/transaction" element={<Transaction />} />
        <Route path="/account/inventory" element={<Inventory />} />
        <Route path="/account/settings" element={<Settings />} />
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
