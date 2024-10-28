import React, { useState } from 'react';
import PayrollDetails from './payroll-details';
import EmployeeDetails from './employee-details';
import payrollDetails from '../../../../assets/images/payroll-job-details.svg';
import employeeDetails from '../../../../assets/images/Group-EmployeeDetails.svg';
import { FaArrowLeft } from 'react-icons/fa';

const PayrollSelect = ({ onBackClick }) => {
  const [selectedForm, setSelectedForm] = useState(null);

  const renderForm = () => {
    switch (selectedForm) {
      case 'employee':
        return <EmployeeDetails />;
      case 'payroll':
        return <PayrollDetails />;
      default:
        return (
          <div className="flex flex-col ml-80 mt-12 justify-center items-start">
            <div className="font-bold text-xl md:text-3xl mt-12">Payroll</div>
            <div className="flex flex-col center mt-5">
              <span className="text-base md:text-xl font-medium">
                Set Up Payroll and Employee Details
              </span>
              <div
                onClick={() => setSelectedForm('employee')}
                className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
                <div className="border border-yellow rounded-full p-3">
                  <img src={employeeDetails} alt="payrollSelect" />
                </div>
                <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                  Employee Details
                </div>
              </div>
              <div
                onClick={() => setSelectedForm('payroll')}
                className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg">
                <div className="border border-yellow rounded-full p-3">
                  <img src={payrollDetails} alt="payrollSelect" />
                </div>
                <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">
                  Payroll/Job Details
                </div>
              </div>
            </div>
            <div
              onClick={onBackClick}
              className="flex flex-row gap-2 text-xl items-left justify-center mt-[10rem] cursor-pointer">
              <FaArrowLeft className="text-lightBlue" />
              <span className="text-lightBlue text-xl">Back</span>
            </div>
          </div>
        );
    }
  };

  return <div className="">{renderForm()}</div>;
};

export default PayrollSelect;
