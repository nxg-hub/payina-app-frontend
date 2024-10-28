import React, { useState, useEffect } from 'react';
import { API_HOST_URL } from '../../../../utils/api/API_HOST';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';

const PayrollView = ({ onBackClick }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [payrollData, setPayrollData] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No auth token found');
        return;
      }
      try {
        const userResponse = await fetch(`${API_HOST_URL}/api/v1/auth/get-user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const userData = await userResponse.json();
        setCustomerId(userData.customerId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!customerId) return;

    const fetchPayrollData = async () => {
      try {
        const employeeResponse = await fetch(
          `${API_HOST_URL}/api/corporate-customers/${customerId}/employees/all`
        );
        const employeeData = await employeeResponse.json();

        const payrollResponse = await fetch(
          `${API_HOST_URL}/api/employees/payrolls/corporate/${customerId}/payrolls`
        );
        const payrollData = await payrollResponse.json();
        const combinedData = employeeData.map((employee) => {
          const payrollDetails = payrollData.find(
            (payroll) => payroll.employeeId === employee.employeeId
          );
          return {
            ...employee,
            jobRoleTitle: payrollDetails ? payrollDetails.jobRoleTitle : '',
            basicSalary: payrollDetails ? payrollDetails.basicSalary : '',
            allowances: payrollDetails ? payrollDetails.allowances : [],
          };
        });

        setPayrollData(combinedData);
      } catch (error) {
        console.error('Error fetching payroll data:', error);
      }
    };

    fetchPayrollData();
  }, [customerId]);

  const handleSeeMoreClick = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };

  const filteredPayrollData = payrollData.filter(
    (employee) =>
      employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-start w-auto xl:ml-80 xl:pt-28 md:pt-10 mx-auto h-full">
        <div className="flex flex-row justify-center items-left gap-[5rem]">
          <div className="text-xl md:text-3xl font-bold px-6 py-2 md:py-0">Payroll</div>
          <div className="flex flex-row relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Using Name or Company Role"
              className="text-md text-black font-bold py-2 px-8 bg-white rounded shadow-md cursor-pointer w-[560px]"
            />
            <FaSearch className="absolute right-0 mr-4 mt-3 text-lightBlue font-bold" />
          </div>
        </div>
        <div className="grid grid-cols-3 justify-center items-center gap-4 mt-[4rem] px-[5rem] py-2">
          {filteredPayrollData.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col justify-center items-center gap-4 bg-white p-6 rounded shadow-lg">
              <div className="flex flex-col items-start gap-2">
                <h1 className="text-xl font-bold text-lightBlue mb-3">Employee Details</h1>
                <div className="text-sm font-bold">
                  Employee Name: <span className="font-medium">{employee.employeeName}</span>
                </div>
                <div className="text-sm font-bold">
                  Employee Role: <span className="font-medium">{employee.employeeRole}</span>
                </div>
                <div className="text-sm font-bold">
                  Employment Date:{' '}
                  <span className="font-medium">{employee.employmentDetails?.employmentDate}</span>
                </div>
                <div className="text-sm font-bold">
                  Employee Id:{' '}
                  <span className="font-medium">{employee.employmentDetails?.employeeId}</span>
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
                  Employee Role:{' '}
                  <span className="font-medium">{selectedEmployee.employeeRole}</span>
                </div>
                <div className="text-sm font-bold">
                  Employment Date:{' '}
                  <span className="font-medium">
                    {selectedEmployee.employmentDetails?.employmentDate}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Employee Id:{' '}
                  <span className="font-medium">
                    {selectedEmployee.employmentDetails?.employeeId}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-xl font-bold text-lightBlue">Account Details</h1>
                <div className="text-sm font-bold">
                  Name Of Bank:{' '}
                  <span className="font-medium">{selectedEmployee.accountDetails?.nameOfBank}</span>
                </div>
                <div className="text-sm font-bold">
                  Account Number:{' '}
                  <span className="font-medium">
                    {selectedEmployee.accountDetails?.accountNumber}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Payment Frequency:{' '}
                  <span className="font-medium">
                    {selectedEmployee.accountDetails?.paymentFrequency}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Automatic Payment:{' '}
                  <span className="font-medium">
                    {selectedEmployee.accountDetails?.automaticPayment ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-xl font-bold text-lightBlue">Payroll Details</h1>
                <div className="text-sm font-bold">
                  Job Role/Title:{' '}
                  <span className="font-medium">{selectedEmployee.jobRoleTitle}</span>
                </div>
                <div className="text-sm font-bold">
                  Basic Salary: <span className="font-medium">{selectedEmployee.basicSalary}</span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <h1 className="text-md font-bold text-lightBlue">Allowances</h1>
                  {selectedEmployee.allowances.map((allowance, index) => (
                    <div key={index}>
                      <div className="text-sm font-bold">
                        Allowance Package Name:{' '}
                        <span className="font-medium">{allowance.allowancePackageName}</span>
                      </div>
                      <div className="text-sm font-bold">
                        Allowance Pay: <span className="font-medium">{allowance.allowancePay}</span>
                      </div>
                    </div>
                  ))}
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
