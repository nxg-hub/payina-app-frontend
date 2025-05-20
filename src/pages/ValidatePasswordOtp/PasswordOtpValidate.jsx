import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Validation schema for the password channge form
const validationSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required').length(6, 'OTP must be exactly 6 digits'),
  email: Yup.string().required('Email is required').email('Invalid email address'),
});
const PasswordOtpValidate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const userEmail = useSelector((state) => state.forgotPassword.email);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showPhoneField, setShowPhoneField] = useState(false);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleSubmit = async (values) => {
    // console.log('Form submitted:', values);
    setLoading(true);
    setUploadStatus('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_VALIDATE_OTP_ENDPOINT}`, {
        otp: values.otp,
      });
      const data = response.data;
      if (data.status === 'ACCEPTED') {
        navigate('/reset-password');
        setLoading(false);
      } else if (data.status === 'BAD_REQUEST') {
        setUploadStatus(data.debugMessage || 'Invalid OTP');
        return;
      } else {
        setUploadStatus(data.debugMessage || 'Invalid OTP');
      }
    } catch (err) {
      setUploadStatus(`Error:Something went wrong`);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async (values, setSubmitting, setFieldValue) => {
    setCanResend(false);
    setTimer(60);
    setShowPhoneField(true);
    setUploadStatus('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_SEND_TOKEN}`, {
        email: userEmail,
        phoneNumber: values.phoneNumber,
      });
      if (response.status === 200) {
        setUploadStatus('OTP has been resent successfully!');
        setSuccess(true);
        setFieldValue('otp', '');
        document.getElementById('otp').focus();
      }
    } catch (err) {
      setUploadStatus('Error: Failed to resend OTP');
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="">
        <img className="m-auto pt-5" src={logo} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center bg-white shadow-md lg:px-8 lg:py-2 px-4 rounded-lg mt-5 mx-auto w-[300px] lg:w-[600px]">
        <h1 className="text-4xl text-center text-lightBlue font-bold mt-8 mb-2">OTP Validation </h1>
        <span className="font-light mt-5 leading-5 text-sm xl:text-base">
          We&apos;ve sent an OTP Validation code to your email address
        </span>
        <Formik
          initialValues={{ email: userEmail || '', otp: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ values, setFieldValue, setSubmitting, isSubmitting }) => (
            <Form className="w-full justify-center flex items-center flex-col">
              <Field
                name="email"
                type="text"
                readOnly
                value={userEmail}
                className="w-[60%] font-bold text-center mx-auto bg-transparent border-none h-[3.4rem] outline-none text-base xl:text-xl text-gray rounded-[5px] py-6 pb-0 px-[10px]"
              />
              <hr className="border-none bg-[#e80516] h-[1px] w-[180px] mt-2 xl:mx-auto" />

              {showPhoneField && (
                <div className="w-[60%] mt-4">
                  <Field
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter your registered phone number"
                    className="w-full font-bold text-center bg-transparent border border-gray-300 h-[3.4rem] outline-none text-base xl:text-md text-gray rounded-[5px] py-6 pb-0 px-[10px]"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-500 mt-1" />
                </div>
              )}

              <button
                type="button"
                onClick={() => handleResendOtp(values, setSubmitting, setFieldValue)}
                disabled={!canResend}
                className={`text-sm font-bold mt-10 py-[1px] px-[9px] rounded-[10px] ${
                  canResend ? 'bg-[#E80516] text-white' : 'bg-gray-400 text-gray-700'
                }`}>
                {canResend ? 'Resend OTP' : `Resend in ${timer}s`}
              </button>

              <div className="flex flex-col items-center justify-center">
                <input
                  className="lg:w-[430px] w-[300px] h-[60px] outline-none border border-[#656666bd] text-start lg:tracking-[61px] tracking-[41px] lg:indent-[1.8rem] indent-[1.4rem] lg:my-10 my-4 lg:mb-0 mt-10 text-sm lg:text-xl"
                  name="otp"
                  id="otp"
                  maxLength={6}
                  inputMode="numeric" // Ensures mobile users get a numeric keyboard
                  pattern="\d{6}"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setFieldValue('otp', value);
                  }}
                  value={values.otp}
                  autoFocus
                />
                <div className="flex lg:-mt-12 -mt-8 justify-between w-full px-4">
                  <span className="lg:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="lg:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="lg:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="lg:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="lg:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="lg:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                </div>
              </div>
              <ErrorMessage className="text-red-500" name="otp" component="div" />
              {uploadStatus && (
                <p className={`mt-4 ${success ? 'text-lightBlue' : 'text-red-500'}`}>
                  {uploadStatus}
                </p>
              )}
              <div className="w-[80%] md:w-[60%] py-2 bg-yellow rounded-md m-auto mt-10 mb-4">
                <button
                  className={`bg-yellow w-full text-lightBlue text-xl font-bold px-4 py-2 rounded-md transition ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  type="submit"
                  disabled={isSubmitting}>
                  {loading ? 'Loading...' : 'Submit'}
                </button>
              </div>
              <Link className="font-bold underline text-lightBlue text-lg" to="/forgot-password">
                Back
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordOtpValidate;
