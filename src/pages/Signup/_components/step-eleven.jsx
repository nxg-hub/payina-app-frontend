import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';
import { BusinessAddressSchema } from '../schemas/schema';
import { state_local } from '../../../services/state-local';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { previousStep } from '../../../Redux/BusinessSignUpSlice';

export const StepEleven = ({ next, initialValues, business_and_home, passedData }) => {
  const [businessState, setBusinessState] = useState('');
  const [loading, setLoading] = useState(false);
  const [localGovernment, setLocalGovernment] = useState([]);
  const dispatch = useDispatch();

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handleSubmit = (business_address) => {
    setLoading(true);
    const BusinessAddress = {
      businessHouseNumber: business_address.businessHouseNumber,
      businessStreetName: business_address.businessStreetName,
      businessState: business_address.businessState,
      businessLGA: business_address.businessLGA,
    };
    localStorage.setItem('BusinessAddress', JSON.stringify(BusinessAddress));
    try {
      // console.log('Submitting business add.:', BusinessAddress);

      next(BusinessAddress, 13);
    } catch (error) {
      console.error('Error submitting business data:', error);
    }
  };

  const sortedStates = state_local.sort((a, b) => a.state.localeCompare(b.state));
  useEffect(() => {
    setLocalGovernment([]);
    if (initialValues.state) {
      setBusinessState(initialValues.state);
    }
    const currentLga = sortedStates
      .filter((lga) => lga.state === businessState)
      .map((lga) => lga.lgas);

    setLocalGovernment(currentLga[0]);
  }, [businessState, initialValues.state]);

  const getInitialValues = () => {
    if (business_and_home === 'yes') {
      return {
        businessHouseNumber: passedData?.businessHouseNumber || initialValues.businessHouseNumber,
        businessStreetName: passedData?.businessStreetName || initialValues.businessStreetName,
        businessState: passedData?.businessState || initialValues.businessState,
        businessLGA: passedData?.businessLGA || initialValues.businessLGA,
      };
    }
    return {
      businessHouseNumber: '',
      businessStreetName: '',
      businessState: '',
      businessLGA: '',
    };
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
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[500px]">
        <Formik
          initialValues={getInitialValues()}
          enableReinitialize
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
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base  rounded-[5px] py-2 px-[10px] bg-secondary">
                    <option value="" disabled>
                      Select State
                    </option>
                    {sortedStates.map(({ state }) => (
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
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base rounded-[5px] py-2 px-[10px] bg-secondary">
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
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8">
                  back
                </button>
                <CustomButton
                  padding="15px"
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
