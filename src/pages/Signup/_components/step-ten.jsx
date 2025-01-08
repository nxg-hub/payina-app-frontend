import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
import { BusinessDetailsSchema } from '../schemas/schema';
import { images } from '../../../constants';
import { useState } from 'react';

export const StepTen = ({ next }) => {
  const [business_is_registered, setBusinessRegister] = useState('');
  const [loading, setLoading] = useState(false);
  const [business_and_home, setBusinessAddress] = useState('');

  const handleSubmit = async (business_details) => {
    setLoading(true);
    const businessData = {
      businessName: business_details.businessName,
      businessAddress: business_details.businessAddress,
      businessCategory: business_details.businessCategory,
      businessType: business_details.businessType,
      businessRegNumber:
        business_is_registered === 'yes' ? business_details.businessRegNumber : null,
      tin_No: business_is_registered === 'yes' ? business_details.tin_No : null,
    };
    try {
      // console.log('Submitting business data:', businessData);

      next(businessData, 13); // Passes the data and directs to step 13
    } catch (error) {
      console.error('Error submitting business data:', error);
    }
  };
  const handleCheck = (value) => {
    setBusinessRegister(value);
  };
  const handleSecondCheck = (value) => {
    setBusinessAddress(value);
    if (business_and_home === 'yes') {
      next(HomeAddress, 11);
    }
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
     <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src={images.Vector3}
        alt="Background Design"
        className="absolute top-0 right-[32rem] w-24 h-24"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[11.5rem] right-[41rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[11.5rem] right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[6rem] right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[7rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[9rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[10rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[800px]">
        <Formik
          initialValues={{
            businessName: '',
            tin_No: '',
            businessRegNumber: '',
            businessCategory: '',
            businessType: '',
            business_registered: [],
            business_address: [{}],
          }}
          // validationSchema={BusinessDetailsSchema}
          onSubmit={handleSubmit}>
          {(formik) => (
            <Form className="xl:w-[600px] w-full space-y-4">
              <div className="xl:pt-8 p-4 pt-[1rem] md:px-12 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold md:text-[24px]  xl:text-[32px] text-nowrap text-xl xl:leading-10">
                  Enter Business Details
                </div>

                <div className="xl:w-full md:w-[85%] items-start flex flex-col space-y-2 ">
                  <div className="w-full flex flex-col space-y-2 ">
                    <label
                      htmlFor="businessName"
                      className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75
                      ">
                      Business Name
                    </label>
                    <Field
                      name="businessName"
                      type="text"
                      placeholder="Enter Business Name"
                      className=" w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none text-[13px] md:text-base font-medium rounded-[5px] py-2 px-[10px]"
                    />
                    <ErrorMessage
                      name="businessName"
                      component="span"
                      className="text-[#db3a3a] text-xs md:text-sm"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-2 ">
                    <label
                      htmlFor="businessCategory"
                      className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                      {' '}
                      Business Category{' '}
                    </label>
                    <Field
                      as="select"
                      name="businessCategory"
                      value={formik.values.businessCategory}
                      className="text-primary w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-xs md:text-base text-gray rounded-[5px] py-2 px-8 bg-secondary">
                      <option
                        value=""
                        className="!bg-secondary text-primary text-xs md:text-base font-medium"
                        disabled>
                        Select Business Category
                      </option>
                      <option
                        value="information-technology"
                        className="!bg-secondary text-primary text-xs md:text-base font-medium">
                        Information Technology
                      </option>
                      <option
                        value="e-commerce"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        E-commerce
                      </option>
                      <option
                        value="real-estate"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        Real Estate
                      </option>
                      <option
                        value="agriculture-and-farming"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        Agriculture and Farming
                      </option>
                      <option
                        value="retail-and-wholesale"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        Retail and Wholesale
                      </option>
                    </Field>
                    <ErrorMessage
                      name="businessCategory"
                      component="span"
                      className="text-[#db3a3a] text-sm"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="other" className="text-secondary block mb-2 w-full text-sm">
                      Other
                    </label>
                    <Field
                      type="text"
                      id="other"
                      name="other"
                      placeholder="Enter Your Business category"
                      className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-[#db3a3a] mt-2 text-sm"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-2 ">
                    <label
                      htmlFor="businessType"
                      className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                      {' '}
                      Business Type{' '}
                    </label>
                    <Field
                      as="select"
                      name="businessType"
                      value={formik.values.businessType}
                      onChange={formik.handleChange}
                      className="text-primary w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-xs md:text-base text-gray rounded-[5px] py-2 px-8 bg-secondary">
                      <option
                        value=""
                        className="!bg-secondary text-primary text-sm md:text-base font-medium"
                        disabled>
                        Select Business Type
                      </option>
                      <option
                        value="ltd"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        LTD
                      </option>
                      <option
                        value="plc"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        PLC
                      </option>
                      <option
                        value="ngo"
                        className="!bg-secondary text-primary text-sm md:text-base font-medium">
                        NGO
                      </option>
                    </Field>{' '}
                    <ErrorMessage
                      name="businessType"
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

                  {business_is_registered === 'yes' && (
                    <>
                      <div className="w-full flex flex-col space-y-2 ">
                        <label
                          htmlFor="businessRegNumber"
                          className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                          Business Registration Number
                        </label>
                        <Field
                          name="businessRegNumber"
                          type="text"
                          placeholder="Enter Business Registration Number"
                          className="w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none font-light text-[13px] md:text-base text-gray rounded-[5px] py-2 px-[10px]"
                        />
                        <ErrorMessage
                          name="businessRegNumber"
                          component="span"
                          className="text-[#db3a3a] text-xs md:text-sm"
                        />
                      </div>
                      <div className="w-full flex flex-col space-y-2 ">
                        <label
                          htmlFor="tin_No"
                          className="text-xs md:text-sm font-normal text-[#1A1D1F] opacity-75">
                          Tax Identification Number
                        </label>
                        <Field
                          name="tin_No"
                          type="text"
                          placeholder="Enter Tax Identification Number"
                          className="w-full h-10 md:h-[3.4rem] border border-[#9ca3af] outline-none font-light text-[13px] md:text-base text-gray rounded-[5px] py-2 px-[10px]"
                        />
                        <ErrorMessage
                          name="tin_No"
                          component="span"
                          className="text-[#db3a3a] text-xs md:text-sm"
                        />
                      </div>
                    </>
                  )}

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
                  children={loading ? 'loading...' : 'Next'}
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8"
                  disabled={loading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style>{selectArrow}</style>
    </div>
  );
};
