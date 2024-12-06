import { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { options, url } from '../../../services/countryApi';
import { state_local } from '../../../services/state-local';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';
import { HomeAddressSchema } from '../schemas/schema';

export const StepEight = ({ next }) => {
  const [countries, setCountries] = useState([]);
  const [currentState, setCurrentState] = useState('');
  const [localGovernment, setLocalGovernment] = useState([]);

  const handleSubmit = (address_details) => {
    const HomeAddress = {
      houseNumber: address_details.houseNumber,
      street: address_details.street,
      state: address_details.state,
      lga: address_details.lga,
    };

    try {
      next(HomeAddress, 11);
    } catch (error) {
      console.error('Error submitting add. data:', error);
    }
  };

  useEffect(() => {
    const currentLga = state_local
      .filter((lga) => lga.state === currentState)
      .map((lga) => lga.lgas);
    setLocalGovernment(currentLga[0]);
  }, [currentState]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url, options)).json();
      setCountries(data);
    };

    dataFetch();
  }, []);

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
          initialValues={{ houseNumber: '', street: '', state: '', lga: '' }}
          validationSchema={HomeAddressSchema}
          onSubmit={(address_details) => handleSubmit(address_details)}>
          {(formik) => (
            <Form className="w-full space-y-2">
              <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-4 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl">
                  Kindly Enter Your Address
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="houseNumber" className="text-sm font-normal text-lightBlue">
                    House Number
                  </label>
                  <Field
                    name="houseNumber"
                    type="text"
                    placeholder="Enter House Number"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage name="houseNumber" component="span" className="text-[#db3a3a]" />
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="street" className="text-sm font-normal text-lightBlue">
                    Street
                  </label>
                  <Field
                    name="street"
                    type="text"
                    placeholder="Enter Street Name"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage name="street" component="span" className="text-[#db3a3a]" />
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="country" className="text-sm font-normal text-lightBlue">
                    Country
                  </label>
                  <Field
                    as="select"
                    name="country"
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[5px] py-2 px-[10px] bg-secondary">
                    <option value="" disabled>
                      Select Country
                    </option>
                    {Array.isArray(countries) &&
                      countries.map(({ value, key }) => (
                        <option
                          key={key}
                          value={value}
                          className="!bg-secondary text-primary font-medium">
                          {value}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage name="country" component="span" className="text-[#db3a3a]" />
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="state" className="text-sm font-normal text-lightBlue">
                    State
                  </label>
                  <Field
                    as="select"
                    name="state"
                    onChange={(e) => {
                      setCurrentState(e.target.value);
                      formik.setFieldValue('state', e.target.value);
                    }}
                    value={formik.values.state}
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[5px] py-2 px-[10px] bg-secondary">
                    <option value="" disabled>
                      Select State
                    </option>
                    {countries.length !== 0 &&
                      state_local.map(({ state }) => (
                        <option
                          key={state}
                          value={state}
                          className="!bg-secondary text-primary font-medium">
                          {state}
                        </option>
                      ))}
                  </Field>
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="lga" className="text-sm font-normal text-lightBlue">
                    Local Government
                  </label>
                  <Field
                    as="select"
                    name="lga"
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[5px] py-2 px-[10px] bg-secondary">
                    <option value="" disabled>
                      Select Local Government
                    </option>
                    {localGovernment?.map((lga, i) => (
                      <option
                        key={i}
                        value={lga}
                        className="!bg-secondary text-primary font-medium">
                        {lga}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="lga" component="span" className="text-[#db3a3a]" />
                </div>
              </div>
              <CustomButton
                padding="15px"
                type="submit"
                children="Next"
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 md:w-[95%] xl:w-[75%] mx-auto w-[92%] !mb-12 xl:my-12 xl:mb-20"
              />
            </Form>
          )}
        </Formik>
      </div>
      <style>{selectArrow}</style>
    </>
  );
};
