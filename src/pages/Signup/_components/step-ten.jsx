import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
import { BusinessDetailsSchema } from '../schemas/schema';
import { images } from '../../../constants';
import { useState } from 'react';

export const StepTen = ({ next }) => {
  const [business_is_registered, setBusinessRegister] = useState('');
  const [business_and_home, setBusinessAddress] = useState('');

  const handleSubmit = (business_details) => {
    next({ business_and_home, business_is_registered, business_details });
  };
  const handleCheck = (value) => {
    setBusinessRegister(value);
  };
  const handleSecondCheck = (value) => {
    setBusinessAddress(value);
  };

  const selectArrow = `
      select{
        -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
        border: 1px solid #CCC;
        border-radius: 4px;
        padding-right: 1rem;
        margin-right: 3rem;
        background-position: calc(100% - 1rem);
        background-image: url(/dropdown-arrow.svg);
        background-repeat: no-repeat;
      }
      
      .checkbox:hover input ~ .checkmark {
        background-color: #ffffff;
      }
      
      .checkbox input:checked ~ .checkmark {
        background-color: #ffffff;
      }
      
      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }
      
      .checkbox input:checked ~ .checkmark:after {
        display: block;
      }
      
      .checkbox .checkmark:after {
        left: 9px;
        top: 3px;
        width: 9px;
        height: 20px;
        border: solid green;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      } 
  `;

  return (
    <>
      <div className="hidden md:block fixed md:top-[-24.5rem] xl:top-[-3.5rem] md:right-[-0.1rem] xl:right-[-40rem]">
        <img src={images.Group} alt="" />
      </div>
      <div className="hidden md:block fixed md:-z-10 md:top-[-4.5rem] xl:top-[-1rem] right-[6.5rem]">
        <img src={images.Vector3} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[8rem] xl:top-[12.5rem] right-[20rem] -z-10">
        <img src={images.Vector2} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[10.5rem] xl:top-[14.6rem] right-[24rem] -z-10">
        <img src={images.Vector1} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[15rem] xl:top-[23rem] right-[6.5rem] -z-10">
        <img src={images.Vector2} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[22rem] xl:top-[30rem] right-[7.4rem] -z-10">
        <img src={images.Vector5} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[20rem] xl:top-[27.5rem] right-[9.4rem] -z-10">
        <img src={images.Vector4} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[11.5rem] xl:top-[19rem] right-[10.6rem] -z-10">
        <img src={images.Vector6} alt="" />
      </div>
      <div className="mb-10 bg-primary xl:mt-0 flex flex-col justify-center items-start mx-auto">
        <Formik
          initialValues={{
            business_name: '',
            tax_number: '',
            business_number: '',
            business_registered: [],
            business_address: []
          }}
          validationSchema={BusinessDetailsSchema}
          onSubmit={(business_details) => handleSubmit(business_details)}>
          {(formik) => (
            <Form className="xl:w-[600px] w-full space-y-4">
              <div className="xl:pt-8 p-4 pt-[1rem] md:px-12 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold md:text-[24px]  xl:text-[32px] text-xl xl:leading-10">
                  Enter Business Details
                </div>

                <div className="xl:w-full md:w-[85%] items-start flex flex-col space-y-2 ">
                  <div className="w-full flex flex-col space-y-2 ">
                    <label
                      htmlFor="business_name"
                      className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75
                      ">
                      Business Name
                    </label>
                    <Field
                      name="business_name"
                      type="text"
                      placeholder="Enter Business Name"
                      className=" w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none text-[13px] md:text-base font-medium rounded-[5px] py-2 px-[10px]"
                    />
                    <ErrorMessage
                      name="business_name"
                      component="span"
                      className="text-[#db3a3a] text-xs md:text-sm"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-2 ">
                    <label
                      htmlFor="business_category"
                      className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                      {' '}
                      Business Category{' '}
                    </label>
                    <Field
                      as="select"
                      name="business_category"
                      className="text-primary w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-xs md:text-base text-gray rounded-[5px] py-2 px-8 bg-secondary">
                      <option
                        name="business_category"
                        value="null"
                        className="!bg-secondary text-primary text-xs md:text-base font-medium"
                        selected
                        disabled>
                        Select Business Category
                      </option>
                      <option
                        value="bvn"
                        name="business_category"
                        className="!bg-secondary text-primary text-xs md:text-base font-medium">
                        BVN
                      </option>
                      <option
                        value="nin"
                        name="business_category"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        NIN
                      </option>
                      <option
                        value="voters-card"
                        name="business_category"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        Voter's Card
                      </option>
                    </Field>
                    <ErrorMessage
                      name="business_category"
                      component="span"
                      className="text-[#db3a3a] text-sm"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-2 ">
                    <label
                      htmlFor="business_type"
                      className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                      {' '}
                      Business Type{' '}
                    </label>
                    <Field
                      as="select"
                      name="business_type"
                      className="text-primary w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-xs md:text-base text-gray rounded-[5px] py-2 px-8 bg-secondary">
                      <option
                        name="business_type"
                        value="null"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium"
                        selected
                        disabled>
                        Select Business Type
                      </option>
                      <option
                        value="bvn"
                        name="business_type"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        BVN
                      </option>
                      <option
                        value="nin"
                        name="business_type"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        NIN
                      </option>
                      <option
                        value="voters-card"
                        name="business_type"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        Voter's Card
                      </option>
                    </Field>{' '}
                    <ErrorMessage
                      name="business_type"
                      component="span"
                      className="text-[#db3a3a] text-sm"
                    />
                  </div>
                  <div className="flex flex-col space-y-6 mx-auto items-center justify-center">
                    <div className="flex items-center justify-center flex-col">
                      <label className="text-center text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                        Is Your Business Registered?
                      </label>
                      <div className="flex justify-center gap-6 md:gap-12 items-center w-full mt-0 md:mt-4">
                        <label className="checkbox block relative mb-5 cursor-pointer text-xl">
                          <input
                            name="business_registered"
                            onChange={(e) => handleCheck(e.target.value)}
                            checked={business_is_registered === 'yes'}
                            value="yes"
                            className="absolute opacity-0 cursor-pointer h-0 w-0"
                            type="checkbox"
                          />
                          <span className="checkmark absolute top-0 left-0 h-7 w-7 bg-primary border border-[#FF0000]"></span>
                        </label>

                        <span className="mt-2 px-2 md:px-0 text-center text-sm font-normal text-[#1A1D1F] opacity-75">
                          Yes
                        </span>
                        <div className="w-1 h-8 bg-lightBlue mx-8" />
                        <label className="checkbox block relative mb-5 cursor-pointer text-xl">
                          <input
                            name="business_registered"
                            onChange={(e) => handleCheck(e.target.value)}
                            checked={business_is_registered === 'no'}
                            value="no"
                            className="absolute opacity-0 cursor-pointer h-0 w-0"
                            type="checkbox"
                          />
                          <span className="checkmark absolute top-0 left-0 h-7 w-7 bg-primary border border-[#FF0000]"></span>
                        </label>
                        <span className="mt-2 px-2 md:px-0  text-center text-sm font-normal text-[#1A1D1F] opacity-75">
                          No
                        </span>
                        <ErrorMessage
                          name="business_registered"
                          component="span"
                          className="text-[#db3a3a] text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col space-y-2 ">
                    <label
                      htmlFor="business_number"
                      className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                      Business Registration Number
                    </label>
                    <Field
                      name="business_number"
                      type="text"
                      placeholder="Enter Business Registration Number"
                      className="w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none font-light text-[13px] md:text-base text-gray rounded-[5px] py-2 px-[10px]"
                    />
                    <ErrorMessage
                      name="business_number"
                      component="span"
                      className="text-[#db3a3a] text-xs md:text-sm"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-2 ">
                    <label
                      htmlFor="tax_number"
                      className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                      Tax Identification Number
                    </label>
                    <Field
                      name="tax_number"
                      type="text"
                      placeholder="Enter Tax Identification Number"
                      className="w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none font-light text-[13px] md:text-base text-gray rounded-[5px] py-2 px-[10px]"
                    />
                    <ErrorMessage
                      name="tax_number"
                      component="span"
                      className="text-[#db3a3a] text-xs md:text-sm"
                    />
                  </div>
                  <div className="flex flex-col space-y-6 mx-auto items-center justify-center">
                    <div className="pb-2 flex  items-center justify-center flex-col">
                      <label className="text-center text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                        Are Your Business and Home Address the Same?
                      </label>
                      <div className="flex justify-center gap-6 md:gap-12 items-center w-full mt-1 md:mt-4">
                        <label className="checkbox block relative mb-5 cursor-pointer text-xl">
                          <input
                            name="business_registered"
                            onChange={(e) => handleSecondCheck(e.target.value)}
                            checked={business_and_home === 'yes'}
                            value="yes"
                            className="absolute opacity-0 cursor-pointer h-0 w-0"
                            type="checkbox"
                          />
                          <span className="checkmark absolute top-0 left-0 h-7 w-7 bg-primary border border-[#FF0000]"></span>
                        </label>
                        <span className="mt-2 text-center text-sm font-normal text-[#1A1D1F] px-2 md:px-0 opacity-75">
                          Yes
                        </span>
                        <div className="w-1 h-8 bg-lightBlue mx-8" />
                        <label className="checkbox block relative mb-5 cursor-pointer text-xl">
                          <input
                            name="business_registered"
                            onChange={(e) => handleSecondCheck(e.target.value)}
                            checked={business_and_home === 'no'}
                            value="no"
                            className="absolute opacity-0 cursor-pointer h-0 w-0"
                            type="checkbox"
                          />
                          <span className="checkmark absolute top-0 left-0 h-7 w-7 bg-primary border border-[#FF0000]"></span>
                        </label>
                        <span className="mt-2 px-2 md:px-0 text-center text-sm font-normal text-[#1A1D1F] opacity-75">
                          No
                        </span>
                        <ErrorMessage
                          name="business_address"
                          component="span"
                          className="text-[#db3a3a] text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <CustomButton
                  padding="10px 15px"
                  type="submit"
                  children="Next"
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 mx-auto md:mx-0 w-full md:w-[85%] xl:w-full !mt-0 xl:mb-0"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style>{selectArrow}</style>
    </>
  );
};
