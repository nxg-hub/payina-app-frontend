import React, { useState, useEffect } from 'react';
import PayrollDetails from './payroll-details';
import EmployeeDetails from './employee-details';
// import { useDispatch } from "react-redux";
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
// import { showLoading, hideLoading } from '../../../../Redux/loadingSlice.jsx'

const PayrollSubmit = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [payrollDetails, setPayrollDetails] = useState({});
  const [customerId, setCustomerId] = useState(null);
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [email, setEmail] = useState(null);
  const [walletId, setWalletId] = useState(null);
  // const dispatch = useDispatch();


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

        console.log('Fetched user data:', result.email, result.walletId);

        setCustomerId(result.customerId);
        setEmail(result.email);
        setWalletId(result.walletId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } 
    };
    fetchUserData();
  }, []);

  const handleEmployeeSave = async (data, employersEmailAddress, corporateCustomerWalletId) => {
    try {
      if (!customerId) {
        console.error('Customer ID is missing');
        return;
      }

      const endpoint = import.meta.env.VITE_ADD_EMPLOYEE_ENDPOINT.replace(
        '{customerId}',
        customerId
      );
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Customer-ID': customerId,
        },
        body: JSON.stringify({
          ...data,
          employersEmailAddress, 
        corporateCustomerWalletId, 
        }),
      });

      if (!response.ok) {
        console.error('Failed to save employee details');
        return;
      }

      const responseBody = await response.json();
      

      if (responseBody) {
        console.log('Employee ID:', responseBody.id);
        setEmployeeId(responseBody.id);
        setStep(2);
      } else {
        console.error('Invalid or empty response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePayrollSave = async (data) => {
    // dispatch(showLoading()); // Show Loader

    try {
      if (!employeeId) {
        console.error('Employee ID is missing');
        return;
      }

      const endpoint = import.meta.env.VITE_ADD_PAYROLL_ENDPOINT.replace(
        '{employeeId}',
        employeeId
      );
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          employeeId,
        }),
      });

      if (!response.ok) {
        console.error('Failed to save payroll details');
        return;
      }

      const result = await response.json();
      onSuccess();
      console.log('Payroll details saved successfully');
    } catch (error) {
      console.error('Error:', error);
    // }finally {
    //   dispatch(hideLoading()); // Hide Loader
    }
  };

  return (
    <div className="container mx-auto">
      {step === 1 && (
        <EmployeeDetails
        onSave={(data) => {
          setEmployeeDetails(data); 
          handleEmployeeSave(data, email, walletId); 
        }}
        />
      )}
      {step === 2 && employeeId && (
        <PayrollDetails
          employeeId={employeeId}
          onSave={(data) => {
            setPayrollDetails(data);
            handlePayrollSave(data);
          }}
        />
      )}
    </div>
  );
};

export default PayrollSubmit;
