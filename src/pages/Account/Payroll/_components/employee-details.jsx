import { Field, Formik, Form, ErrorMessage } from 'formik';
import { LuPlus } from 'react-icons/lu';
import { useState } from 'react';
import { EmployeeSchema } from '../../schemas/schemas';
import calendar from '../../../../assets/images/calendar.svg';
import dropdown from '../../../../assets/images/Vector-dropdown.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EmployeeDetails = ({ onSave }) => {
  const [startDate, setStartDate] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [automaticPayment, setAutomaticPayment] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paymentFrequency, setPaymentFrequency] = useState('');

  const handlePaymentFrequencySelect = (value) => {
    setPaymentFrequency(value);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-start w-auto xl:ml-80 xl:pt-28 md:pt-10">
      <span className="text-xl md:text-3xl font-bold px-6 py-2 md:py-0">Payroll</span>
      <div className="w-full px-6 py-4 ">
        <div className="px-6 py-4 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] ">
          <span className="text-base md:text-xl font-medium">Payroll Details</span>
          <Formik
            initialValues={{
              employeeName: '',
              employeeRole: '',
              employmentDetails: {
                employeeId: '',
                employmentDate: '',
              },
              accountDetails: {
                nameOfBank: '',
                accountNumber: '',
                paymentFrequency: '',
                automaticPayment: false,
              },
            }}
            validationSchema={EmployeeSchema}
            onSubmit={(values, actions) => {
              console.log('Form Submitted:', values);
              onSave(values);
              actions.setSubmitting(false);
            }}>
            {({ setFieldValue, resetForm }) => (
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
                  <Field
                    name="employeeName"
                    type="text"
                    placeholder="Enter Employee's name"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="employeeName"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
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
                <div className="flex flex-col w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="employmentDetails"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employement Details
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col relative gap-2 w-[100%]">
                      <Field
                        name="employmentDetails.employmentDate"
                        type="text"
                        placeholder="Employement Date"
                        className="border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                        value={startDate ? startDate.toISOString().split('T')[0] : ''}
                        onClick={() => setOpenDatePicker(true)}
                        readOnly
                      />
                      <ErrorMessage
                        name="employmentDetails.employmentDate"
                        component="span"
                        className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                      />
                      <div
                        className="absolute md:left-[16rem] lg:left-[22rem] top-2 cursor-pointer"
                        onClick={() => setStartDate(new Date())}>
                        <img src={calendar} alt="Calendar Icon" />
                      </div>
                      {openDatePicker && (
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => {
                            setStartDate(date);
                            setFieldValue(
                              'employmentDetails.employmentDate',
                              date ? date.toISOString() : ''
                            );
                            setOpenDatePicker(false);
                          }}
                          className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md"
                          placeholderText="Select a date"
                          popperPlacement="top"
                          onClickOutside={() => setOpenDatePicker(false)}
                        />
                      )}
                    </div>
                    <div className="flex flex-col relative gap-2 w-[100%]">
                      <Field
                        name="employmentDetails.employeeId"
                        type="text"
                        placeholder="Employee Id"
                        className="border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                      />
                      <ErrorMessage
                        name="employmentDetails.employeeId"
                        component="span"
                        className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <span className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Account Details
                    </span>
                    <hr className="border-none bg-lightBlue h-[1px] w-[40%] xl:mr-0 md:mr-14 me-12 ml-8 " />
                  </div>
                  <label
                    htmlFor="accountDetails.nameOfBank"
                    className="font-normal text-sm md:text-md">
                    Name of Bank
                  </label>
                  <Field
                    name="accountDetails.nameOfBank"
                    type="text"
                    placeholder="Enter Name of Bank"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="accountDetails.nameOfBank"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                  <div>
                    <label
                      htmlFor="accountDetails.accountNumber"
                      className="font-normal text-xs md:text-sm">
                      Account Number
                    </label>
                    <Field
                      name="accountDetails.accountNumber"
                      type="text"
                      placeholder="Enter Account Number"
                      className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    />
                    <ErrorMessage
                      name="accountDetails.accountNumber"
                      component="span"
                      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="accountDetails.paymentFrequency"
                      className="font-normal text-xs md:text-sm">
                      Frequency of Payment
                    </label>
                    <Field
                      name="accountDetails.paymentFrequency"
                      type="text"
                      placeholder="Frequency of Payment"
                      className="w-full relative border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    />
                    <ErrorMessage
                      name="accountDetails.paymentFrequency"
                      component="span"
                      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                    />
                    <div
                      className="absolute cursor-pointer right-[0] bottom-[1rem] mr-2"
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
                              setFieldValue('accountDetails.paymentFrequency', option);
                            }}>
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="font-normal text-xs md:text-sm">
                    Automatic Payment
                    <span
                      name="accountDetails.automaticPayment"
                      className={`border border-[#D9D9D9] bg-black rounded-md px-[5px] py-[2px] w-[15px] ml-3 cursor-pointer`}>
                      <span
                        className={`automatic-on border rounded-full cursor-pointer px-[5px] py-[2px] ${automaticPayment ? 'bg-green-500' : 'bg-red-500'}`}
                        onClick={() => {
                          setAutomaticPayment(!automaticPayment);
                          setFieldValue('accountDetails.automaticPayment', !automaticPayment);
                        }}></span>
                    </span>
                  </div>
                </div>

                <div className="flex center py-40 gap-4 w-full">
                  <button
                    type="button"
                    className="flex gap-2 center rounded-[5px] text-xs md:text-base py-2 border border-lightBlue text-lightBlue w-[300px]"
                    onClick={() => {
                      setStartDate(null);
                      setAutomaticPayment(false);
                      setPaymentFrequency('');
                      setDropdownOpen(false);
                      resetForm();
                    }}>
                    {/* <LuPlus size={20} color="#006181" /> */}
                    Clear form
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
