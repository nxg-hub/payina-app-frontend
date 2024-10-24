import { Field, Formik, Form, ErrorMessage } from 'formik';
import { LuPlus } from 'react-icons/lu';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EmployeeSchema } from '../../schemas/schemas';
import calendar from '../../../../assets/images/calendar.svg';
import dropdown from '../../../../assets/images/Vector-dropdown.svg';
// import { FaArrowLeft } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiDeleteBinLine } from 'react-icons/ri';

const EmployeeDetails = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  // const [isAutomaticPayment, setIsAutomaticPayment] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [employeeName, setEmployeeName] = useState(['']);

  //   const handleAutomaticPaymentToggle = () => {
  //   setIsAutomaticPayment((prev) => !prev);
  // };

  const handlePaymentFrequencySelect = (value) => {
    setPaymentFrequency(value);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const addEmployeeName = () => {
    setEmployeeName([...employeeName, '']);
  };

  const removeEmployeeName = (index) => {
    const updatedName = [...employeeName];
    updatedName.splice(index, 1);
    setEmployeeName(updatedName);
  };

  const handleEmployeeNameChange = (index, value, setFieldValue) => {
    const updatedName = [...employeeName];
    updatedName[index] = value;
    setEmployeeName(updatedName);
    setFieldValue(`employeeName[${index}]`, value); // Update Formik's state
  };

  // const handleEmployeeNameChange = (index, value) => {
  //   const updatedName = [...employeeName];
  //   updatedName[index] = value;
  //   setEmployeeName(updatedName);
  // };

  return (
    <div className="flex flex-col justify-center items-start w-auto xl:ml-80 xl:pt-28 md:pt-10">
      <span className="text-xl md:text-3xl font-bold px-6 py-2 md:py-0">Payroll</span>
      <div className="w-full px-6 py-4 ">
        <div className="px-6 py-4 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] ">
          <span className="text-base md:text-xl font-medium">Payroll Details</span>
          <Formik
            initialValues={{
              employeeName: [''],
              employeeRole: '',
              bankName: '',
              accountNumber: '',
              employementDate: '',
              paymentFrequency: '',
            }}
            validationSchema={EmployeeSchema}
            onSubmit={(values, actions) => {
              console.log('Form Submitted:', values); // Debugging output
              onSubmit(values);
              actions.setSubmitting(false);
            }}>
            {({ setFieldValue }) => (
              <Form>
                <div className="flex flex-col  w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="employeeName"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employee Name
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>
                  {employeeName.map((name, index) => (
                    <div className="flex items-center" key={index}>
                      <Field
                        name={`employeeName[${index}]`}
                        type="text"
                        placeholder="Enter Employee's name"
                        className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                        value={name}
                        onChange={(e) =>
                          handleEmployeeNameChange(index, e.target.value, setFieldValue)
                        }
                      />
                      {employeeName.length > 1 && (
                        <RiDeleteBinLine
                          color="red"
                          size={20}
                          className="ml-2 hover:cursor-pointer"
                          onClick={() => removeEmployeeName(index)}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col  w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="employeeRole"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employee Role
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>

                  <Field
                    name="employeeRole"
                    type="text"
                    placeholder="Enter Employee's role"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="employeeRole"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>
                <div className="flex flex-col relative w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="employementDetails"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employement Details
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>
                  <Field
                    name="employementDate"
                    type="text"
                    placeholder="Employement Date"
                    className="w-[100%] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    value={startDate ? startDate.toLocaleDateString() : ''}
                    onClick={() => setOpenDatePicker(true)}
                    readOnly
                  />
                  <ErrorMessage
                    name="employementDate"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                  <div
                    className="absolute right-[2rem] top-10 cursor-pointer"
                    onClick={() => setStartDate(new Date())}>
                    <img src={calendar} alt="Calendar Icon" />
                  </div>
                  {openDatePicker && (
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setFieldValue('employementDate', date ? date.toLocaleDateString() : '');
                        setOpenDatePicker(false);
                      }}
                      className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md"
                      placeholderText="Select a date"
                      dateFormat="MM/dd/yyyy"
                      popperPlacement="top"
                      onClickOutside={() => setOpenDatePicker(false)} // close date picker on outside click
                    />
                  )}
                </div>

                <div className="flex flex-col w-full py-4 space-y-4">
                  <div>
                    <div className="flex items-center">
                      <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                      <span className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                        Account Details
                      </span>
                      <hr className="border-none bg-lightBlue h-[1px] w-[40%] xl:mr-0 md:mr-14 me-12 ml-8 " />
                    </div>
                    <label htmlFor="bankName" className="font-normal text-xs md:text-sm">
                      Name of Bank
                    </label>
                    <Field
                      name="bankName"
                      type="text"
                      placeholder="Enter Name of Bank"
                      className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    />
                    <ErrorMessage
                      name="bankName"
                      component="span"
                      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="accountNumber" className="font-normal text-xs md:text-sm">
                      Account Number
                    </label>
                    <Field
                      name="accountNumber"
                      type="number"
                      placeholder="Enter Account Number"
                      className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    />
                    <ErrorMessage
                      name="accountNumber"
                      component="span"
                      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="paymentFrequency" className="font-normal text-xs md:text-sm">
                      Frequency of Payment
                    </label>
                    <Field
                      name="paymentFrequency"
                      type="text"
                      placeholder="Frequency of Payment"
                      className="w-full relative border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    />
                    <ErrorMessage
                      name="paymentFrequency"
                      component="span"
                      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                    />
                    <div
                      className="absolute cursor-pointer right-[4rem] top-[47.5rem]"
                      onClick={toggleDropdown}>
                      <img src={dropdown} alt="Dropdown" />
                    </div>
                    {dropdownOpen && (
                      <div className="absolute bg-white border border-gray-300 rounded-md w-[20%] mt-1 z-10">
                        {['Yearly', 'Monthly', 'Weekly', 'Daily'].map((option) => (
                          <div
                            key={option}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handlePaymentFrequencySelect(option);
                              setFieldValue('paymentFrequency', option);
                            }}>
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/*  <div className="font-normal text-xs md:text-sm">Automatic Payment
                 <span 
                      className={`border border-[#D9D9D9] bg-black rounded-md px-[20px] py-[2px] ml-3 cursor-pointer`} 
                    >
                    <span className={`automatic-on border rounded-full px-[5px] py-[2px] cursor-pointer ${isAutomaticPayment ? 'bg-green-500' : 'bg-red-500'}`}
                    onClick={handleAutomaticPaymentToggle}></span>
                    </span>
                  </div>*/}
                </div>

                <div className="flex center py-40 gap-4 w-full">
                  <button
                    type="button"
                    onClick={addEmployeeName}
                    className="flex gap-2 center rounded-[5px] text-xs md:text-base py-2 border border-lightBlue text-lightBlue w-[300px]">
                    <LuPlus size={20} color="#006181" />
                    Add Employee
                  </button>
                  <button
                    type="submit"
                    className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
