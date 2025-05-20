import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const BvnValidationSchema = Yup.object().shape({
  idType: Yup.string().required('ID Type is required').oneOf(['BVN', 'NIN'], 'Invalid ID Type'),
  identificationNumber: Yup.string().required('ID Number is required'),
});

export const BvnModal = ({ next, onClose }) => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleIDVerification = async (values) => {
    const { idType, identificationNumber } = values;
    setApiError('');
    localStorage.setItem('bvn', values.identificationNumber);
    // console.log('bvn', identificationNumber.length);

    if (!idType) {
      setApiError('Select Identity');
      return;
    }

    if (identificationNumber.length !== 11) {
      setApiError('Identification number must be 11 digits!');

      return;
    }

    setLoading(true);
      const BASE_URL = import.meta.env.VITE_BASE_URL
      const NIN_SEARCH = import.meta.env.VITE_NIN_SEARCH_EXISTING_PROFILE_ENDPOINT
      const NIN_VERIFY = import.meta.env.VITE_NIN_VERIFY_NEW_PROFILE_ENDPOINT
      const BVN_SEARCH = import.meta.env.VITE_NIN_SEARCH_EXISTING_PROFILE_ENDPOINT
      const BVN_VERIFY = import.meta.env.VITE_NIN_SEARCH_EXISTING_PROFILE_ENDPOINT

    const endpoints = {
       NIN: {
        search: `${BASE_URL}${NIN_SEARCH}`,
        verify:  `${BASE_URL}${NIN_VERIFY}`,
      },
      BVN: {
        search: `${BASE_URL}${BVN_SEARCH}`,
        verify:  `${BASE_URL}${BVN_VERIFY}`,
      },
    };

    try {
      // **Search Profile**
      const searchResponse = await fetch(endpoints[idType].search, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [idType.toLowerCase()]: identificationNumber }),
      });

      const searchResult = await searchResponse.json();

      if (searchResponse.ok && searchResult?.data?.identity) {
        const { firstname = '', lastname = '', gender = '', dob = '' } = searchResult.data.identity;

        next({ ...values, firstname, lastname, gender, dob });
      } else {
        // **Verify New Profile**
        const verifyResponse = await fetch(endpoints[idType].verify, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [idType.toLowerCase()]: identificationNumber }),
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResponse.ok && verifyResult?.data?.identity) {
          const {
            firstname = '',
            lastname = '',
            gender = '',
            dob = '',
          } = verifyResult.data.identity;
          next({ ...values, firstname, lastname, gender, dob });
        } else {
          // **Handle API Error Messages**
          // setApiError(verifyResult?.message || 'Verification failed. Please try again.');
          setApiError('Verification failed. Please try again later.');
        }
      }
    } catch (error) {
      console.error('API Call Error:', error);
      setApiError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center border-2 border-[#a0a0a0] bg-black bg-opacity-40 overflow-y-auto p-4">
      <div className="bg-white p-11 rounded shadow-lg w-[500px] max-h-[90%] overflow-y-auto relative">
        <div className="leading-[38px]">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 font-bold text-red-500 text-2xl">
            X
          </button>

          <h1 className="text-secondary text-start  xl:text-[32px] text-nowrap text-xl">
            Kindly Provide Identification
          </h1>
          <p>How would you like us to identify you?</p>
        </div>
        <Formik
          initialValues={{
            idType: '',
            identificationNumber: '',
          }}
          validationSchema={BvnValidationSchema}
          onSubmit={(values) => {
            handleIDVerification(values); // Single handler for both BVN and NIN
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
                  className="w-full px-[27px] py-[16px] border-[0.5px] border-[#00678F] rounded-md text-primary  bg-secondary ">
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
                <ErrorMessage
                  name={values.idType === 'BVN' ? 'BVN' : 'NIN'}
                  component="div"
                  className="text-[#db3a3a] mt-2"
                />
              </div>
              {apiError && <h2 className="text-[#db3a3a]">{apiError}</h2>}
              <button
                padding="15px"
                type="submit"
                children={loading ? 'Loading...' : 'Next'}
                className={`hover:cursor-pointer flex justify-center items-center !text-white text-lg !border-none !bg-[#006181] font-extrabold duration-300 w-2/5 mx-auto my-8 py-2 rounded-md ${
                  !(isValid && dirty) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!(isValid && dirty)}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
