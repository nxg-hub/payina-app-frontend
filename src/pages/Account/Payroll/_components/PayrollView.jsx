import React, { useState } from 'react';
import { PayrollData } from '../data.js';
import { FaArrowLeft } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

const PayrollView = ({ onBackClick }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSeeMoreClick = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-start w-auto xl:ml-80 xl:pt-28 md:pt-10 mx-auto h-full">
        <div className="flex flex-row justify-center items-left gap-[5rem]">
          <div className="text-xl md:text-3xl font-bold px-6 py-2 md:py-0">Payroll</div>
          <div className="flex flex-row relative">
            <input
              placeholder="Search Using Name or Company Role"
              className="text-md text-black font-bold py-2 px-8 bg-white rounded shadow-md cursor-pointer w-[560px]"
            />
            <FaSearch className="absolute right-0 mr-4 mt-3 text-lightBlue font-bold" />
          </div>
        </div>
        <div className="grid grid-cols-3 justify-center items-center gap-4 mt-[4rem] px-[5rem] py-2">
          {PayrollData.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col justify-center items-center gap-4 bg-white p-6 rounded shadow-lg">
              <div className="flex flex-col items-start gap-2">
                <h1 className="text-xl font-bold text-lightBlue mb-3">Employee Details</h1>
                <div className="text-sm font-bold">
                  Employee Name: <span className="font-medium">{employee.employeeName}</span>
                </div>
                <div className="text-sm font-bold">
                  Job Role/Title: <span className="font-medium">{employee.jobRoleTitle}</span>
                </div>{' '}
                <div className="text-sm font-bold">
                  Employment Date:{' '}
                  <span className="font-medium">
                    {employee.employmentDetails[0].employmentDate}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Employee Id:{' '}
                  <span className="font-medium">{employee.employmentDetails[0].employmentId}</span>
                </div>
                <div className="text-sm font-bold">
                  Basic Salary: <span className="font-medium">{employee.basicSalary}</span>
                </div>
              </div>
              <button
                className="mt-2 text-lightBlue hover:underline"
                onClick={() => handleSeeMoreClick(employee)}>
                See More
              </button>
            </div>
          ))}
        </div>

        {/* Modal for displaying additional details */}
        {isModalOpen && selectedEmployee && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold">Employee Details</h2>
              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-xl font-bold text-lightBlue">Job Role Details</h1>
                <div className="text-sm font-bold">
                  Employee Name:{' '}
                  <span className="font-medium">{selectedEmployee.employeeName}</span>
                </div>
                <div className="text-sm font-bold">
                  Job Role/Title:{' '}
                  <span className="font-medium">{selectedEmployee.jobRoleTitle}</span>
                </div>
                <div className="text-sm font-bold">
                  Employee Role:{' '}
                  <span className="font-medium">{selectedEmployee.employeeRole}</span>
                </div>
                <div className="text-sm font-bold">
                  Employment Date:{' '}
                  <span className="font-medium">
                    {selectedEmployee.employmentDetails[0].employmentDate}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Employee Id:{' '}
                  <span className="font-medium">
                    {selectedEmployee.employmentDetails[0].employmentId}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Basic Salary: <span className="font-medium">{selectedEmployee.basicSalary}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-xl font-bold text-lightBlue">Allowances</h1>
                <div className="text-sm font-bold">
                  Allowance Package Name:{' '}
                  <span className="font-medium">
                    {selectedEmployee.allowances[0].allowancePackageName}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Allowance Pay:{' '}
                  <span className="font-medium">{selectedEmployee.allowances[0].allowancePay}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-xl font-bold text-lightBlue">Account Details</h1>
                <div className="text-sm font-bold">
                  Name Of Bank:{' '}
                  <span className="font-medium">
                    {selectedEmployee.accountDetails[0].nameOfBank}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Account Number:{' '}
                  <span className="font-medium">
                    {selectedEmployee.accountDetails[0].accountNumber}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Payment Frequency:{' '}
                  <span className="font-medium">
                    {selectedEmployee.accountDetails[0].PaymentFrequency}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Automatic Payment:{' '}
                  <span className="font-medium">
                    {selectedEmployee.accountDetails[0].automaticPayment}
                  </span>
                </div>
              </div>

              <button
                className="mt-4 bg-lightBlue text-white px-4 py-2 rounded"
                onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        onClick={onBackClick}
        className="flex flex-row gap-2 text-xl items-left justify-left ml-80 mt-[5rem] cursor-pointer">
        <FaArrowLeft className="text-lightBlue" />
        <span className="text-lightBlue text-xl">Back</span>
      </div>
    </div>
  );
};

export default PayrollView;
