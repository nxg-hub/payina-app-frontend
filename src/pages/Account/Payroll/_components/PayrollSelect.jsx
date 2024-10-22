// import React, { useState } from 'react';
// import PayrollDetails from './payroll-details'; // Adjust the import according to your file structure
// import EmployeeDetails from './employee-details'; // Adjust the import according to your file structure
// import payrollDetails from '../../../../assets/images/payroll-job-details.svg';
// import employeeDetails from '../../../../assets/images/Group-EmployeeDetails.svg';
// import { FaArrowLeft } from "react-icons/fa";

// const PayrollSelect = ({onBackClick}) => {
//   const [selectedForm, setSelectedForm] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employeeData, setEmployeeData] = useState({});
  
//   // Handle EmployeeDetails form submission
//   const handleEmployeeSubmit = async (employeeDetailsData) => {
//     try {
//       const response = await fetch(import.meta.env.VITE_UPLOAD_EMPLOYEES_FORM_ENDPOINT,
//        {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(employeeDetailsData),
//       });
//       const data = await response.json();
//       if (data && data.employeeId) {
//         setEmployeeId(data.employeeId); // Save employeeId for the payroll form
//         setEmployeeData(employeeDetailsData); // Save employee data for later
//         setSelectedForm('payrollDetails'); // Move to the next form
//       }
//     } catch (error) {
//       console.error('Error submitting employee details:', error);
//     }
//   };

//   // Handle PayrollDetails form submission
//   const handlePayrollSubmit = async (payrollDetailsData) => {
//     try {
//       const completeData = { ...payrollDetailsData, ...employeeData, employeeId };
//       console.log(completeData); // Merge employee and payroll data
//       const response = await fetch(import.meta.env.VITE_UPLOAD_PAYROLL_FORM_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(completeData),
//       });
//       const data = await response.json();
//       console.log('payroll uploaded sucessfully');
//       alert('payroll uloaded sucessfully');
//       // Handle success or errors here (e.g., showing success message, redirect, etc.)
//     } catch (error) {
//       console.error('Error submitting payroll details:', error);
//     }
//   };

//   const renderForm = () => {
//     switch (selectedForm) {
//       case 'employee':
//         return <EmployeeDetails onSubmit={handleEmployeeSubmit} />;
//       case 'payroll':
//         return <PayrollDetails onSubmit={handlePayrollSubmit} />;
//       default:
//         return (
//           <div className="flex flex-col ml-80 mt-12 justify-center items-start">
//           <div className="font-bold text-xl md:text-3xl mt-12">Payroll</div>
//           <div className="flex flex-col center mt-5">
//             <span className="text-base md:text-xl font-medium">Set Up Payroll and Employee Details</span>
//                <div
//               onClick={() => setSelectedForm('employee')}
//               className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg"
//             >
//             <div className="border border-yellow rounded-full p-3"><img src={employeeDetails} alt="payrollSelect" /></div>
//               <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">Employee Details</div>
//             </div>
//                 <div
//               onClick={() => setSelectedForm('payroll')}
//               className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg"
//             >
//             <div className="border border-yellow rounded-full p-3"><img src={payrollDetails} alt="payrollSelect" /></div>
//               <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">Payroll/Job Details</div>
//             </div>
//           </div>
//       <div onClick={onBackClick} className="flex flex-row gap-2 text-xl items-left justify-center mt-[10rem] cursor-pointer">
//         <FaArrowLeft className="text-lightBlue" />
//         <span className="text-lightBlue text-xl">Back</span>
//       </div>
//         </div>
//         );
//     }
//   };

//   return (
//     <div className="">
//       {renderForm()}
//     </div>
//   );
// };

// export default PayrollSelect;

import React, { useState } from 'react';
import PayrollDetails from './payroll-details'; // Adjust the import according to your file structure
import EmployeeDetails from './employee-details'; // Adjust the import according to your file structure
import payrollDetails from '../../../../assets/images/payroll-job-details.svg';
import employeeDetails from '../../../../assets/images/Group-EmployeeDetails.svg';
import { FaArrowLeft } from "react-icons/fa";

const PayrollSelect = ({onBackClick}) => {
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
            <span className="text-base md:text-xl font-medium">Set Up Payroll and Employee Details</span>
               <div
              onClick={() => setSelectedForm('employee')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg"
            >
            <div className="border border-yellow rounded-full p-3"><img src={employeeDetails} alt="payrollSelect" /></div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">Employee Details</div>
            </div>
                <div
              onClick={() => setSelectedForm('payroll')}
              className="flex flex-row gap-8 justify-center items-start cursor-pointer hover:border-yellow mt-5 px-10 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg"
            >
            <div className="border border-yellow rounded-full p-3"><img src={payrollDetails} alt="payrollSelect" /></div>
              <div className="text-center font-medium mt-5 ml-2 text-md md:text-xl">Payroll/Job Details</div>
            </div>
          </div>
      <div onClick={onBackClick} className="flex flex-row gap-2 text-xl items-left justify-center mt-[10rem] cursor-pointer">
        <FaArrowLeft className="text-lightBlue" />
        <span className="text-lightBlue text-xl">Back</span>
      </div>
        </div>
        );
    }
  };

  return (
    <div className="">
      {renderForm()}
    </div>
  );
};

export default PayrollSelect;