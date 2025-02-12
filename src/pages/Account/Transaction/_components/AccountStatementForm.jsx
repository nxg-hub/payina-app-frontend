import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import ExportStatement from './ExportStatement';

// Validation schema for the  form
const InventorySchema = Yup.object().shape({
  startDate: Yup.string().required('required'),
  endDate: Yup.string().required('required'),
});

const AccountStatementForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [transactions, setTransactions] = useState([]);

  const initialValues = {
    startDate: '',
    endDate: '',
  };

  const handleSubmit = async (values, actions) => {
    // const { resetForm } = actions;
    try {
      setLoading(true);
      setError('');

      // Fetch all transactions directly without filtering by type
      const response = await fetch(
        `${import.meta.env.VITE_TRANSACTION_HISTORY}?page=${0}&size=${1000}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
          body: JSON.stringify({
            startDate: new Date(values.startDate).toISOString(),
            endDate: new Date(values.endDate).toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(JSON.stringify(errorResponse));
      }

      const data = await response.json();
      console.log(data);
      const allTransactions = data.data.content;

      // Sort transactions by creation date in descending order
      allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactions(allTransactions);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(err.message || 'An error occurred while fetching transactions.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={InventorySchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="py-5 w-[90%] md:w-[60%] m-auto bg-primary border-2 border-[#a0a0a0] shadow-2xl rounded-xl mt-[10px] mb-[50px]">
            <h2 className="text-center font-semibold md:text-2xl">
              Choose a timeframe for your statement
            </h2>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-5">
                <label className="font-bold block md:text-md" htmlFor="startDate">
                  Start Date
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="date"
                  name="startDate"
                />
                <ErrorMessage className="text-red-500" name="startDate" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-5">
                <label className="font-bold block md:text-md" htmlFor="endDate">
                  End Date
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="date"
                  name="endDate"
                />
                <ErrorMessage className="text-red-500" name="endDate" component="div" />
              </div>
            </div>

            <div className="w-[80%] md:w-[60%] py-2 bg-secondary rounded-md m-auto mt-2 mb-4">
              <button
                className="text-center w-full text-primary font-bold"
                type="submit"
                disabled={isSubmitting}>
                {loading ? 'Fetching...' : 'Fetch'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {error && <h2 className="text-red-500 text-center">{error}</h2>}

      {success && (
        <>
          <div className="bg-[#CCDFE6] z-30 border-[#CCDFE6] border shadow-2xl rounded-md h-[200px] w-[80%] left-[10%] md:w-[35%] m-auto absolute top-[300px] md:left-[35%]">
            <article className="w-[80%] m-auto text-center font-semibold mt-5">
              <h2>Account statement fectched successfully, click on the icon below to download.</h2>
            </article>
            <div className=" m-auto text-center w-[5%] mt-5 ">
              <ExportStatement transactions={transactions} />
            </div>
            <button
              onClick={() => {
                setSuccess(false);
              }}
              className="text-bold px-4 py-2 bg-red-600 text-white rounded right-2 bottom-3 mr-2 absolute font-bold">
              Close
            </button>
          </div>
          <div className="text-black fixed top-0 left-0 right-0 w-full h-[150%] mt-[-1rem] z-20 backdrop-blur-[2px] transition-all duration-150 animate-slideLeft "></div>
        </>
      )}
    </div>
  );
};

export default AccountStatementForm;
