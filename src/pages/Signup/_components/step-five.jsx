import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { useState } from 'react';

const StepFiveValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
});
export const StepFive = ({ next, bvnData, ninData, email, initialValues }) => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

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
          gender: bvnData.gender || ninData.gender,
          email: email,
          firstName: bvnData.firstname || ninData.firstname,
          lastName: bvnData.lastaame || ninData.lastname,
          dob: bvnData.dob || ninData.dob,
          bvn: initialValues.identificationNumber,
          accountType: 'corporate',
          bvnverificationStatus: "VERIFIED"

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

  return (
    <div className="p-2 xl:p-[74px] bg-primary">
      <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl mt-4 pt-[64px] leading-[40px]">
        Kindly Confirm Personal Details
      </div>
      <Formik
        initialValues={{
          username: '',
        }}
        validationSchema={StepFiveValidationSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({ isValid, dirty }) => (
          <Form className="mt-8">
            <div className="my-2">
              <label htmlFor="firstname" className="text-secondary block mb-4 w-full text-sm">
                First Name
              </label>
              <Field
                type="text"
                id="firstname"
                name="firstname"
                value={bvnData.firstname || ninData.firstname}
                readOnly
                className=" w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
              />
            </div>

            <div className="my-2">
              <label htmlFor="lastname" className="text-secondary block mb-4 w-full text-sm">
                Last Name
              </label>
              <Field
                type="text"
                id="lastname"
                name="lastname"
                value={bvnData.lastName || ninData.lastname}
                readOnly
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
              />
            </div>

            <div className="my-2">
              <label htmlFor="gender" className="text-secondary block mb-4 w-full text-sm">
                Gender
              </label>
              <Field
                type="text"
                id="gender"
                name="gender"
                value={bvnData.gender || ninData.gender}
                readOnly
                className=" w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
              />
            </div>

            <div className="my-2">
              <label htmlFor="dob" className="text-secondary block mb-4 w-full text-sm">
                Date of Birth
              </label>
              <Field
                type="text"
                id="dob"
                name="dob"
                value={bvnData.dob || ninData.dob}
                readOnly
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
              />
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
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
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
