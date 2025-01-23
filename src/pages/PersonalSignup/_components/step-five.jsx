import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { previousStep } from '../../../Redux/PersonalSignUpSlice';

const StepFiveValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
});

export const StepFive = ({ next, bvnData, ninData, email, initialValues }) => {
  const userEmail = localStorage.getItem('userEmail');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  // Robust data extraction with fallbacks
  const extractData = () => {
    return {
      gender: bvnData?.gender || ninData?.gender || initialValues?.gender,
      firstName: ninData?.firstname || bvnData?.firstname || initialValues?.firstname,
      lastName: bvnData?.lastname || ninData?.lastname || initialValues?.lastname,
      dob: bvnData?.dob || ninData?.dob || initialValues?.dob,
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
          gender: values.gender || bvnData.gender || ninData.gender,
          email: userEmail,
          firstName: values.firstName || bvnData.firstname || ninData.firstname,
          lastName: values.lastName || bvnData.lastname || ninData.lastname,
          dob: values.dob || bvnData.dob || ninData.dob,
          bvn: initialValues.identificationNumber,
          accountType: 'personal',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        next(values);
      } else {
        setApiError(data.debugMessage || 'Failed to save username. Please try again.');
      }
    } catch (error) {
      setApiError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  localStorage.setItem('currentStep', 5);

  const extractedData = extractData();

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
                value={bvnData.firstname || ninData.firstname || values.firstName}
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none  rounded-[5px] py-2 px-[10px]"
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
                value={bvnData.lastname || ninData.lastname || values.lastName}
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none rounded-[5px] py-2 px-[10px]"
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
                value={bvnData.gender || ninData.gender || values.gender}
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none rounded-[5px] py-2 px-[10px]">
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
                value={bvnData.dob || ninData.dob || values.dob}
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none  rounded-[5px] py-2 px-[10px]"
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
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none  rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-[#db3a3a] mt-2 text-sm"
              />
            </div>

            {apiError && <div className="text-red-500 mb-4">{apiError}</div>}
            <div className=" flex gap-2">
              <button
                disabled={loading}
                onClick={handlePrevious}
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6">
                back
              </button>
              <CustomButton
                padding="15px"
                type="submit"
                children={loading ? 'Saving...' : 'Next'}
                className={`hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6 ${
                  !(isValid && dirty) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!(isValid && dirty) || loading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
