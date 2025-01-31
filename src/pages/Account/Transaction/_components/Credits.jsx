import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCredits } from '../../../../Redux/transactionsSlice';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { Link } from 'react-router-dom';
import { LiaGreaterThanSolid } from 'react-icons/lia';

const Credits = () => {
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage('authToken', '');

  const { credits, loading, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (authToken) {
      dispatch(fetchCredits(authToken));
    }
  }, [authToken, dispatch]);

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
              {credits.length > 0 ? (
                credits.map((transaction, index) => (
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
