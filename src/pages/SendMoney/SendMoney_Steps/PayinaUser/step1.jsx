import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { RecieverSchema } from './schemas/schemas.js';
import axios from 'axios';

const RecipientDetails = ({ nextStep }) => {
  const verifyPayinaUsername = async (payinaUsername) => {
    try {
      const endpoint = import.meta.env.VITE_GET_PAYINA_TAG_ENDPOINT.replace(
        '{username}',
        payinaUsername
      );
      console.log(`Requesting endpoint for username: ${endpoint}`);

      const response = await axios.get(endpoint);
      console.log('API username response data:', response.data);
      return response.data && response.data.payinaUserName ? response.data.payinaUserName : null;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(`Payina username "${payinaUsername}" not found.`);
      } else {
        console.error('Error verifying payina username:', error);
      }
      return null;
    }
  };

  const verifyAccountNumber = async (accountNumber) => {
    try {
      const endpoint = import.meta.env.VITE_GET_ACCOUNT_NUMBER_ENDPOINT;
      const response = await axios.get(`${endpoint}?accountNumber=${accountNumber}`);
      console.log('API account number response:', response.data);

      const isValid = response.data && response.data.customerId != null;
      return isValid;
    } catch (error) {
      console.error('Error verifying account number:', error);
      return false;
    }
  };

  const handleSubmit = async (values, { setFieldError }) => {
    if (values.payinaTag !== values.confirmPayinaTag) {
      setFieldError('confirmPayinaTag', 'Payina Tag and Confirm Payina Tag must match.');
      return;
    }

    let isValid;
    if (isNaN(values.payinaTag)) {
      const payinaUsername = await verifyPayinaUsername(values.payinaTag);
      isValid = payinaUsername !== null;

      if (isValid) {
        nextStep({ payinaTag: values.payinaTag });
      } else {
        setFieldError(
          'confirmPayinaTag',
          'Invalid Payina username. Please re-enter the correct one.'
        );
      }
    } else {
      isValid = await verifyAccountNumber(values.payinaTag);
      console.log(`Account number validity for "${values.payinaTag}":`, isValid);

      if (isValid) {
        nextStep({ payinaTag: values.payinaTag });
      } else {
        setFieldError(
          'confirmPayinaTag',
          'Invalid account number. Please re-enter the correct one.'
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-left justify-left gap-4 form mt-5">
      <span className="text-md md:text-xl font-medium mt-5">Recipient Details</span>
      <Formik
        initialValues={{
          payinaTag: '',
          confirmPayinaTag: '',
        }}
        validationSchema={RecieverSchema}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex flex-col items-left gap-2">
              <label htmlFor="payinaTag" className="text-left font-md text-md">
                Payina Tag
              </label>
              <Field
                name="payinaTag"
                type="text"
                placeholder="Enter Recipient Payina Tag or Account Number"
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
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
              <Field
                name="confirmPayinaTag"
                type="text"
                placeholder=""
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="confirmPayinaTag"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[250px] xl:mr-0 mr-5 xl:w-[300px] text-primary">
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
