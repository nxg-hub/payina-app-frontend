import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { AmountSchema } from './schemas/schemas.js';

const AmountDetails = ({ nextStep }) => {
  const handleSubmit = (values) => {
    nextStep({ amount: values.amount, purpose: values.purpose });
  };
  return (
    <div className="flex flex-col items-left justify-between gap-4 form">
      <span className="text-md md:text-xl font-medium mt-5">Amount Details</span>
      <Formik
        initialValues={{
          amount: '',
          purpose: '',
        }}
        validationSchema={AmountSchema}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex flex-col items-left gap-2">
              <label htmlFor="amount" className="text-left font-md text-md">
                How much are you sending
              </label>
              <Field
                name="amount"
                type="text"
                placeholder="Enter Amount"
                className="w-[700px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="amount"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col items-left gap-2 mt-3">
              <label htmlFor="purpose" className="text-left font-md text-md">
                Purpose
              </label>
              <Field
                name="purpose"
                type="text"
                placeholder=""
                className="w-[700px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="purpose"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary">
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AmountDetails;
