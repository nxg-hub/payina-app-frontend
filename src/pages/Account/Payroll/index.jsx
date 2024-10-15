import React, { useState } from 'react';  
import { Navbar, Sidebar } from '../_components';  
import SetupPayroll from './_components/setup-payroll';  
import PayrollSelect from './_components/PayrollSelect';  
import PayrollView from './_components/PayrollView'; 

const Payroll = () => {  
  const [showPayrollSelect, setShowPayrollSelect] = useState(false);  
  const [showPayrollView, setShowPayrollView] = useState(false); // New state for PayrollView  

  const handleSetupPayrollClick = () => {  
    setShowPayrollSelect(true);  
    setShowPayrollView(false); // Reset view to not show PayrollView  
  };  

  const handleViewPayrollClick = () => {  
    setShowPayrollView(true); // Set the state to show PayrollView  
    setShowPayrollSelect(false); // Reset view to not show PayrollSelect  
  };  

    const handleBackClick = () => {
    setShowPayrollView(false);
    setShowPayrollSelect(false);
  };

  return (  
    <div className="flex flex-col h-screen">  
      <Navbar />  
      <Sidebar />
      {showPayrollView ? (  // Check for PayrollView first  
        <PayrollView onBackClick={handleBackClick} />  
      ) : showPayrollSelect ? (  
        <PayrollSelect onBackClick={handleBackClick} />   
      ) : (  
        <SetupPayroll   
          onSetupClick={handleSetupPayrollClick}   
          onViewClick={handleViewPayrollClick} // Pass the view click handler  
        />   
      )} 
    </div>  
  );  
};  

export default Payroll;