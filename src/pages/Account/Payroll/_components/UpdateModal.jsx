import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { fetchPayrollData } from '../../../../Redux/payrollSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';


const UpdateModal = ({ isOpen, onClose, employee, type, customerId }) => {
  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState(() => {
      if (type === "employee") {
        return {
          id: employee.id,
          employeeName: employee.employeeName || "",
          employeeEmailAddress: employee.employeeEmailAddress || "",
          employeeRole: employee.employeeRole || "",
          employmentDetails: {
            employeeId: employee.id,
            employmentDate: employee.employmentDetails?.employmentDate || "",
          },
          accountDetails: {
            nameOfBank: employee.accountDetails?.nameOfBank || "",
            accountNumber: employee.accountDetails?.accountNumber || "",
            paymentFrequency: employee.accountDetails?.paymentFrequency || "",
            automaticPayment: employee.accountDetails?.automaticPayment ?? true,
            paymentDay: employee.accountDetails?.paymentDay || "",
            paymentDayOfMonth: employee.accountDetails?.paymentDayOfMonth || 0,
          },
        };
      } else {
        return {
          jobRoleTitle: employee.jobRoleTitle,
          basicSalary: employee.basicSalary,
          deductions: employee.deductions || [{ deductionPackageName: "", deductionAmount: 0 }],
          allowances: employee.allowances || [{ allowancePackageName: "", allowancePay: 0 }],
        };
      }
    });
  
     
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      
    };
  
    const handleSubmit = async (e) => {

      e.preventDefault();
      setLoading(true); 

      try {
        const endpoint =
  type === "employee"
    ? import.meta.env.VITE_UPDATE_EMPLOYEE_DETAILS
        .replace("{customerId}", customerId)
        .replace("{employee.id}", employee.id)
    : import.meta.env.VITE_UPDATE_PAYROLL_DETAILS.replace(
        "{employee.id}",
        employee.id
      );  
            const payload =
      type === "employee"
        ? {
            ...formData,
            employersEmailAddress: employee.employersEmailAddress, // Keep existing value
            corporateCustomerWalletId: employee.corporateCustomerWalletId, // Keep existing value
          }
        : formData;



        const response = await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) throw new Error("Update failed");
        const updatedData = await response.json();
        // setFormData(updatedData); 
        // dispatch(fetchEmployees(customerId));
        dispatch(fetchPayrollData(customerId));
        // setUpdatedData(updatedData);
        console.log(customerId)
        setSuccessMessage("Updated successfully!");
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2000);
      } catch (error) {
        console.error("Error updating:", error);
        setErrorMessage("An error occurred while updating. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    return (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    //   <div className="bg-white p-5 rounded-lg shadow-lg w-96">
    <div className="fixed inset-0 flex items-center justify-center border-2 border-[#a0a0a0] bg-black bg-opacity-40 overflow-y-auto p-4">
         <div className="bg-white p-11 rounded shadow-lg w-[500px] max-h-[90%] overflow-y-auto"> 

          <h2 className="text-xl font-semibold mb-4">
            {type === "employee" ? "Update Employee Details" : "Update Payroll Details"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {type === "employee" ? (
              <>
              <div className="mb-4">
              <label className="block text-md font-bold mb-1">Name</label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  readOnly
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      employeeName: e.target.value, // Assigning the value directly
                    }))
                  }
                          placeholder="Employee Name"
                  className="border p-2 w-full rounded"
                />
                </div>
                <div className="mb-4">
                <label className="block text-md font-bold mb-1"> Email</label>
                <input
                  type="email"
                  name="employeeEmailAddress"
                  value={formData.employeeEmailAddress}
                  onChange={handleChange}
                  placeholder="Employee Email"
                  className="border p-2 w-full rounded"
                />
                </div>
                <div className="mb-4">
                <label className="block text-md font-bold mb-1"> Role</label>
                <input
                  type="text"
                  name="employeeRole"
                  value={formData.employeeRole}
                  onChange={handleChange}
                  placeholder="Employee Role"
                  className="border p-2 w-full rounded"
                />
                 </div>
                 <div className="mb-4">
                 <label className="block text-md font-bold mb-1">Employment Date</label>
                
                <input
                  type="date"
                  
                  value={formData.employmentDetails?.employmentDate?.split("T")[0] || ""} 
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      employmentDetails: { ...prev.employmentDetails, employmentDate: e.target.value },
                    }))
                  }
                  className="border p-2 w-full rounded"
                />
                </div>
                <div className="mb-4">
                <label className="block text-md font-bold mb-1">Bank Name</label>
                <input
                  type="text"
                  name="nameOfBank"
                  value={formData.accountDetails.nameOfBank}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      accountDetails: { ...prev.accountDetails, nameOfBank: e.target.value },
                    }))
                  }
                  placeholder="Bank Name"
                  className="border p-2 w-full rounded"
                />
                </div>
                <div className="mb-4">
                <label className="block text-md font-bold mb-1">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountDetails.accountNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      accountDetails: { ...prev.accountDetails, accountNumber: e.target.value },
                    }))
                  }
                  placeholder="Account Number"
                  className="border p-2 w-full rounded"
                />
                </div>
                <div className="mb-4">
                <label className="block text-md font-bold mb-1">Payment Frequency</label>
                 <select
                  type="text"
                  name="paymentFrequency"
                  value={formData.accountDetails.paymentFrequency}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      accountDetails: { ...prev.accountDetails, paymentFrequency: e.target.value },
                    }))
                  }
                  placeholder="Payment Frequency"
                  className="border p-2 w-full rounded"
                > <option value="">Select Payment Frequency</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option></select>
                </div>
                <div className="mb-4">
  <label className="block text-md font-bold mb-1">Payment Date</label>

  <DatePicker
    selected={
      formData.accountDetails.paymentDayOfMonth
        ? new Date(2000, 0, formData.accountDetails.paymentDayOfMonth) // Ensuring a valid date
        : null
    }
    onChange={(date) => {
      if (date) {
        const dayNumber = parseInt(format(date, "d"), 10); // Extract day number (1-31)
        const dayOfWeek = format(date, "EEEE").toUpperCase(); // Get "MONDAY", "TUESDAY"...

        setFormData((prev) => ({
          ...prev,
          accountDetails: {
            ...prev.accountDetails,
            paymentDayOfMonth: dayNumber,
            paymentDay: dayOfWeek,
          },
        }));
      }
    }}
    name="paymentDayOfMonth"
    dateFormat="d"
    showMonthDropdown={false}
    showYearDropdown={false}
    placeholderText="Select Payment Date"
    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-sm"
  />
  </div>
                <div className="mb-4">
                <label className="block text-md font-bold mb-1">Payment Day</label>
                 <select
                  type="text"
                  name="paymentDay"
                  value={formData.accountDetails.paymentDay}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      accountDetails: { ...prev.accountDetails, paymentDay: e.target.value },
                    }))
                  }
                  placeholder="Payment Day"
                  className="border p-2 w-full rounded"
                >
                   <option value="" disabled>Select Payment Day</option>
      <option value="SUNDAY">Sunday</option>
      <option value="MONDAY">Monday</option>
      <option value="TUESDAY">Tuesday</option>
      <option value="WEDNESDAY">Wednesday</option>
      <option value="THURSDAY">Thursday</option>
      <option value="FRIDAY">Friday</option>
      <option value="SATURDAY">Saturday</option></select>
                </div>
              
      <div className="mb-4">
  <label className="block font-bold mb-1">Automatic Payment:</label>
  <select
    value={formData.automaticPayment}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        accountDetails: { ...prev.accountDetails, automaticPayment: e.target.value },
      }))
    }
   
    className="border p-2 w-full rounded"
  >
    <option value="true">Enabled</option>
    <option value="false">Disabled</option>
  </select>
</div>

              </>
            ) : (
              <>
               <div className="mb-4">
               <label className="block text-md font-bold mb-1">Job Role</label>
                <input
                  type="text"
                  name="jobRoleTitle"
                  value={formData.jobRoleTitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      jobRoleTitle: e.target.value, 
                    }))
                  }            
                  placeholder="Job Role Title"
                  className="border p-2 w-full rounded"
                />
                </div>
                <div className="mb-4">
                <label className="block text-md font-bold mb-1">Basic Salary</label>
                <input
                  type="number"
                  name="basicSalary"
                  value={formData.basicSalary}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      basicSalary: e.target.value,
                    }))
                  }                  placeholder="Basic Salary"
                  className="border p-2 w-full rounded"
                />
                </div>
                {formData.deductions.map((deduction, index) => (
                  <div key={index}>
                     <div className="mb-4">
                     <label className="block text-md font-bold mb-1">Deduction Package</label>
                    <input
                      type="text"
                      name={`deductions[${index}].deductionPackageName`}
                      value={deduction.deductionPackageName}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          deductions: prev.deductions.map((item, i) =>
                            i === index ? { ...item, deductionPackageName: e.target.value } : item
                          ),
                        }));
                      }}
                      placeholder="Deduction Package Name"
                      className="border p-2 w-full rounded"
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-md font-bold mb-1">Deduction Amount</label>
                    <input
                      type="number"
                      name={`deductions[${index}].deductionAmount`}
                      value={deduction.deductionAmount}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          deductions: prev.deductions.map((item, i) =>
                            i === index ? { ...item, deductionAmount: e.target.value } : item
                          ),
                        }));
                      }}
                      placeholder="Deduction Amount"
                      className="border p-2 w-full rounded"
                    />
                    </div>
                  </div>
                ))}
                {formData.allowances.map((allowance, index) => (
                  <div key={index}>
                     <div className="mb-4">
                     <label className="block text-md font-bold mb-1">Allowance Package</label>
                    <input
                      type="text"
                      name={`allowances[${index}].allowancePackageName`}
                      value={allowance.allowancePackageName}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          allowances: prev.allowances.map((item, i) =>
                            i === index ? { ...item, allowancePackageName: e.target.value } : item
                          ),
                        }));
                      }}
                      placeholder="Allowance Package Name"
                      className="border p-2 w-full rounded"
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-md font-bold mb-1">Allowance Pay</label>
                    <input
                      type="number"
                      name={`allowances[${index}].allowancePay`}
                      value={allowance.allowancePay}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          allowances: prev.allowances.map((item, i) =>
                            i === index ? { ...item, allowancePay: e.target.value } : item
                          ),
                        }));
                      }}
                      placeholder="Allowance Pay"
                      className="border p-2 w-full rounded"
                    />
                    </div>
                  </div>
                ))}
              </>
              
            )}
                    {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}


  
            <div className="flex justify-between mt-4">
              <button type="button" onClick={onClose} className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded">
                Close
              </button>
              <button
        type="submit"
        className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-2 rounded flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
        ) : (
          "Update"
        )}
      </button>
            </div>
          </form>
        </div>
        {/* <PayrollView updatedData={updatedData} /> */}

      </div>
    );
  };
  export default UpdateModal;