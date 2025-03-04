import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setEmail, setPasswordToken } from '../../Redux/ForgotPasswordSlice';

// Validation schema for the password channge form
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values, actions) => {
    dispatch(setEmail(values.email));
    const { resetForm } = actions;
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_PASSWORD_RESET_VIA_EMAIL.replace('{email}', values.email)
      );
      if (response.status === 200) {
        navigate('/validate-otp');
        setUploadStatus('Instructions on how to reset your password has been sent to your email');
        setSuccess(true);
        const token = response.data.token;
        dispatch(setPasswordToken(token));
      }
    } catch (err) {
      setUploadStatus(`Error:Something went wrong`);
      console.log(err);
    } finally {
      setLoading(false);
    }
    resetForm();
  };
  return (
    <div className="min-h-screen bg-black">
      <div className=" ">
        <img className="m-auto pt-5" src={logo} alt="" />
      </div>

      <div className="flex flex-col justify-center items-center bg-white shadow-md lg:px-8 lg:py-2 px-4 rounded-lg mt-8 mx-auto w-[300px] lg:w-[600px]">
        <h1 className="text-4xl text-center text-lightBlue font-bold mt-11">Forgot Password </h1>
        <span className="font-light mt-5 leading-5 text-sm xl:text-base">
          Enter the email address associated to your account
        </span>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="w-full justify-center flex items-center flex-col">
              <div className="w-[80%] md:w-[60%] m-auto py-11">
                <label
                  className="font-bold block md:text-md text-base text-lightBlue"
                  htmlFor="email">
                  Email Address
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="email"
                  Placeholder="Enter your email address..."
                />
                <ErrorMessage className="text-red-500" name="email" component="div" />
                {uploadStatus && (
                  <p className={`mt-4 ${success ? 'text-lightBlue' : 'text-red-500'}`}>
                    {uploadStatus}
                  </p>
                )}
              </div>
              <div className="w-[80%] md:w-[60%] py-2 bg-yellow rounded-md m-auto mt-2 mb-4">
                <button
                  className={`bg-yellow w-full text-lightBlue text-xl font-bold px-4 py-2 rounded-md transition ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  type="submit"
                  disabled={isSubmitting}>
                  {loading ? 'Loading...' : 'Submit'}
                </button>
              </div>
              <Link className="font-bold underline text-lightBlue text-lg" to="/login">
                Back to login
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
