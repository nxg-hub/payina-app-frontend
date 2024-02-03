import { Field, Formik, Form, ErrorMessage } from 'formik';
import { LuPlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EmployeeSchema } from '../../schemas/schemas';

const EmployeeDetails = ({ handleEmployeeForm, addEmployeeForm }) => {
  const [save, setSave] = useState(false);
  const navigate = useNavigate()

  const handleSave = () => {
    setSave(true);
    // navigate('/account/dashboard')
    navigate(0)
  };
  const handleSubmit = (employee_values) => {
    handleEmployeeForm(employee_values);
  };
  const handleEmployeeSave = (employee_values) => {
    addEmployeeForm(employee_values);
  };
  const inputArrow = `
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0
      }
  
      input[type=number] {
        -moz-appearance: textfield;
      }`;

  return (
    <div className="flex flex-col justify-center items-start w-auto xl:ml-80 xl:pt-28 md:pt-10 mx-auto h-full">
      <span className="text-xl md:text-3xl font-bold px-6 py-2 md:py-0">Payroll</span>
      <div className="w-full px-6 py-4 ">
        <div className="px-6 py-4 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] ">
          <span className="text-base md:text-xl font-medium">Payroll Details</span>
          <Formik
            initialValues={{ employee_name: '', employee_role: '', bank_name: '', account_no: '' }}
            validationSchema={EmployeeSchema}
            onSubmit={(employee_values, { resetForm }) => {
              handleSubmit(employee_values);
              save && handleEmployeeSave(employee_values);
              resetForm({ employee_values: '' });
            }}>
            {() => (
              <Form>
                <div className="flex flex-col  w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="job_role"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employee Name
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>
                  <Field
                    name="employee_name"
                    type="text"
                    placeholder="Enter Employee's name"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    required
                  />
                  <ErrorMessage
                      name="employee_name"
                      component="span"
                      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                    />
                </div>
                <div className="flex flex-col  w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="employee_role"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Employee Role
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>

                  <Field
                    name="employee_role"
                    type="text"
                    placeholder="Enter Employee's role"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    required
                  />
                  <ErrorMessage
                      name="employee_role"
                      component="span"
                      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                    />
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
                    <label htmlFor="bank_name" className="font-normal text-xs md:text-sm">
                      Name of Bank
                    </label>
                    <Field
                      name="bank_name"
                      type="text"
                      placeholder="Enter Name of Bank"
                      className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    />
                    <ErrorMessage
                      name="bank_name"
                      component="span"
                      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="account_no" className="font-normal text-xs md:text-sm">
                      Account Number
                    </label>
                    <Field
                      name="account_no"
                      type="number"
                      placeholder="Enter Account Number"
                      className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    />
                    <ErrorMessage
                      name="account_no"
                      component="span"
                      className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                    />
                  </div>
                </div>

                <div className="flex center py-40 gap-4 w-full">
                  <button
                    type="submit"
                    onClick={() => addEmployeeForm()}
                    className="flex gap-2 center rounded-[5px] text-xs md:text-base py-2 border border-lightBlue text-lightBlue w-[300px]">
                    <LuPlus size={20} color="#006181" />
                    Add Employee
                  </button>
                  <button
                    type="submit"
                    onClick={handleSave}
                    className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <style>{inputArrow}</style>
    </div>
  );
};

export default EmployeeDetails;
