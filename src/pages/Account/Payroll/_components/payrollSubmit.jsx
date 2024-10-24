// import React, { useState } from 'react';
// import axios from 'axios';
// import PayrollDetails from './payroll-Details';
// import EmployeeDetails from './employee-Details';

// const PayrollSubmit = () => {
//   const [showPayrollDetails, setShowPayrollDetails] = useState(false);
//   const [employeeData, setEmployeeData] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);  // Store employeeId

//  // Fetch employeeId from the dedicated API
//   const fetchEmployeeId = async () => {
//     try {
//       const response = await axios.get(import.meta.env.VITE_FETCH_EMPLOYEE_ID_ENDPOINT);
      
//       // Log the full response for debugging
//       console.log('Full response:', response);

//       // Assuming employeeId should be in response.data
//       const fetchedEmployeeId = response.data.employementDetails.employeeId;
      
//       // Log employeeId to ensure it's not undefined
//       console.log('Fetched employeeId:', fetchedEmployeeId);
      
//       if (!fetchedEmployeeId) {
//         throw new Error('employeeId is undefined or missing in the API response');
//       }
//       setEmployeeId(fetchedEmployeeId);
//       return fetchedEmployeeId;
//     } catch (error) {
//       console.error('Error fetching employeeId:', error);
//       throw error;
//     }
//   };

//   // Handle form submission for employee details
//   const handleEmployeeSubmit = async (values) => {
//     try {
//       // Fetch employeeId first
//       const fetchedEmployeeId = await fetchEmployeeId();

//       // Append employeeId to the employee details before submission
//       const employeeDataWithId = {
//         employeeId: fetchedEmployeeId,
//         ...values,
//       };

//       // Send employee details to its endpoint
//       const response = await axios.post(import.meta.env.VITE_UPLOAD_EMPLOYEES_FORM_ENDPOINT, employeeDataWithId); // Replace with actual API endpoint
//       console.log('Employee details submitted:', response.data);

//       // Store employeeData for later use in payroll form submission
//       setEmployeeData(employeeDataWithId);

//       // Show payroll details form
//       setShowPayrollDetails(true);
//     } catch (error) {
//       console.error('Error submitting employee details:', error);
//     }
//   };

//   // Handle form submission for payroll details
//   const handlePayrollSubmit = async (payrollValues) => {
//     try {
//       if (!employeeId) {
//         throw new Error('Employee ID is missing.');
//       }

//       // Combine employeeData and payrollData
//       const combinedData = {
//         employeeId,  // Use the previously fetched employeeId
//         ...employeeData,
//         ...payrollValues,
//       };

//       // Send the combined data to the payroll endpoint
//       const response = await axios.post(import.meta.env.VITE_UPLOAD_PAYROLL_FORM_ENDPOINT, combinedData); // Replace with actual API endpoint
//       console.log('Both employee and payroll details submitted:', response.data);
//     } catch (error) {
//       console.error('Error submitting payroll details:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       {showPayrollDetails ? (
//         <PayrollDetails onSubmit={handlePayrollSubmit} />
//       ) : (
//         <EmployeeDetails onSubmit={handleEmployeeSubmit} />
//       )}
//     </div>
//   );
// };

// export default PayrollSubmit;


import React, { useState } from 'react';
import axios from 'axios';
import PayrollDetails from './payroll-Details';
import EmployeeDetails from './employee-Details';

const PayrollSubmit = () => {
  const [showPayrollDetails, setShowPayrollDetails] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);  // Store employeeId

  // Fetch customerId from the get user endpoint
  const fetchCustomerId = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_USER_ENDPOINT);  // Replace with actual endpoint
      const customerId = response.data.customerId;  // Assuming customerId is in response.data
      console.log('Fetched customerId:', customerId);
      if (!customerId) {
        throw new Error('customerId is undefined or missing in the API response');
      }
      return customerId;
    } catch (error) {
      console.error('Error fetching customerId:', error);
      throw error;
    }
  };

  // Add employee and fetch employeeId
  const addEmployeeAndGetEmployeeId = async (customerId) => {
    try {
      const addEmployeeResponse = await axios.post(import.meta.env.VITE_ADD_EMPLOYEE_ENDPOINT, { customerId });  // Replace with actual endpoint
      const employeeId = addEmployeeResponse.data.employeeId;  // Assuming employeeId is returned
      console.log('Added employee and fetched employeeId:', employeeId);
      if (!employeeId) {
        throw new Error('employeeId is undefined or missing in the API response');
      }
      return employeeId;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  };

  // Handle form submission for employee details
  const handleEmployeeSubmit = async (values) => {
    try {
      // Step 1: Fetch customerId
      const customerId = await fetchCustomerId();

      // Step 2: Add employee and fetch employeeId
      const fetchedEmployeeId = await addEmployeeAndGetEmployeeId(customerId);

      // Step 3: Append employeeId to the employee details before submission
      const employeeDataWithId = {
        employeeId: fetchedEmployeeId,
        ...values,
      };

      // Step 4: Send employee details to its endpoint
      const response = await axios.post(import.meta.env.VITE_UPLOAD_EMPLOYEES_FORM_ENDPOINT, employeeDataWithId); // Replace with actual API endpoint
      console.log('Employee details submitted:', response.data);

      // Store employeeData for later use in payroll form submission
      setEmployeeData(employeeDataWithId);
      setEmployeeId(fetchedEmployeeId);  // Save employeeId for later

      // Show payroll details form
      setShowPayrollDetails(true);
    } catch (error) {
      console.error('Error submitting employee details:', error);
    }
  };

  // Handle form submission for payroll details
  const handlePayrollSubmit = async (payrollValues) => {
    try {
      if (!employeeId) {
        throw new Error('Employee ID is missing.');
      }

      // Combine employeeData and payrollData
      const combinedData = {
        employeeId,  // Use the previously fetched employeeId
        ...employeeData,
        ...payrollValues,
      };

      // Send the combined data to the payroll endpoint
      const response = await axios.post(import.meta.env.VITE_UPLOAD_PAYROLL_FORM_ENDPOINT, combinedData); // Replace with actual API endpoint
      console.log('Both employee and payroll details submitted:', response.data);
    } catch (error) {
      console.error('Error submitting payroll details:', error);
    }
  };

  return (
    <div className="container mx-auto">
      {showPayrollDetails ? (
        <PayrollDetails onSubmit={handlePayrollSubmit} />
      ) : (
        <EmployeeDetails onSubmit={handleEmployeeSubmit} />
      )}
    </div>
  );
};

export default PayrollSubmit;
