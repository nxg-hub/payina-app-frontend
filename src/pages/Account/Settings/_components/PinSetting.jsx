import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useLocalStorage from '../../../../hooks/useLocalStorage';

// Validation schema for the password channge form
const validationSchema = Yup.object().shape({
  oldPin: Yup.array()
    .of(Yup.string().matches(/^\d$/, 'Transaction Pin digit must be a single digit'))
    .required('Transaction Pin is required'),
  newPin: Yup.array()
    .of(Yup.string().matches(/^\d$/, 'Transaction Pin digit must be a single digit'))
    .required('Transaction Pin is required'),
  confirmPin: Yup.array()
    .of(Yup.string().matches(/^\d$/, 'Confirm Transaction Pin digit must be a single digit'))
    .required('Confirm Transaction Pin is required')
    .test('match', 'Transaction Pins do not match', function (value) {
      return this.parent.newPin.join('') === value.join('');
    }),
});
const PinSetting = () => {
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');

  const handleSubmit = async (values, actions) => {
    // Merge OTP and Confirm OTP values into strings
    const oldPinValue = values.oldPin.join('');
    const newPinValue = values.newPin.join('');
    const confirmPinValue = values.confirmPin.join('');
    // Check if OTP and Confirm OTP match
    if (newPinValue !== confirmPinValue) {
      setUploadStatus('Transaction Pin Must Match!');
    }

    if (oldPinValue === '' || newPinValue === '' || confirmPinValue === '') {
      setUploadStatus('All inputs must be filled!');
      setTimeout(() => setUploadStatus(''), 10000);
      return;
    }
    const { resetForm } = actions;
    setUploadStatus('');

    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_RESET_PIN,
        {
          oldPin: oldPinValue,
          newPin: newPinValue,
          confirmPin: confirmPinValue,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUploadStatus(response.data.message);
        setSuccess(true);
        resetForm();
      } else {
        setUploadStatus(response.response.data.message);
      }
    } catch (err) {
      setSuccess(false);
      setUploadStatus(err.response.data.message || `Error:Something went wrong`);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[100vh]">
      <Formik
        initialValues={{
          oldPin: ['', '', '', ''],
          newPin: ['', '', '', ''],
          confirmPin: ['', '', '', ''],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="py-5 w-[80%] md:w-[60%] m-auto bg-primary border-2 border-stone-300 shadow-2xl rounded-xl mt-[100px] mb-[50px]">
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="flex flex-col">
                <label htmlFor="oldPin" className="font-semibold pt-8">
                  Enter Old Pin:
                </label>
                <div className="flex justify-between py-4">
                  {[0, 1, 2, 3].map((index) => (
                    <Field
                      key={index}
                      type="password"
                      name={`oldPin[${index}]`}
                      maxLength="1"
                      value={values.oldPin[index]}
                      className="form-input w-12 mr-2 p-[10px] outline-none text-center border border-secondary rounded-full"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d$/.test(value)) {
                          setFieldValue(`oldPin[${index}]`, value);
                          if (value && e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          setFieldValue(`oldPin[${index}]`, '');
                          if (e.target.previousElementSibling) {
                            e.target.previousElementSibling.focus();
                          }
                        }
                      }}
                    />
                  ))}
                </div>
                <ErrorMessage name="oldPin" component="div" className="text-[#db3a3a]" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newPin" className="font-semibold pt-8">
                  Enter New Pin:
                </label>
                <div className="flex justify-between py-4">
                  {[0, 1, 2, 3].map((index) => (
                    <Field
                      key={index}
                      type="password"
                      name={`newPin[${index}]`}
                      maxLength="1"
                      value={values.newPin[index]}
                      className="form-input w-12 mr-2 p-[10px] outline-none text-center border border-secondary rounded-full"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d$/.test(value)) {
                          setFieldValue(`newPin[${index}]`, value);
                          if (value && e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          setFieldValue(`newPin[${index}]`, '');
                          if (e.target.previousElementSibling) {
                            e.target.previousElementSibling.focus();
                          }
                        }
                      }}
                    />
                  ))}
                </div>
                <ErrorMessage name="newPin" component="div" className="text-[#db3a3a]" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPin" className="font-semibold pt-8">
                  Confirm New Pin:
                </label>
                <div className="flex justify-between py-4">
                  {[0, 1, 2, 3].map((index) => (
                    <Field
                      key={index}
                      type="password"
                      name={`confirmPin[${index}]`}
                      maxLength="1"
                      value={values.confirmPin[index]}
                      className="form-input w-12 mr-2 p-[10px] outline-none text-center border border-secondary rounded-full"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d$/.test(value)) {
                          setFieldValue(`confirmPin[${index}]`, value);
                          if (value && e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          setFieldValue(`confirmPin[${index}]`, '');
                          if (e.target.previousElementSibling) {
                            e.target.previousElementSibling.focus();
                          }
                        }
                      }}
                    />
                  ))}
                </div>
                <ErrorMessage name="confirmPin" component="div" className="text-[#db3a3a]" />
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

export default PinSetting;
