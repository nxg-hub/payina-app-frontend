import React, { useState } from 'react';
import { Navbar, Sidebar } from '../_components';
import SetupPayroll from './_components/setup-payroll';
import PayrollSubmit from './_components/payrollSubmit';
import PayrollView from './_components/PayrollView';

const Payroll = () => {
  const [showPayrollSubmit, setShowPayrollSubmit] = useState(false);
  const [showPayrollView, setShowPayrollView] = useState(false); // New state for PayrollView

  const handleSetupPayrollClick = () => {
    setShowPayrollSubmit(true);
    setShowPayrollView(false); // Reset view to not show PayrollView
  };

  const handleViewPayrollClick = () => {
    setShowPayrollView(true); // Set the state to show PayrollView
    setShowPayrollSubmit(false); // Reset view to not show PayrollSelect
  };

  const handleBackClick = () => {
    setShowPayrollView(false);
    setShowPayrollSubmit(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Sidebar />
      {showPayrollView ? ( // Check for PayrollView first
        <PayrollView onBackClick={handleBackClick} />
      ) : showPayrollSubmit ? (
        <PayrollSubmit />
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
