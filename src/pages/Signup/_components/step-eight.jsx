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
  // localStorage.setItem('currentStep', 8);
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
        className="absolute bottom-[0rem] right-[41rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[0rem] right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[0rem] right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[0rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[0rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[0rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 py-4 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[600px]">
        <Formik
          initialValues={{ houseNumber: '', street: '', state: '', lga: '' }}
          validationSchema={HomeAddressSchema}
          onSubmit={(address_details) => handleSubmit(address_details)}>
          {(formik) => (
            <Form className="w-full space-y-2">
              <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-4 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-nowrap text-xl">
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
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base rounded-[5px] py-2 px-[10px] bg-secondary">
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
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base  rounded-[5px] py-2 px-[10px] bg-secondary">
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
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base  rounded-[5px] py-2 px-[10px] bg-secondary">
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
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8"
              />
            </Form>
          )}
        </Formik>
      </div>
      <style>{selectArrow}</style>
    </div>
  );
};
