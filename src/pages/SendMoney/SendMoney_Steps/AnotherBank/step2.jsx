import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { AmountSchema } from './schemas/schemas.js';

const currencies = [
  { code: 'NGN', name: 'Naira (NGN)' },
  // { code: 'GHS', name: 'Ghanaian Cedi (GHS)' },
  // { code: 'KES', name: 'Kenyan Shilling (KES)' },
  // { code: 'UGX', name: 'Ugandan Shilling (UGX)' },
  // { code: 'ZAR', name: 'South African Rand (ZAR)' },
  // { code: 'TZS', name: 'Tanzanian Shilling (TZS)' },
  // { code: 'RWF', name: 'Rwandan Franc (RWF)' },
  // { code: 'ETB', name: 'Ethiopian Birr (ETB)' },
  // { code: 'XOF', name: 'West African CFA Franc (XOF)' },
  // { code: 'XAF', name: 'Central African CFA Franc (XAF)' },
];

const AmountDetails = ({ nextStep }) => {
  const handleSubmit = (values) => {
    nextStep({ amount: values.amount, purpose: values.purpose, currency: values.currency });
  };

  return (
    <div className="flex flex-col items-left justify-between gap-4 form mt-5 lg:ml-0 ml-3">
      <span className="text-md md:text-xl font-medium mt-5">Amount Details</span>
      <Formik
        initialValues={{
          amount: '',
          currency: '',
          purpose: '',
        }}
        validationSchema={AmountSchema}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex flex-col items-left gap-2">
              <label htmlFor="amount" className="text-left font-md text-md">
                How much are you sending?
              </label>
              <Field
                name="amount"
                type="text"
                placeholder="Enter Amount"
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="amount"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col items-left gap-2 mt-3">
              <label htmlFor="currency" className="text-left font-md text-md">
                Currency?
              </label>
              <Field
                as="select"
                name="currency"
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm">
                <option value="" label="Select currency" />
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="currency"
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
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="purpose"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex lg:justify-end mt-5">
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

export default AmountDetails;
