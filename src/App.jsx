import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PersonalPage from './pages/Personal';
import BusinessPage from './pages/Business';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { UserContext } from './context/context';

function App() { 
  const location = useLocation();
  const currentRoute = location.pathname;
  const [data, setData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  console.log(data);

  const handleNextStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };


  return (
    <UserContext.Provider value={{data, setData}}>
      <Routes>
        <Route path="/signup" element={<Signup data={data} currentStep={currentStep} handleNextStep={handleNextStep} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
