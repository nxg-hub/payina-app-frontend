import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useLocalStorage from '../../../../hooks/useLocalStorage';

// Validation schema for the password channge form
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('required'),
  newPassword: Yup.string().required('required'),
  confirmPassword: Yup.string().required('required'),
});

const PasswordSetting = () => {
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');

  const handleSubmit = async (values, actions) => {
    const { resetForm } = actions;
    console.log(import.meta.env.VITE_INAPP_PASSWORD_UPDATE);
    setUploadStatus('');
    if (values.newPassword !== values.confirmPassword) {
      setUploadStatus('Passwords must be the same!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_INAPP_PASSWORD_UPDATE,
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUploadStatus('Password reset successful!');
        setSuccess(true);
      }
    } catch (err) {
      setUploadStatus(err?.response?.data ? err.response.data : `Error:Something went wrong`);
      console.log(err);
    } finally {
      setLoading(false);
    }

    resetForm();
  };
  return (
    <div className="h-[100vh]">
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="py-5 w-[80%] md:w-[60%] m-auto bg-primary border-2 border-[#a0a0a0] shadow-2xl rounded-xl mt-[100px] mb-[50px]">
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-5 relative ">
                <label className="font-bold block md:text-md" htmlFor="oldPassword">
                  Old Password
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="oldPassword"
                />
                <ErrorMessage className="text-red-500" name="oldPassword" component="div" />
              </div>
              <div className="py-5 relative">
                <label className="font-bold block md:text-md" htmlFor="newPassword">
                  New Password
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="newPassword"
                />
                <ErrorMessage className="text-red-500" name="newPassword" component="div" />
              </div>
              <div className="py-5 relative">
                <label className="font-bold block md:text-md" htmlFor="confirmPassword">
                  confirmPassword
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
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
                {loading ? 'Loading...' : 'Reset'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordSetting;
