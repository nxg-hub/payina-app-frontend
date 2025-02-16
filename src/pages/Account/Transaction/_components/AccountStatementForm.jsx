import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import ExportStatement from './ExportStatement';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../../Redux/loadingSlice';

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
  const [viewTransaction, setViewTransaction] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    startDate: '',
    endDate: '',
  };

  const handleSubmit = async (values, actions) => {
    // const { resetForm } = actions;
    try {
      setLoading(true);
      dispatch(showLoading());
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
      dispatch(hideLoading());
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
          <div className="bg-[#CCDFE6] z-[55] border-[#CCDFE6] border shadow-2xl rounded-md h-[200px] w-[80%] left-[10%] md:w-[35%] m-auto absolute top-[300px] md:top-[200px] md:left-[35%]">
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
            <button
              onClick={() => {
                setViewTransaction(true);
              }}
              className="text-bold px-4 py-2 bg-secondary text-white rounded left-2 bottom-3 mr-2 absolute font-bold">
              View
            </button>
          </div>
          <div className="text-black fixed top-0 left-0 right-0 w-full h-[150%] mt-[-1rem] z-50 backdrop-blur-[2px] transition-all duration-150 animate-slideLeft "></div>
        </>
      )}

      {viewTransaction && (
        <div className=" z-[60] h-[500px] w-[80%] md:w-[70%] left-[10%] md:left-[20%] overflow-y-scroll rounded-md overflow-x-scroll md:overflow-x-hidden border shadow-md fixed top-[160px] md:top-[100px] m-auto bg-[#CCDFE6]">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-3 text-left text-xs md:text-sm">Type</th>
                <th className="p-3 text-left text-xs md:text-sm">Description</th>
                <th className="p-3 text-left text-xs md:text-sm">Reference</th>
                <th className="p-3 text-left text-xs md:text-sm">Status</th>
                <th className="p-3 text-left text-xs md:text-sm">Amount</th>
                <th className="p-3 text-left text-xs md:text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction.id || index} className="border-b border-[#d9d9d9]">
                    <td className="p-2">
                      <div className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]">
                        {transaction.type === 'CREDIT' ? (
                          <svg
                            width="42"
                            height="42"
                            viewBox="0 0 42 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="21" cy="21" r="21" fill="#00D222" />
                            <path d="M20.5 32L11.4067 16.25H29.5933L20.5 32Z" fill="white" />
                          </svg>
                        ) : (
                          <svg
                            width="42"
                            height="42"
                            viewBox="0 0 42 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="21" cy="21" r="21" fill="#E80516" />
                            <path d="M20.5 32L11.4067 16.25H29.5933L20.5 32Z" fill="white" />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="p-2 font-manrope text-xs md:text-base font-semibold leading-5 text-[#1a1d1f]">
                      {transaction.description}
                    </td>
                    <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
                      {transaction.transactionRef}
                    </td>
                    <td className="p-2">
                      <div
                        className={`flex justify-center items-center gap-2 p-1 md:p-2.5 border rounded text-xs md:text-base ${
                          transaction.status === 'PROCESSING'
                            ? 'border-yellow-400 bg-yellow-50'
                            : transaction.status === 'COMPLETED'
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-400 bg-gray-50'
                        }`}>
                        <span className="font-manrope font-normal leading-5 text-[#1a1d1f]">
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
                      ₦{transaction.amount.toLocaleString()}
                    </td>
                    <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                    {/* <td className="p-2 font-manrope text-sm">
                      <button onClick={() => handleAction(transaction.transactionRef)}>
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f] py-4">
                    No transactions found within the dates passed.
                  </td>
                </tr>
              )}
            </tbody>
            <button
              onClick={() => {
                setViewTransaction(false);
              }}
              className="text-bold px-4 py-2 z-[60] bg-red-600 text-white rounded right-2 mr-0 absolute top-[0] font-bold">
              Close
            </button>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccountStatementForm;
