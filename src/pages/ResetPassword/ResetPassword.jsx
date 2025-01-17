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
      const response = await axios.post(import.meta.env.VITE_RESET_PASSWORD, {
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
    <div className="h-[100vh] bg-black  overflow-x-hidden ">
      <div className=" ">
        <img className="m-auto mt-11" src={logo} alt="" />
      </div>
      <h1 className="text-4xl text-center text-white font-bold mt-11">Reset Password </h1>

      <Formik
        initialValues={{ newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="py-5 w-[80%] md:w-[60%] m-auto bg-primary border-2 border-[#a0a0a0] shadow-2xl rounded-xl mt-[100px] mb-[50px]">
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
                  <BsEye onClick={handleShowPassword} className="absolute top-10 right-1" />
                ) : (
                  <BsEyeSlash onClick={handleShowPassword} className="absolute top-10 right-1" />
                )}
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-11 relative">
                <label className="font-bold block md:text-md text-center" htmlFor="confirmPassword">
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
                <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'}`}>
                  {uploadStatus}
                </p>
              )}
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
            <Link className="ml-24 font-bold underline text-blue-600" to="/login">
              Back to login
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
