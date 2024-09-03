import { Field, Formik, Form, ErrorMessage } from 'formik';
import { LuPlus } from 'react-icons/lu';

import { RiDeleteBinLine } from 'react-icons/ri';
import { PayrollSchema } from '../../schemas/schemas';
import { useState } from 'react';

const PayrollDetails = ({ handleRoleForm, addRole, addEmployeeForm }) => {
  const [save, setSave] = useState(false);
  const [allowanceFields, setAllowanceFields] = useState([
    {
      allowance_package: '',
      allowance_pay: ''
    }
  ]);

  const handleSave = () => {
    setSave(true);
  };
  const addAllowanceField = () => {
    setAllowanceFields([
      ...allowanceFields,
      {
        allowance_package: '',
        allowance_pay: ''
      }
    ]);
  };
  const removeAllowanceFields = (index) => {
    const rows = [...allowanceFields];
    rows.splice(index, 1);
    setAllowanceFields(rows);
  };

  const handleAllowanceChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...allowanceFields];
    list[index][name] = value;
    setAllowanceFields(list);
  };

  const handleSubmit = (values) => {
    handleRoleForm(values);
    setAllowanceFields([
      {
        allowance_package: '',
        allowance_pay: ''
      }
    ]);
  };
  const handleRoleSave = (values) => {
    addEmployeeForm(values);
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
            initialValues={{
              base_salary: '',
              job_role: ''
            }}
            validationSchema={PayrollSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit({ values, allowanceFields });
              save && handleRoleSave({ values, allowanceFields });
              resetForm({ values: '' });
            }}>
            {(formik) => (
              <Form>
                <div className="flex flex-col  w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="job_role"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Job Role/Title
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[39%] xl:mr-0 md:mr-14 mr-12 ml-8 " />
                  </div>
                  <Field
                    name="job_role"
                    type="text"
                    placeholder="Enter Job Title"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                    required
                  />
                  <ErrorMessage
                    name="job_role"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>
                <div className="flex flex-col w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="job-title"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Base Salary
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[40%] xl:mr-0 md:mr-14 me-12 ml-8 " />
                  </div>
                  <Field
                    name="base_salary"
                    type="number"
                    placeholder="Enter Base Salary"
                    className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="base_salary"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>
                <div className="flex flex-col w-full py-4 space-y-4">
                  <div className="flex items-center">
                    <hr className="border-none   bg-lightBlue ml-[3.2rem] h-[1px] w-[40%] mr-8 " />
                    <label
                      htmlFor="allowance_package"
                      className="text-lightBlue text-center font-bold text-sm md:text-[18px] text-nowrap">
                      Allowances
                    </label>
                    <hr className="border-none bg-lightBlue h-[1px] w-[40%] xl:mr-0 md:mr-14 me-12 ml-8 " />
                  </div>
                  <div className="flex w-full center gap-2">
                    <div className="flex flex-col w-full">
                      {allowanceFields.map((allowance, i) => {
                        const { allowance_package, allowance_pay } = allowance;
                        return (
                          <div className="flex gap-2 py-1" key={i}>
                            <div className="flex flex-col w-full">
                              <input
                                name="allowance_package"
                                type="text"
                                value={allowance_package}
                                onChange={(evnt) => handleAllowanceChange(i, evnt)}
                                placeholder="Enter name of allowance package"
                                className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                                required
                              />
                            </div>
                            <div className="flex flex-col w-full">
                              <input
                                name="allowance_pay"
                                type="number"
                                value={allowance_pay}
                                onChange={(evnt) => handleAllowanceChange(i, evnt)}
                                placeholder="Allowance pay"
                                className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                                required
                              />
                            </div>
                          </div>
                        );
                      })}
                      {allowanceFields.length !== 1 ? (
                        <RiDeleteBinLine
                          color="red"
                          size={20}
                          className="text-center w-full mx-auto hover:cursor-pointer hover:scale-90 !mt-2 "
                          onClick={removeAllowanceFields}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addAllowanceField}
                  className="flex gap-2 center rounded-[5px] py-2 px-4 w-[140px] md:w-[200px] border border-lightBlue text-lightBlue  float-right text-xs md:text-base text-nowrap">
                  <LuPlus size={20} color="#006181" />
                  Add allowance
                </button>
                <div className="flex center py-40 gap-4 w-full">
                  <button
                    type="submit"
                    onClick={addRole}
                    className="flex gap-2 center rounded-[5px] text-xs md:text-base py-2 border border-lightBlue text-lightBlue w-[300px]">
                    <LuPlus size={20} color="#006181" />
                    Add role
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

export default PayrollDetails;
