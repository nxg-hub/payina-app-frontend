import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { useState } from 'react';
import { images } from '../../../constants';

// const StepFourValidationSchema = Yup.object().shape({
//   idType: Yup.string().required('ID Type is required').oneOf(['BVN', 'NIN'], 'Invalid ID Type'),
//   identificationNumber: Yup.string()
//     .required('ID Number is required')
//     .when('idType', {
//       is: 'BVN',
//       then: Yup.string().length(11, 'BVN must be 11 digits'),
//       otherwise: Yup.string().length(10, 'NIN must be 10 digits'),
//     }),
// });

export const StepFour = ({ next }) => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleIDVerification = async (values) => {
    const idType = values.idType; // Example: 'NIN' or 'BVN'
    const identificationNumber = values.identificationNumber; // Example: NIN or BVN entered by the user
    setLoading(true);

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

        body: JSON.stringify({ [idType.toLowerCase()]: identificationNumber }), // Send { nin: 'value' } or { bvn: 'value' }
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
          const { firstname, lastname, gender, dob } = searchResult?.data?.identity || {};
          next({
            ...values,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            dob: dob,
          });
        } else {
          // Handle errors from Verify New Profile
          setApiError(verifyResult.message || 'Verification failed. Please try again.');
        }
      }
    } catch (error) {
      // Handle network or unexpected errors
      setApiError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  localStorage.setItem('currentStep', 4);
  const Options = [
    { value: 'BVN', label: 'BVN' },
    { value: 'NIN', label: 'NIN' },
    // { value: "Drivers License", label: "Drivers License" },
    // { value: "International Passport", label: "International Passport" },
    // { value: "Voters Card", label: "Voters Card" },
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
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src={images.Vector3}
        alt="Background Design"
        className="fixed xl:absolute top-0 right-[32rem] w-24 h-24"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="fixed xl:absolute xl:bottom-[3rem] top-[30rem] left-[35rem] xl:right-[41rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="fixed xl:absolute xl:bottom-[3rem] top-[30rem] left-[33rem] xl:right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="fixed xl:absolute xl:top-[32rem] top-[34rem] left-[50rem] xl:right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="xl:absolute fixed xl:top-[37rem] top-[39rem] left-[54rem] xl:right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="xl:absolute fixed xl:top-[36rem] top-[37.5rem] left-[51rem] xl:right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="xl:absolute xl:top-[30rem] top-[32rem] left-[51rem] xl:right-[32rem] fixed w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[600px]">
        <div className="leading-[38px]">
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
          // validationSchema={StepFourValidationSchema}
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

              {apiError && <div className="text-red-500 mb-4">{apiError}</div>}

              <CustomButton
                padding="15px"
                type="submit"
                children={loading ? 'Loading...' : 'Next'}
                className={`hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8 ${
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
