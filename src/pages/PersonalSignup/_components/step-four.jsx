import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { useState } from 'react';

export const StepFour = ({ next }) => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);

  const handleIDVerification = async (values) => {
    const idType = values.idType;
    const identificationNumber = values.identificationNumber;
    setLoading(true);
    setApiError('');
    setFallbackMode(false);

    const endpoints = {
      NIN: {
        search: import.meta.env.VITE_NIN_SEARCH_EXISTING_PROFILE_ENDPOINT,
        verify: import.meta.env.VITE_NIN_VERIFY_NEW_PROFILE_ENDPOINT,
      },
      BVN: {
        search: import.meta.env.VITE_BVN_SEARCH_EXISTING_PROFILE_ENDPOINT,
        verify: import.meta.env.VITE_BVN_VERIFY_NEW_PROFILE_ENDPOINT,
      },
    };

    try {
      // Call Search Profile Endpoint
      const searchResponse = await fetch(endpoints[idType].search, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [idType.toLowerCase()]: identificationNumber }),
      });

      const searchResult = await searchResponse.json();
      if (searchResponse.ok && searchResult.data) {
        const { firstname, lastname, gender, dob } = searchResult?.data?.identity || {};
        next({
          ...values,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          dob: dob,
        });
      } else {
        // Profile not found, call Verify New Profile
        const verifyResponse = await fetch(endpoints[idType].verify, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [idType.toLowerCase()]: identificationNumber }),
        });

        const verifyResult = await verifyResponse.json();
        if (verifyResponse.ok && verifyResult.data) {
          const { firstname, lastname, gender, dob } = verifyResult?.data?.identity || {};
          next({
            ...values,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            dob: dob,
          });
        } else {
          // Both search and verify failed, enable fallback mode
          setFallbackMode(true);
          setApiError('Verification failed. Please complete your details manually.');
        }
      }
    } catch (error) {
      // Handle network or unexpected errors
      setFallbackMode(true);
      setApiError('An error occurred. Please complete your details manually.');
    } finally {
      setLoading(false);
    }
  };

  const handleFallbackProceed = () => {
    next({
      ...{
        idType: '',
        identificationNumber: '',
      },
      fallbackMode: true,
    });
  };

  localStorage.setItem('currentStep', 4);

  const Options = [
    { value: 'BVN', label: 'BVN' },
    { value: 'NIN', label: 'NIN' },
  ];

  const optionStyle = {
    padding: '0.75rem',
    height: '',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid white',
  };

  return (
    <div className="p-2 xl:p-10 bg-primary">
      <div className="leading-[38px]">
        <h1 className="text-secondary text-start xl:text-[32px] text-xl">
          Kindly Provide Identification
        </h1>
        <p>How would you like us to identify you?</p>
      </div>

      <div className="">
        <div className="">
          <Formik
            initialValues={{
              idType: '',
              identificationNumber: '',
            }}
            onSubmit={(values) => {
              handleIDVerification(values);
            }}>
            {({ handleChange, values, isValid, dirty }) => (
              <Form className="mt-[30px]">
                <div className="my-4">
                  <label htmlFor="idType" className="text-white block mb-2"></label>
                  <Field
                    as="select"
                    id="idType"
                    name="idType"
                    onChange={handleChange}
                    value={values.idType}
                    className="w-full px-[27px] py-[16px] border-[0.5px] border-[#00678F] rounded-md text-primary bg-secondary ">
                    <option value="" disabled>
                      Select ID Type
                    </option>
                    {Options.map((option) => (
                      <option key={option.value} value={option.value} style={{ ...optionStyle }}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="idType" component="div" className="text-[#db3a3a] mt-2" />
                </div>
                <div className="my-8">
                  <label htmlFor="identificationNumber" className="text-white block mb-2"></label>
                  <Field
                    type="text"
                    id="identificationNumber"
                    value={values.identificationNumber}
                    onChange={handleChange}
                    placeholder="Enter Identification Number"
                    className="w-full px-[27px] py-[16px] border-[0.5px] border-[#00678F] rounded-md"
                    required
                  />
                </div>

                {apiError && <div className="text-red-500 mb-4">{apiError}</div>}

                {fallbackMode ? (
                  <CustomButton
                    padding="15px"
                    type="button"
                    onClick={handleFallbackProceed}
                    children="Proceed to Manual Entry"
                    className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6"
                  />
                ) : (
                  <CustomButton
                    padding="15px"
                    type="submit"
                    children={loading ? 'Loading...' : 'Next'}
                    className={`hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6 ${
                      !(isValid && dirty) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!(isValid && dirty)}
                  />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};