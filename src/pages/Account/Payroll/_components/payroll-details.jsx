import React , { useState  } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { LuPlus } from 'react-icons/lu';
import { RiDeleteBinLine } from 'react-icons/ri';
import { PayrollSchema } from '../../schemas/schemas';

const PayrollDetails = ({ onSave }) => {
  const [showMessage, setShowMessage] = useState(false); // State for showing the message

  


  return (
    <div className="flex flex-col justify-center items-start w-auto xl:ml-80 xl:pt-28 md:pt-10 mx-auto h-full">
      <span className="text-xl md:text-3xl font-bold px-6 py-2 md:py-0">Payroll</span>
      <div className="w-full px-6 py-4 ">
        <div className="px-6 py-4 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] ">
          <span className="text-base md:text-xl font-medium">Payroll Details</span>
          <Formik
            initialValues={{
              jobRoleTitle: '',
              basicSalary: '',
              allowances: [
                {
                  allowancePackageName: '',
                  allowancePay: '',
                },
              ],
            }}
            validationSchema={PayrollSchema}
            onSubmit={(values, actions) => {
              console.log('Form Submitted:', values);
              onSave(values);
              setShowMessage(true); // Show the message on submit
              setTimeout(() => setShowMessage(false), 5000); // Hide the message after 3 seconds
              actions.setSubmitting(false);
            }}>
              
            {({ values, setFieldValue, resetForm }) => (
              <Form>
                <div className="flex flex-col  w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="jobRoleTitle"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Job Role/Title
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>
                  <Field
                    name="jobRoleTitle"
                    type="text"
                    placeholder="Enter Job Title"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="jobRoleTitle"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>
                <div className="flex flex-col w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="basicSalary"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Basic salary
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[40%] xl:mr-0 md:mr-14 me-12 ml-8 " />
                  </div>
                  <Field
                    name="basicSalary"
                    type="number"
                    placeholder="Enter Base Salary"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="basicSalary"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>
                <div className="flex flex-col w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none   bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="allowanceFields"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Allowances
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[40%] xl:mr-0 md:mr-14 me-12 ml-8 " />
                  </div>
                  <div className="flex w-full center gap-2">
                    <div className="flex flex-col w-full">
                      {values.allowances.map((allowance, i) => (
                        <div className="flex gap-2 py-1" key={i}>
                          <div className="flex flex-col w-full">
                            <Field
                              name={`allowances[${i}].allowancePackageName`}
                              type="text"
                              placeholder="Enter name of allowance package"
                              className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                            />
                            <ErrorMessage
                              name={`allowances[${i}].allowancePackageName`}
                              component="span"
                              className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                            />
                          </div>
                          <div className="flex flex-col w-full">
                            <Field
                              name={`allowances[${i}].allowancePay`}
                              type="number"
                              placeholder="Allowance pay"
                              className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                            />
                            <ErrorMessage
                              name={`allowances[${i}].allowancePay`}
                              component="span"
                              className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                            />
                          </div>
                          {values.allowances.length > 1 && (
                            <RiDeleteBinLine
                              color="red"
                              size={20}
                              className="text-center w-full mx-auto hover:cursor-pointer hover:scale-90 !mt-2"
                              onClick={() =>
                                setFieldValue(
                                  'allowances',
                                  values.allowances.filter((_, index) => index !== i)
                                )
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue('allowances', [
                      ...values.allowances,
                      { allowancePackageName: '', allowancePay: '' },
                    ])
                  }
                  className="flex gap-2 center rounded-[5px] py-2 px-4 w-[140px] md:w-[200px] border border-lightBlue text-lightBlue  float-right text-xs md:text-base text-nowrap">
                  <LuPlus size={20} color="#006181" />
                  Add allowance
                </button>
                <div className="flex center py-40 gap-4 w-full">
                  <button
                    type="button"
                    className="flex gap-2 center rounded-[5px] text-xs md:text-base py-2 border border-lightBlue text-lightBlue w-[300px]"
                    onClick={() => resetForm()}>
                    {/* <LuPlus size={20} color="#006181" /> */}
                    Clear form
                  </button>
                  <button
                    type="submit"
                    className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
                    Save
                  </button>
                  {showMessage && (
                      <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
                        <p className="mt-2 text-blue-500 font-bold">Payroll details saved successfully!</p>
                      </div>
                    )}
                  
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PayrollDetails;
