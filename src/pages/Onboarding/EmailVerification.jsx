import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import CustomButton from '../../components/button/button';
import { images } from '../../constants';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setStep } from '../../Redux/BusinessSignUpSlice';
import { resetState, setPersonalStep } from '../../Redux/PersonalSignUpSlice';
const verificationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});
const EmailVerification = ({}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    localStorage.setItem('userEmail', values.email);
    verifyEmail(values.email);
  };

  const verifyEmail = useCallback(async (email) => {
    setLoading(true);
    setError('');
    const encodedEmail = encodeURIComponent(email);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_EMAIL_CHECK}?email=${encodedEmail}`);
      //check if email exists in db
      const isRegistered = response.data.exists;
      //if email exists call get user by email endpoint
      if (isRegistered) {
        const response = await axios.get(
          `${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${encodeURIComponent(email)}`
        );
        if (response.status === 200) {
          const regLevel = response.data.registrationLevel;
          const userType = response.data.userType;
          //for Corporate users
          if (userType === 'CORPORATE') {
            if (regLevel === 'VALIDATE_OTP') {
              dispatch(setStep(2));
              navigate('/signup');
              return;
            }
            if (regLevel === 'BVN_VERIFICATION_DOCUMENT_UPLOAD') {
              dispatch(setStep(3));
              navigate('/signup');
              return;
            }
            if (regLevel === 'BVN_DETAILS_CONFIRMATION_SAVE_USERNAME') {
              dispatch(setStep(3));
              navigate('/signup');
              return;
            }
            if (regLevel === 'FACIAL_CAPTURE_AND_UPLOAD') {
              dispatch(setStep(5));
              navigate('/signup');
              return;
            }
            if (
              regLevel === 'CORPORATE_PROFILE_UPDATE_SET_PIN' ||
              regLevel === 'SET_TRANSACTION_PIN'
            ) {
              dispatch(setStep(15));
              navigate('/signup');
              return;
            }
            if (regLevel === 'KYC_COMPLETED') {
              navigate('/login');
              return;
            }
          }

          //for personal users
          if (userType === 'PERSONAL') {
            if (regLevel === 'VALIDATE_OTP') {
              dispatch(setPersonalStep(2));
              navigate('/personal/signUp');
              return;
            }
            if (regLevel === 'BVN_VERIFICATION_DOCUMENT_UPLOAD') {
              dispatch(setPersonalStep(3));
              navigate('/personal/signUp');
              return;
            }
            if (regLevel === 'BVN_DETAILS_CONFIRMATION_SAVE_USERNAME') {
              dispatch(setPersonalStep(3));
              navigate('/personal/signUp');
              return;
            }
            if (regLevel === 'FACIAL_CAPTURE_AND_UPLOAD') {
              dispatch(setPersonalStep(5));
              navigate('/personal/signUp');
              return;
            }
            if (
              regLevel === 'SET_TRANSACTION_PIN' ||
              regLevel === 'CORPORATE_PROFILE_UPDATE_SET_PIN'
            ) {
              dispatch(setPersonalStep(7));
              navigate('/personal/signUp');
              return;
            }
            if (regLevel === 'KYC_COMPLETED') {
              navigate('/login');
              return;
            }
          }
        }
      } else {
        //if email doesnt exist navigate user to onboarding and set the sign up steps to 0
        navigate('/account/onboarding');
        dispatch(setStep(0)); //reset the step states for both sign up processes to zero
        dispatch(resetState());
      }
      setLoading(false);
    } catch (err) {
      setError(err.message || 'An error occurred during verification');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-black h-screen">
      <div className="text-center pt-20 xl:mt-0 text-primary font-extrabold xl:text-5xl text-2xl">
        Sign up to Payina
      </div>
      <div className="hidden md:block absolute md:top-[-13.6rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-38.5rem]">
        <img src={images.Group} alt="" />
      </div>
      <div className="bg-primary w-[80%] md:w-[60%] flex flex-col justify-center items-start mx-auto mt-20">
        <Formik
          initialValues={{ email: '' }}
          validationSchema={verificationSchema}
          onSubmit={(values) => handleSubmit(values)}>
          {() => (
            <Form className="w-[70%] m-auto space-y-4">
              <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="email" className="text-sm font-normal text-lightBlue">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage name="email" component="span" className="text-[#db3a3a]" />
                </div>
              </div>
              <CustomButton
                padding="15px"
                type="submit"
                children={loading ? 'Loading...' : 'Next'}
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[75%] mx-auto w-[90%] !mb-12 xl:my-12 xl:mb-20"
              />
            </Form>
          )}
        </Formik>
        <Link to="/" className="text-blue-500 underline ml-[15%] mt-[-50px] pb-5 font-bold">
          Back
        </Link>
      </div>
    </div>
  );
};

export default EmailVerification;
