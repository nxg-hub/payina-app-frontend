import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { useState } from 'react';

const StepFiveValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.string().required('Date of Birth is required'),
});

export const StepFive = ({ next, bvnData, email, initialValues }) => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Robust data extraction with fallbacks
  const extractBvnData = () => {
    return {
      gender: bvnData?.gender || initialValues?.gender || '',
      firstName: bvnData?.firstName || bvnData?.firstname || initialValues?.firstname || '',
      lastName: bvnData?.lastName || bvnData?.lastname || initialValues?.lastname || '',
      dob: bvnData?.dob || initialValues?.dob || '',
    };
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setApiError('');

    try {
      const response = await fetch(import.meta.env.VITE_SAVE_USERNAME_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payinaUserName: values.username,
          gender: values.gender,
          email: email,
          firstName: values.firstName,
          lastName: values.lastName,
          dob: values.dob,
          bvn: initialValues.identificationNumber || '',
          accountType: 'personal',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        next(values);
      } else {
        setApiError(data.message || 'Failed to save username. Please try again.');
      }
    } catch (error) {
      setApiError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  localStorage.setItem('currentStep', 5);

  const extractedData = extractBvnData();

  return (
    <div className="p-2 xl:p-[74px] bg-primary">
      <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl mt-4 pt-[64px] leading-[40px]">
        Kindly Confirm Personal Details
      </div>
      <Formik
        initialValues={{
          username: '',
          firstName: extractedData.firstName,
          lastName: extractedData.lastName,
          gender: extractedData.gender,
          dob: extractedData.dob,
        }}
        validationSchema={StepFiveValidationSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({ isValid, dirty, handleChange, values }) => (
          <Form className="mt-8">
            <div className="my-2">
              <label htmlFor="firstName" className="text-secondary block mb-4 w-full text-sm">
                First Name
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-[#db3a3a] mt-2 text-sm"
              />
            </div>

            <div className="my-2">
              <label htmlFor="lastName" className="text-secondary block mb-4 w-full text-sm">
                Last Name
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-[#db3a3a] mt-2 text-sm"
              />
            </div>

            <div className="my-2">
              <label htmlFor="gender" className="text-secondary block mb-4 w-full text-sm">
                Gender
              </label>
              <Field
                as="select"
                id="gender"
                name="gender"
                onChange={handleChange}
                value={values.gender}
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-[#db3a3a] mt-2 text-sm" />
            </div>

            <div className="my-2">
              <label htmlFor="dob" className="text-secondary block mb-4 w-full text-sm">
                Date of Birth
              </label>
              <Field
                type="date"
                id="dob"
                name="dob"
                onChange={handleChange}
                value={values.dob}
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage name="dob" component="div" className="text-[#db3a3a] mt-2 text-sm" />
            </div>

            <div className="my-4">
              <label htmlFor="username" className="text-secondary block mb-2 w-full text-sm">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter Your Username"
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-[#db3a3a] mt-2 text-sm"
              />
            </div>

            {apiError && <div className="text-red-500 mb-4">{apiError}</div>}

            <CustomButton
              padding="15px"
              type="submit"
              children={loading ? 'Saving...' : 'Next'}
              className={`hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6 ${
                !(isValid && dirty) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!(isValid && dirty) || loading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
