import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Validation schema for the password channge form
const validationSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required'),
});
const PasswordOtpValidate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const userEmail = useSelector((state) => state.forgotPassword.email);
  const handleSubmit = async (values) => {
    setLoading(true);
    setUploadStatus('');
    try {
      const response = await axios.post(import.meta.env.VITE_VALIDATE_OTP_ENDPOINT, {
        otp: values.otp,
      });
      if (response.status === 200) {
        navigate('/reset-password');
      }
    } catch (err) {
      setUploadStatus(`Error:Something went wrong`);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[100vh] bg-black  overflow-x-hidden ">
      <div className=" ">
        <img className="m-auto mt-11" src={logo} alt="" />
      </div>
      <h1 className="text-4xl text-center text-white font-bold mt-11">OTP Validation </h1>

      <Formik
        initialValues={{ otp: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="py-5 w-[80%] md:w-[60%] m-auto bg-primary border-2 border-[#a0a0a0] shadow-2xl rounded-xl mt-[100px] mb-[50px]">
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-11 relative">
                <label className="font-normal block md:text-md text-center" htmlFor="otp">
                  {`Enter the OTP sent to `}
                  <strong>{userEmail}</strong>
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="number"
                  name="otp"
                />
                <ErrorMessage className="text-red-500" name="otp" component="div" />
                {uploadStatus && (
                  <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'}`}>
                    {uploadStatus}
                  </p>
                )}
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] py-2 bg-secondary rounded-md m-auto mt-2 mb-4">
              <button
                className={`bg-secondary w-full text-white font-bold px-4 py-2 rounded-md transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={isSubmitting}>
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </div>
            <Link className="ml-24 font-bold underline text-blue-600" to="/forgot-password">
              Back
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordOtpValidate;
