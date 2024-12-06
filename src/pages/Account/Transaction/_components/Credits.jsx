import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LiaGreaterThanSolid } from 'react-icons/lia';
import useLocalStorage from '../../../../hooks/useLocalStorage';
const Credits = () => {
  const [authToken] = useLocalStorage('authToken', '');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Show 5 recent transactions

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(import.meta.env.VITE_TRANSACTION_HISTORY, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          type: 'CREDIT',
          page: 0,
          pageSize: 5,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch credit transactions');
      }

      const data = await response.json();
      setTransactions(data.data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchTransactions();
    }
  }, [authToken]);

  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      <div className="w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Recent Credit Transactions</h2>
      </div>

      {loading ? (
        <div className="w-full text-center font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f]">
          Loading...
        </div>
      ) : error ? (
        <div className="w-full text-center font-manrope text-sm md:text-base font-normal leading-5 text-[#E80516]">
          {error}
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-left text-xs md:text-sm">Type</th>
                <th className="p-2 text-left text-xs md:text-sm">Description</th>
                <th className="p-2 text-left text-xs md:text-sm">Reference</th>
                <th className="p-2 text-left text-xs md:text-sm">Status</th>
                <th className="p-2 text-left text-xs md:text-sm">Amount</th>
                <th className="p-2 text-left text-xs md:text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction.id || index} className="border-b border-[#d9d9d9]">
                    <td className="p-2">
                      <div className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]">
                        <svg
                          width="42"
                          height="42"
                          viewBox="0 0 42 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle cx="21" cy="21" r="21" fill="#00D222" />
                          <path d="M20.5 32L11.4067 16.25H29.5933L20.5 32Z" fill="white" />
                        </svg>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f] py-4">
                    No credit transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <Link
        to="/account/transaction"
        className="float-right pr-0 p-4 text-lightBlue flex items-center gap-2 font-medium text-xs md:text-base">
        See All Transactions <LiaGreaterThanSolid color="#006181" />
      </Link>
    </div>
  );
};
export default Credits;
