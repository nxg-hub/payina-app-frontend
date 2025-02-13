import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { AmountSchema } from './schemas/schemas.js';
import { useSelector } from 'react-redux';

const AmountDetails = ({ nextStep }) => {
  const [error, setError] = useState('');
  const [isAmountGreater, setIsAmountGreater] = useState(false);
  const currentBalance = useSelector((state) => state.wallet.wallet);
  const handleSubmit = (values) => {
    if (values.amount > currentBalance) {
      setIsAmountGreater(true);
      setError('Amount Entered is Greater Than Current Balance');
      return;
    }
    if (values.amount < 100) {
      setError('Amount must not be less than ₦100');
      setIsAmountGreater(false);
      return;
    }
    nextStep({ amount: values.amount, purpose: values.purpose });
  };
  // Function to format a number to Naira currency
  const formatNumber = (value) => {
    if (!value) return ''; // If input is empty, return empty string
    const numericValue = parseFloat(value.replace(/,/g, '')); // Remove commas and convert to number
    if (isNaN(numericValue)) return ''; // Ensure it's a valid number
    return numericValue.toLocaleString('en-NG'); // Format with commas
  };

  // Function to parse formatted value back to raw numeric value
  const parseNumber = (value) => {
    return value.replace(/,/g, ''); // Remove commas
  };
  return (
    <div className="flex flex-col items-left justify-between gap-4 form lg:ml-0 ml-2">
      <span className="text-md md:text-xl font-medium mt-5">Amount Details</span>
      <Formik
        initialValues={{
          amount: '',
          purpose: '',
        }}
        validationSchema={AmountSchema}
        onSubmit={handleSubmit}>
        {({ field, values, setFieldValue }) => (
          <Form>
            <div className="flex flex-col items-left gap-2">
              <label htmlFor="amount" className="text-left font-md text-md">
                How much are you sending
              </label>
              <input
                {...field}
                name="amount"
                type="text"
                value={values.amount ? formatNumber(values.amount) : ''}
                placeholder="Enter Amount"
                onChange={(e) => {
                  const rawValue = parseNumber(e.target.value); // Parse raw numeric value
                  setFieldValue('amount', rawValue); // Save raw value to Formik state
                }}
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="amount"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
              {error && (
                <p className="text-[#db3a3a] text-xs !mt-[2px] md:text-base">
                  {error}
                  <br className="md:hidden" />
                  {isAmountGreater && (
                    <span className="text-black md:px-3">
                      Balance:
                      <strong>
                        ₦{currentBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </strong>
                    </span>
                  )}{' '}
                </p>
              )}
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

export default AmountDetails;
