import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import { images } from '../../../../constants';
import UpdateModal from './UpdateModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayrollData } from '../../../../Redux/payrollSlice';

const PayrollView = ({ onBackClick, onSetupClick }) => {
  const dispatch = useDispatch();
  const payrollData = useSelector((state) => state.payroll.payrollData);
  const loading = useSelector((state) => state.payroll.loading);
  const error = useSelector((state) => state.payroll.error);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [showUpdateOptions, setShowUpdateOptions] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const result = await response.json();
        console.log('Fetched user data:', result);
        setCustomerId(result.customerId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (customerId) {
      dispatch(fetchPayrollData(customerId));
    }
  }, [customerId, dispatch]);

  const handleSeeMoreClick = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };

  useEffect(() => {
    if (!loading) {
      setIsDataFetched(true);
    }
  }, [loading]);

  const filteredPayrollData = payrollData?.filter(
    (employee) =>
      (employee.employeeName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (employee.jobRoleTitle?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleUpdateClick = (employee) => {
    setShowUpdateOptions((prev) => (prev === employee.id ? null : employee.id));
  };
  const openModal = (employee, type) => {
    setSelectedEmployee(employee);
    setModalType(type);
    setIsUpdateModalOpen(true);
    setShowUpdateOptions(null);
  };

  // const filteredPayrollData = payrollData.filter(
  //   (employee) =>
  //     employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     employee.employeeRole.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-start w-auto xl:ml-80 xl:pt-28 md:pt-10 mx-auto h-full">
        <div className="flex flex-row justify-center items-left gap-[5rem]">
          <div className="flex justify-center text-xl md:text-2xl text-lightBlue font-bold px-6 py-2 md:py-0">
            Employee Details
          </div>

          {/* <div className="text-xl md:text-3xl font-bold px-6 py-2 md:py-0">Payroll </div> */}
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

        {loading ? (
          <div className="text-center text-lg">Loading payroll data...</div>
        ) : payrollData && payrollData.length > 0 ? (
          <div className="grid grid-cols-3 justify-center items-center gap-4 mt-[4rem] px-[5rem] py-2">
            {filteredPayrollData.map((employee) => (
              <div
                key={employee.id}
                className="flex flex-col justify-center items-center gap-4 bg-white p-6 rounded shadow-lg">
                <div className="flex flex-col items-start gap-2">
                  <div className="text-sm font-bold">
                    Name: <span className="font-medium">{employee.employeeName}</span>
                  </div>
                  <div className="text-sm font-bold">
                    Role: <span className="font-medium">{employee.employeeRole}</span>
                  </div>
                  <div className="text-sm font-bold">
                    I.D:{' '}
                    <span className="font-medium">{employee.employmentDetails?.employeeId}</span>
                  </div>
                  <div className="text-sm font-bold">
                    Employment Date:{' '}
                    <span className="font-medium">
                      {employee.employmentDetails?.employmentDate?.split('T')[0] || ''}
                    </span>
                  </div>
                </div>
                <div className="mt-1 flex space-x-16">
                  <button
                    className=" text-lightBlue hover:underline"
                    onClick={() => handleSeeMoreClick(employee)}>
                    See More
                  </button>
                  <button
                    className=" text-lightBlue hover:underline"
                    onClick={() => handleUpdateClick(employee)}>
                    {' '}
                    Update
                  </button>
                </div>
                {showUpdateOptions === employee.id && (
                  <div className=" bg-white shadow-md border rounded-lg -mt-1 w-30">
                    <button
                      className="block w-full text-right px-1 py-1 text-lightBlue hover:underline"
                      onClick={() => openModal(employee, 'employee')}>
                      Employee Details
                    </button>
                    <button
                      className="block w-full text-right px-1 py-1 text-lightBlue hover:underline"
                      onClick={() => openModal(employee, 'payroll')}>
                      Payroll Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col center absolute top-[50%] gap-8 left-[50%] xl:translate-x-[36%] md:translate-x-[-50%] translate-x-[-50%] translate-y-[-50%]">
            <img src={images.PayrollIcon} alt="" />
            <h3 className="text-black font-bold text-md">
              No Payroll yet?{' '}
              <span className="text-lightBlue cursor-pointer" onClick={onSetupClick}>
                Set up Payroll
              </span>
            </h3>
          </div>
        )}

        {isModalOpen && selectedEmployee && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto p-4">
            <div className="bg-white p-11 rounded shadow-lg w-[500px] max-h-[90%] overflow-y-auto">
              <h1 className="text-xl font-bold text-lightBlue">Employee Details</h1>
              <div className="flex flex-col gap-2 mt-4">
                <div className="text-sm font-bold">
                  Name: <span className="font-medium">{selectedEmployee.employeeName}</span>
                </div>
                <div className="text-sm font-bold">
                  Role: <span className="font-medium">{selectedEmployee.employeeRole}</span>
                </div>
                <div className="text-sm font-bold">
                  Employment Date:{' '}
                  <span className="font-medium">
                    {new Date(
                      selectedEmployee.employmentDetails?.employmentDate
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Employee Id:{' '}
                  <span className="font-medium">
                    {selectedEmployee.employmentDetails?.employeeId}
                  </span>
                </div>
                <div className="text-sm font-bold">
                  Email:{' '}
                  <span className="font-medium">{selectedEmployee.employeeEmailAddress}</span>
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
                <div className="text-sm font-bold">
                  Payment Day Of The Week:{' '}
                  <span className="font-medium">{selectedEmployee.accountDetails?.paymentDay}</span>
                </div>
                <div className="text-sm font-bold">
                  Payment Date Of The Month:{' '}
                  <span className="font-medium">
                    {selectedEmployee.accountDetails?.paymentDayOfMonth}
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
                  {selectedEmployee.allowances &&
                    selectedEmployee.allowances.map((allowance, index) => (
                      <div key={index}>
                        <div className="text-sm font-bold">
                          Allowance Package Name:{' '}
                          <span className="font-medium">
                            {allowance.allowancePackageName || 'none'}
                          </span>
                        </div>
                        <div className="text-sm font-bold">
                          Allowance Pay:{' '}
                          <span className="font-medium">
                            {allowance.allowancePay || 'No allowance pay'}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <h1 className="text-md font-bold text-lightBlue">Deductions</h1>
                  {selectedEmployee.deductions &&
                    selectedEmployee.deductions.map((deduction, index) => (
                      <div key={index}>
                        <div className="text-sm font-bold">
                          Deduction Package Name:{' '}
                          <span className="font-medium">
                            {deduction.deductionPackageName || 'none'}
                          </span>
                        </div>
                        <div className="text-sm font-bold">
                          Deduction Amount:{' '}
                          <span className="font-medium">
                            {deduction.deductionAmount || 'No deduction'}
                          </span>
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
        className="flex flex-row gap-2 text-xl items-left justify-left ml-80 mt-[20rem] cursor-pointer">
        <FaArrowLeft className="text-lightBlue" />
        <span className="text-lightBlue text-xl">Back</span>
      </div>

      {isUpdateModalOpen && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          employee={selectedEmployee}
          customerId={customerId}
          type={modalType}
        />
      )}
    </div>
  );
};

export default PayrollView;
