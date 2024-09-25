import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';
import { BusinessAddressSchema } from '../schemas/schema';
import { state_local } from '../../../services/state-local';
import { useEffect, useState } from 'react';

export const StepEleven = ({ next, HomeAddress }) => {
  const [businessState, setBusinessState] = useState('');
  const [loading, setLoading] = useState(false);

  const [localGovernment, setLocalGovernment] = useState([]);

  const handleSubmit = (business_address) => {
    setLoading(true);
    const BusinessAddress = {
      businessHouseNumber: business_address.businessHouseNumber,
      businessStreetName: business_address.businessStreetName,
      businessState: business_address.businessState,
      businessLGA: business_address.businessLGA
    };
    try {
      // console.log('Submitting business add.:', BusinessAddress);

      next(BusinessAddress, 13);
    } catch (error) {
      console.error('Error submitting business data:', error);
    }
  };

  useEffect(() => {
    if (HomeAddress && HomeAddress.state) {
      setBusinessState(HomeAddress.state);
    }

    const currentLga = state_local
      .filter((lga) => lga.state === businessState)
      .map((lga) => lga.lgas);

    setLocalGovernment(currentLga[0]);
  }, [businessState, HomeAddress]);

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
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0
      }
  
      input[type=number] {
        -moz-appearance: textfield;
      }
     
      `;
  return (
    <>
      <div className="hidden md:block fixed md:top-[-9.5rem] xl:top-[-6.5rem] md:right-[.5rem] xl:right-[-38.5rem]">
        <img src={images.Group} alt="" />
      </div>
      <div className="hidden md:block fixed md:-z-10 md:top-[-1.5rem] xl:top-[-1rem] right-[6.5rem]">
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
      <div className="bg-primary !mt-24 xl:mt-0 flex flex-col justify-center items-start mx-auto">
        <Formik
          initialValues={{
            businessHouseNumber: '',
            businessStreetName: '',
            businessState: '',
            businessLGA: ''
          }}
          validationSchema={BusinessAddressSchema}
          onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form className="w-full space-y-4">
              <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:px-[3rem] xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl">
                  Kindly Enter Your Business Address
                </div>
                <div className="xl:w-full flex flex-col space-y-2 ">
                  <label
                    htmlFor="businessHouseNumber"
                    className="text-sm font-normal text-lightBlue">
                    Business Address Number
                  </label>
                  <Field
                    name="businessHouseNumber"
                    type="text"
                    placeholder="Enter Business Address Steet Number"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage
                    name="businessHouseNumber"
                    component="span"
                    className="text-[#db3a3a]"
                  />
                </div>
                <div className="xl:w-full flex flex-col space-y-2 ">
                  <label
                    htmlFor="businessStreetName"
                    className="text-sm font-normal text-lightBlue">
                    Street
                  </label>
                  <Field
                    name="businessStreetName"
                    id="businessStreetName"
                    type="text"
                    placeholder="Enter Business Address Steet Name"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage
                    name="businessStreetName"
                    component="span"
                    className="text-[#db3a3a]"
                  />
                </div>
                <div className="xl:w-full flex flex-col space-y-2 ">
                  <label htmlFor="businessState" className="text-sm font-normal text-lightBlue">
                    State
                  </label>
                  <Field
                    as="select"
                    name="businessState"
                    id="businessState"
                    onChange={(e) => {
                      handleChange(e);
                      setBusinessState(e.target.value);
                    }}
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[5px] py-2 px-[10px] bg-secondary">
                    <option value="" disabled>
                      Select State
                    </option>
                    {state_local.map(({ state }) => (
                      <option
                        key={state}
                        value={state}
                        className="!bg-secondary text-primary font-medium">
                        {state}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="businessState" component="span" className="text-[#db3a3a]" />
                </div>
                <div className="xl:w-full flex flex-col space-y-2 ">
                  <label htmlFor="businessLGA" className="text-sm font-normal text-lightBlue">
                    Local Government
                  </label>
                  <Field
                    as="select"
                    name="businessLGA"
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[5px] py-2 px-[10px] bg-secondary">
                    <option value="" disabled>
                      Select Local Government
                    </option>
                    {localGovernment?.map((lga, i) => (
                      <option value={lga} key={i}>
                        {lga}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="businessLGA" component="span" className="text-[#db3a3a]" />
                </div>
              </div>
              <CustomButton
                padding="15px"
                type="submit"
                children={loading ? 'loading...' : 'Next'}
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 md:w-[96.5%] xl:w-[85%] mx-auto w-[92%] !mb-12 xl:my-12 xl:mb-20"
                disabled={loading}
              />
            </Form>
          )}
        </Formik>
      </div>
      <style>{selectArrow}</style>
    </>
  );
};
