import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema for the password channge form
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const PasswordSetting = () => {
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values, actions) => {
    const { resetForm } = actions;
    setLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_PASSWORD_RESET_VIA_EMAIL.replace('{email}', values.email),
        {
          method: 'POST',
        }
      );

      if (response.ok) {
        setUploadStatus('Instructions on how to reset your password has been sent to your email');
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
    <div className="h-[100vh]">
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="py-5 w-[80%] md:w-[60%] m-auto bg-primary border-2 border-[#a0a0a0] shadow-2xl rounded-xl mt-[100px] mb-[50px]">
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-11 relative">
                <label className="font-bold block md:text-md" htmlFor="email">
                  Email
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="email"
                />
                <ErrorMessage className="text-red-500" name="email" component="div" />
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
                {loading ? 'Loading...' : 'Save Changes'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordSetting;
