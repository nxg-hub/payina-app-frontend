import { useState } from 'react';
import { Navbar, Sidebar } from '../_components';
import SetupPayroll from './_components/setup-payroll';
import PayrollDetails from './_components/payroll-details';

const Payroll = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState();
  console.log(data);
  const handleNextStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };

  const steps = [<SetupPayroll next={handleNextStep} />, <PayrollDetails next={handleNextStep} />];

  return (
    <div className="bg-primary">
      <Navbar />
      <Sidebar />
      {steps[currentStep]}
    </div>
  );
};

export default Payroll;
