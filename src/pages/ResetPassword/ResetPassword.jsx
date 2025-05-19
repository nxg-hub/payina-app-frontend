import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

// Validation schema for the password channge form
const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required('required'),
  confirmPassword: Yup.string().required('required'),
});
const ResetPassword = () => {
  const token = useSelector((state) => state.forgotPassword.passwordToken);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, actions) => {
    const { resetForm } = actions;
    setUploadStatus('');
    if (values.newPassword !== values.confirmPassword) {
      setUploadStatus('Passwords must be the same!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_RESET_PASSWORD}`, {
        resetToken: token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      if (response.status === 200) {
        setUploadStatus('Password successfully updated');
        setSuccess(true);
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

      <div className="flex flex-col justify-center items-center bg-white shadow-md lg:px-8 lg:py-0 px-4 rounded-lg mt-8 mx-auto w-[300px] lg:w-[600px]">
        <h1 className="text-4xl text-center text-lightBlue font-bold mt-11">Reset Password </h1>
        <span className="font-light mt-5 leading-5 text-sm xl:text-base">
          Enter a new password to reset your password
        </span>
        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="w-full justify-center flex items-center flex-col">
              <div className="w-[80%] md:w-[60%] m-auto">
                <div className="py-11 relative">
                  <label className="font-bold block md:text-md text-center" htmlFor="newPassword">
                    Enter New Password
                  </label>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                    name="newPassword"
                  />
                  <ErrorMessage className="text-red-500" name="newPassword" component="div" />
                  {showPassword ? (
                    <BsEye onClick={handleShowPassword} className="absolute top-[5rem] right-4" />
                  ) : (
                    <BsEyeSlash
                      onClick={handleShowPassword}
                      className="absolute top-[5rem] right-4"
                    />
                  )}
                </div>
              </div>
              <div className="w-[80%] md:w-[60%] m-auto">
                <div className="py-11 relative">
                  <label
                    className="font-bold block md:text-md text-center"
                    htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <Field
                    className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                  />
                  <ErrorMessage className="text-red-500" name="confirmPassword" component="div" />
                </div>
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

export default ResetPassword;
