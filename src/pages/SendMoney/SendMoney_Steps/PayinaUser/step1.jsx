import React, { useState, useRef } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { RecieverSchema } from './schemas/schemas.js';
import axios from 'axios';

const RecipientDetails = ({ nextStep }) => {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const debounceTimeoutRef = useRef(null);

  const verifyPayinaUsername = async (payinaUsername) => {
    try {
      const endpoint = import.meta.env.VITE_GET_PAYINA_TAG_ENDPOINT.replace(
        '{username}',
        payinaUsername
      );
      console.log(`Requesting endpoint for username: ${endpoint}`);

      const response = await axios.get(endpoint);
      console.log('API username response data:', response.data);
      return response.data && response.data.payinaUserName
        ? {
            isValid: true,
            message: `${response.data.firstName} ${response.data.lastName}`,
          }
        : {
            isValid: false,
            message: `PayinaTag "${payinaUsername}" not found.`,
          };
    } catch (error) {
      console.error('Error verifying payina username:', error);
      return {
        isValid: false,
        message: 'PayinaTag not found',
      };
    }
  };

  const verifyAccountNumber = async (accountNumber) => {
    try {
      const endpoint = import.meta.env.VITE_GET_ACCOUNT_NUMBER_ENDPOINT;
      const response = await axios.get(`${endpoint}?accountNumber=${accountNumber}`);
      // console.log('API account number response:', response.data);

      const isValid = response.data && response.data.customerId != null;
      return {
        isValid,
        message: isValid
          ? `${response.data.firstName} ${response.data.lastName}`
          : `PayinaTag "${accountNumber}" not found.`,
      };
    } catch (error) {
      console.error('Error verifying account number:', error);
      return {
        isValid: false,
        message: 'Account number not found',
      };
    }
  };

  const handleValidation = async (payinaTag) => {
    if (isNaN(payinaTag)) {
      return await verifyPayinaUsername(payinaTag);
    } else {
      return await verifyAccountNumber(payinaTag);
    }
  };

  const handleInputChange = (payinaTag, setFieldValue) => {
    if (!payinaTag) {
      setConfirmationMessage('');
      setFieldValue('confirmPayinaTag', '');
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      setIsVerifying(true);

      const validation = await handleValidation(payinaTag);
      setIsVerifying(false);
      setConfirmationMessage(validation.message);

      if (validation.isValid) {
        setFieldValue('confirmPayinaTag', validation.message);
      } else {
        setFieldValue('confirmPayinaTag', '');
      }
    }, 1800);
  };

  const handleSubmit = async (values, { setFieldError }) => {
    if (!confirmationMessage || confirmationMessage.includes('not found')) {
      setFieldError('payinaTag', 'Invalid PayinaTag or Account Number. Please try again.');
      return;
    }
    const nameParts = confirmationMessage.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    nextStep({
      payinaTag: values.payinaTag,
      firstName: firstName,
      lastName: lastName,
    });
  };

  return (
    <div className="flex flex-col items-left justify-left gap-4 form mt-5 lg:ml-0 ml-2">
      <span className="text-md md:text-xl font-medium mt-5">Recipient Details</span>
      <Formik
        initialValues={{
          payinaTag: '',
          firstName: '',
          lastName: '',
        }}
        validationSchema={RecieverSchema}
        onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form>
            <div className="flex flex-col items-left gap-2">
              <label htmlFor="payinaTag" className="text-left font-md text-md">
                Payina Tag
              </label>
              <Field
                name="payinaTag"
                type="text"
                placeholder="Enter Recipient Payina Tag or Account Number"
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                onChange={(e) => {
                  const payinaTag = e.target.value;
                  setFieldValue('payinaTag', payinaTag);
                  handleInputChange(payinaTag, setFieldValue);
                }}
              />
              <ErrorMessage
                name="payinaTag"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col w-full py-4 space-y-4">
              <label htmlFor="confirmPayinaTag" className="text-left font-md text-md">
                Confirm Payina Tag
              </label>
              <div
                name="confirmPayinaTag"
                type=""
                placeholder=""
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm text"
                readOnly>
                {isVerifying
                  ? 'Verifying...'
                  : confirmationMessage || 'Enter PayinaTag to confirm here'}
              </div>
              <span
                className={`text-xs md:text-sm mt-1 ${
                  confirmationMessage.includes('not found') ? 'text-[#db3a3a]' : 'text-[#00678F]'
                }`}>
                {confirmationMessage.includes('not found')
                  ? 'PayinaTag not found'
                  : confirmationMessage && !isVerifying
                    ? 'PayinaTag Verified'
                    : ''}
              </span>
            </div>
            <div className="flex lg:justify-end">
              <button
                type="submit"
                className="rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[250px] lg:mr-0 mr-5 lg:w-[300px] text-primary">
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecipientDetails;
