import { Field, Formik, Form, ErrorMessage } from 'formik';
import { LuPlus } from 'react-icons/lu';
import { useState } from 'react';
import { EmployeeSchema } from '../../schemas/schemas';
import calendar from '../../../../assets/images/calendar.svg';
import dropdown from '../../../../assets/images/Vector-dropdown.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';


const EmployeeDetails = ({ onSave, accountName }) => {
  const [step, setStep] = useState(1);
  const [createLoading, setCreateLoading] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [automaticPayment, setAutomaticPayment] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState (false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredName = accountName ? accountName.replace(/^.*\//, "").trim() : "";


  console.log (filteredName)
  
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeRole: '',
    employmentDetails: {
      employeeId: '',
      employmentDate: '',
    },
    phoneNumber: '',
    employeeEmailAddress: '',
    accountDetails: {
      nameOfBank: '',
      accountNumber: '',
      paymentFrequency: '',
      automaticPayment: false,
      paymentDay: '',
      paymentDayOfMonth: '',
    },
  });
  

  const handlePaymentFrequencySelect = (value, setFieldValue) => {
    setPaymentFrequency(value);
    setDropdownOpen(false);

  };
   

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  }
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-start w-auto xl:ml-80 xl:pt-28 md:pt-10">
      {/* <span className="text-xl md:text-3xl font-bold px-6 py-2 md:py-0">Payroll</span> */}
      <div className="w-full px-6 py-4 ">
        <div className="px-6 py-4 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] ">
          <span className="text-base md:text-xl font-medium">Employee Details</span>
          <Formik
            
            initialValues={formData}
            validationSchema={EmployeeSchema}
            onSubmit={(values, actions) => {
              console.log('Form Submitted:', values);
              onSave(values);
              setFormData(values);
              actions.setSubmitting(false);
            }}>
            {({ setFieldValue, resetForm, values, setValues, errors, touched, setTouched, validateForm }) => (
              <Form
                 className="flex flex-col  w-full py-4 space-y-4">
                {step === 1 && (
            <>
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="employeeName"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employee's Name
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>
                  <Field
                    name="employeeName"
                    type="text"
                    placeholder="Enter first name, then last name"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="employeeName"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                
                <div className="flex flex-col  w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="employeeRole"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employee's Role
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
                        className="absolute md:right-[19rem] lg:right-[22rem] top-2 cursor-pointer"
                        onClick={() => setStartDate(new Date())}>
                        {/* <img src={calendar} alt="Calendar Icon" /> */}
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
                <div className="flex flex-col  w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="phoneNumber"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employee's Phone number
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>

                  <Field
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter Employee's Phone Number"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>
                <div className="flex flex-col  w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="employeeEmailAddress"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employee's Email
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>

                  <Field
                    name="employeeEmailAddress"
                    type="text"
                    placeholder="Enter Employee's Email Address"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="employeeEmailAddress"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>
                <div className="flex center py-40 gap-4 w-full">
                  <button
                    type="button"
                    className="flex gap-2 center rounded-[5px] text-xs md:text-base py-2 border border-lightBlue text-lightBlue w-[200px]"
                    onClick={() => {
                      setStartDate(null);
                      resetForm();
                    }}>
                    Clear form
                  </button>
                  
                 <button
                 type="button"
                 onClick={() => {
                  setLoading(true)
                validateForm().then((errors) => {
                  console.log("Validation Errors:", errors); // Log errors to debug

                  const stepOneFields = ["employeeName", "employeeRole", "employeeEmailAddress", "employmentDetails.employeeId", "employmentDetails.employmentDate"];
                
                  // Filter only errors from Step 1
                  const stepOneErrors = Object.keys(errors).filter((key) =>
                    stepOneFields.includes(key) || key.startsWith("employmentDetails")
                  );
                
                  if (stepOneErrors.length === 0) {
                    const email = values.employeeEmailAddress

                    fetch (`${import.meta.env.VITE_CHECK_IF_EMAIL_EXISTS}?email=${email}`)
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.exists) {

                        // Email exists, fetch user details
                        fetch (`${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${email}`)
                        .then((res) => res.json())
                          .then((userData) => {
                            if (userData.accountNumber) {
                              // Auto-fill the account number in Step 2
                              setValues({
                                ...values,
                                accountDetails: {
                                  ...values.accountDetails,
                                  accountNumber: userData.accountNumber,
                                  nameOfBank: userData.bankName,
                                },
                              });
                            }
                            console.log(userData.accountNumber)
                            setStep(2); // Move to next step
                })
                .catch((error) => console.error("Error fetching user details:", error))
                .finally(() => setLoading(false)); // ✅ Ensure loading stops after fetching user details
            } else {
              setModalOpen(true);
              setLoading(false); // ✅ Close loading here only when modal opens
            }
          })
          .catch((error) => {
            console.error("Error checking email:", error);
            setLoading(false);
          });
      } else {
        setTouched({
          employeeName: true,
          employeeRole: true,
          employeeEmailAddress: true,
          "employmentDetails.employeeId": true,
          "employmentDetails.employmentDate": true,
        });
        setLoading(false); // ✅ Stop loading if validation fails
      }
    });
  }}
  children={loading ? "Loading..." : "Next"}
  disabled={loading}
  className="hover:bg-[#82B5C6] rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[200px] text-primary"
/>
               </div>
             </>
           )}

{step === 2 && (
            <>
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
                        {[ 'MONTHLY', 'WEEKLY', 'DAILY'].map((option) => (
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
                  <div className="mt-3">
                <label className="font-normal text-sm">Payment Date</label>
                <DatePicker
  selected={
    values.accountDetails.paymentDayOfMonth
      ? new Date(2000, 0, values.accountDetails.paymentDayOfMonth) // Ensure valid date
      : null
  }
  onChange={(date) => {
    if (date) {
      const dayNumber = format(date, "d"); // Extracts day number (1-31)
      const dayOfWeek = format(date, "EEEE").toUpperCase(); // Gets "MONDAY", "TUESDAY"...

      setFieldValue("accountDetails.paymentDayOfMonth", dayNumber);
      setFieldValue("accountDetails.paymentDay", dayOfWeek);
    }
  }}
  name="accountDetails.paymentDayOfMonth"
  dateFormat="d"
  showMonthDropdown={false}
  showYearDropdown={false}
  placeholderText="Select Payment Date"
  className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-sm"
/>
<ErrorMessage
      name="accountDetails.paymentDayOfMonth"
      component="span"
      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
    />
              </div>
  
  <div className="mt-3">
    <label className="font-normal text-xs md:text-sm">Payment Day</label>
    <Field
      as="select"
      name="accountDetails.paymentDay"
      className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
    >
      <option value="" disabled>Select Payment Day</option>
      <option value="SUNDAY">Sunday</option>
      <option value="MONDAY">Monday</option>
      <option value="TUESDAY">Tuesday</option>
      <option value="WEDNESDAY">Wednesday</option>
      <option value="THURSDAY">Thursday</option>
      <option value="FRIDAY">Friday</option>
      <option value="SATURDAY">Saturday</option>
    </Field>
    <ErrorMessage
      name="accountDetails.paymentDay"
      component="span"
      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
    />
  </div>
      </div>

                <div className="flex center py-40 gap-4 w-full">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[200px] text-primary">
                
                  Back
                </button>
                  <button
                    type="button"
                    className="flex gap-2 center rounded-[5px] text-xs md:text-base py-2 border border-lightBlue text-lightBlue w-[200px]"
                    onClick={() => {
                      setStartDate(null);
                      setAutomaticPayment(false);
                      setPaymentFrequency('');
                      setDropdownOpen(false);
                      resetForm();
                    }}>
                    Clear form
                  </button>
                 
                  <button
                    type="submit"
                    className=" hover:bg-[#82B5C6] rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[200px] text-primary">
                    Save
                  </button>
                </div>
                </>
)}
{isModalOpen &&  (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto p-4">
         <div className="bg-white p-5 rounded shadow-lg w-[500px] max-h-[90%] overflow-y-auto">
         <h1 className="text-xl pb-5 font-bold text-lightBlue">Create Employee's Account</h1>
         <div className="mb-4">
              <label className="block text-md font-bold mb-1">Name</label>
                <input
                  type="text"
                  name="employeeName"
                  value={values.employeeName}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeName: e.target.value })
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
                  value= {values.employeeEmailAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeEmailAddress: e.target.value })
                  }
                  readOnly
                  placeholder="Employee Email"
                  className="border p-2 w-full rounded"
                />
                </div>
                <div className="flex center py-5 gap-8 w-full">

         <button
                className=" hover:bg-red-400 mt-4 bg-lightBlue text-white px-4 py-2 rounded"
                onClick={closeModal}>
                Close
              </button>
              <button
              type='button'
                className=" hover:bg-[#82B5C6] mt-4 bg-lightBlue text-white px-4 py-2 rounded"
                children={createLoading ? 'Loading...' : 'Create'}
                disabled={createLoading}
                
  
  onClick={() => {
    const payload = {
      accountName: values.employeeName,
      employerCompanyName: filteredName,
      emailAddress: values.employeeEmailAddress,
      phoneNumber: values.phoneNumber,
    };

    setCreateLoading(true);

    fetch(import.meta.env.VITE_CREATE_VIRTUAL_ACCOUNT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Account Created:", data);
        setSuccessMessage("Done! Please click next.");
        setTimeout(() => {
          setSuccessMessage('');
          // onClose();
        }, 70000);
       
        if (data.nombaBankAccountNumber) {
          console.log(data)
        }
        
      })
      .catch((error) => console.error("Error creating account:", error))
      .finally(() => setCreateLoading(false)); // ✅ Ensure loading stops
  }}
>
  Create
</button>

              <button
  type="button"
  onClick={() => {
    setNextLoading(true);

    fetch(`${import.meta.env.VITE_CHECK_IF_EMAIL_EXISTS}?email=${values.employeeEmailAddress}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) {
          // Fetch user details after email existence check
          fetch(`${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${values.employeeEmailAddress}`)
            .then((res) => res.json())
            .then((userData) => {
              if (userData.accountNumber) {
                //  Auto-fill Formik fields here
                setValues((prevValues) => ({
                  ...prevValues,
                  accountDetails: {
                    ...prevValues.accountDetails,
                    accountNumber: userData.accountNumber,
                    nameOfBank: userData.bankName,
                  },
                }));
              }
              setStep(2); // Move to next step
              setModalOpen(false)
            })
            .catch((error) => console.error("Error fetching user details:", error));
        } else {
          setLoading(false); // ✅ Ensure loading stops if email doesn't exist
        }

      })
      .catch((error) => console.error("Error checking email:", error))
      .finally(() => setNextLoading(false));
  }}
  className=" hover:bg-[#82B5C6] mt-4 bg-lightBlue text-white px-4 py-2 rounded"
  children={nextLoading ? 'Loading...' : 'Next'}
  disabled={nextLoading}
>
  
  Next
</button>
{successMessage &&   <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
  <p className="mt-2 text-lightBlue font-bold">
  {
successMessage}</p></div>}

              </div>
         </div>
          </div>
        )}
            
              </Form>
                  
            )}
            
          </Formik>
         
        </div>
        
      </div>
      
    </div>
    
  );
};

export default EmployeeDetails;
