import React, { useState } from 'react';
import { Navbar, Sidebar } from '../_components';
import SetupPayroll from './_components/setup-payroll';
import PayrollSubmit from './_components/payrollSubmit';
import PayrollView from './_components/PayrollView';

const Payroll = () => {
  const [showPayrollSubmit, setShowPayrollSubmit] = useState(false);
  const [showPayrollView, setShowPayrollView] = useState(false);
  const handleSetupPayrollClick = () => {
    setShowPayrollSubmit(true);
    setShowPayrollView(false);
  };

  /* handle view payroll click */
  const handleViewPayrollClick = () => {
    setShowPayrollView(true);
    setShowPayrollSubmit(false);
  };

  const handleBackClick = () => {
    setShowPayrollView(false);
    setShowPayrollSubmit(false);
  };

  const handleSuccess = () => {
    setShowPayrollSubmit(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Sidebar />
      {showPayrollView ? (
        <PayrollView onBackClick={handleBackClick} />
      ) : showPayrollSubmit ? (
        <PayrollSubmit onSuccess={handleSuccess} />
      ) : (
        <SetupPayroll onSetupClick={handleSetupPayrollClick} onViewClick={handleViewPayrollClick} />
      )}
    </div>
  );
};

export default Payroll;
