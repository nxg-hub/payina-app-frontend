import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { RecieverSchema } from './schemas/schemas.js';
import axios from 'axios';

const RecipientDetails = ({ nextStep }) => {
  const verifyPayinaTag = async (payinaTag) => {
    try {
      const endpoint = import.meta.env.VITE_GET_PAYINA_TAG_ENDPOINT.replace(
        '{username}',
        payinaTag
      );
      console.log(`Requesting endpoint: ${endpoint}`);

      const response = await axios.get(endpoint);
      console.log('API response data:', response.data);
      if (response.data && response.data.payinaUserName) {
        return response.data.payinaUserName;
      } else {
        return null;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(`Payina tag "${payinaTag}" not found.`);
      } else {
        console.error('Error verifying payina tag:', error);
      }
      return null;
    }
  };

  const handleSubmit = async (values, { setFieldError }) => {
    if (values.payinaTag !== values.confirmPayinaTag) {
      setFieldError('confirmPayinaTag', 'Payina Tag and Confirm Payina Tag must match.');
      return;
    }

    const payinaUsername = await verifyPayinaTag(values.confirmPayinaTag);
    console.log('Submitting form with values:', values);

    if (payinaUsername) {
      nextStep({ payinaTag: values.payinaTag });
    } else {
      setFieldError('confirmPayinaTag', 'Incorrect payinaTag. Please re-enter the correct one.');
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
                placeholder="Enter Recipient Payina Tag"
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="payinaTag"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col  w-full py-4 space-y-4">
              <label htmlFor="confirmPayinaTag" className="text-left font-md text-md">
                Confirm Reciever Name
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
                className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[250px] xl:mr-0 mr-5 xl:w-[300px] text-primary">
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
