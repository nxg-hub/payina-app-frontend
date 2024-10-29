import React, { useState, useEffect } from 'react';
import PayrollDetails from './payroll-details';
import EmployeeDetails from './employee-details';

const PayrollSubmit = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [payrollDetails, setPayrollDetails] = useState({});
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      console.log('token:', token);

      if (!token) {
        console.error('No auth token found');
        return;
      }
      try {
        const response = await fetch(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleEmployeeSave = async (data) => {
    try {
      if (!customerId) {
        console.error('Customer ID is missing');
        return;
      }

      const endpoint = `${import.meta.env.VITE_ADD_EMPLOYEE_ENDPOINT}${customerId}/add`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Customer-ID': customerId,
        },
        body: JSON.stringify(data, employeeId),
      });
      console.log('Payroll save for Employee ID:', employeeId),
        alert('employee details sent successfully');
      console.log('employee details sent successfully');
      console.log('Response Status:', response.status);
      const responseBody = await response.text();
      console.log('Response Body:', responseBody);
      console.log('Customer ID:', customerId);

      if (!response.ok) {
        console.error('Failed to save employee details');
        return;
      }

      if (responseBody) {
        const result = JSON.parse(responseBody);
        console.log('Employee ID:', result.id);
        setEmployeeId(result.id);
        setStep(2);
      } else {
        console.error('Invalid or empty response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePayrollSave = async (data) => {
    try {
      if (!employeeId) {
        console.error('Employee ID is missing');
        return;
      }

      const endpoint = `${import.meta.env.VITE_ADD_PAYROLL_ENDPOINT}${employeeId}/add`;

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

      const textResult = await response.text();
      if (textResult) {
        const result = JSON.parse(textResult);
        alert('Payroll details saved successfully');
        onSuccess();
        console.log('Payroll details saved successfully');
      } else {
        console.error('Empty or invalid JSON response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto">
      {step === 1 && (
        <EmployeeDetails
          onSave={(data) => {
            setEmployeeDetails(data);
            handleEmployeeSave(data);
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
