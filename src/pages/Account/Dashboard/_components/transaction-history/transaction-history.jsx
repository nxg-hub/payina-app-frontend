import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../../../../hooks/useLocalStorage';

export default function TransactionTable() {
  const [authToken] = useLocalStorage('authToken', '');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set default date range to last month
  const defaultEndDate = new Date().toISOString().split('T')[0];
  const defaultStartDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0];

  const [dateRange, setDateRange] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); // Fixed page size of 10
  const [totalPages, setTotalPages] = useState(1);
  const [showAllFields, setShowAllFields] = useState(false);

  const fetchTransactions = async (type) => {
    try {
      const response = await fetch(import.meta.env.VITE_TRANSACTION_HISTORY, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          type,
          startDate: new Date(dateRange.startDate).toISOString(),
          endDate: new Date(dateRange.endDate).toISOString(),
          page: page - 1, // Backend expects 0-based index
          pageSize,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} transactions: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data.content;
    } catch (err) {
      console.error(`Error fetching ${type} transactions:`, err);
      throw err;
    }
  };

  const fetchAllTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const [creditTransactions, debitTransactions] = await Promise.all([
        fetchTransactions('CREDIT'),
        fetchTransactions('DEBIT'),
      ]);

      const allTransactions = [...creditTransactions, ...debitTransactions];
      const uniqueTransactions = Array.from(
        new Map(allTransactions.map((item) => [item.transactionRef, item])).values()
      );

      // Sort by date in descending order
      uniqueTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setTransactions(uniqueTransactions);
      setTotalPages(Math.ceil(uniqueTransactions.length / pageSize) || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchAllTransactions();
    } else {
      setError('Authentication token is missing.');
    }
  }, [authToken, dateRange, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const filteredTransactions = transactions.filter((transaction) =>
    Object.values(transaction).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleFields = () => {
    setShowAllFields((prevShowAllFields) => !prevShowAllFields);
  };

  // Paginate filtered transactions
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      {/* Title Section */}
      <div className="w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Transaction History</h2>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row w-full gap-4 items-center justify-between mb-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center w-full">
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange((prev) => ({ ...prev, startDate: e.target.value }))}
            className="w-full md:w-auto font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f] border border-[#d9d9d9] p-2 rounded"
          />
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange((prev) => ({ ...prev, endDate: e.target.value }))}
            className="w-full md:w-auto font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f] border border-[#d9d9d9] p-2 rounded"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f] border border-[#d9d9d9] p-2 rounded"
          />
        </div>
        <button
          onClick={toggleFields}
          className="w-full md:w-auto mt-2 md:mt-0 font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f] flex px-4 py-2 gap-2.5 justify-center items-center border border-[#1a1d1f] rounded">
          {showAllFields ? 'Hide Details' : 'Show More Fields'}
        </button>
      </div>

      {/* Table Section */}
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
              {showAllFields && (
                <>
                  <th className="p-2 text-left text-xs md:text-sm">ID</th>
                  <th className="p-2 text-left text-xs md:text-sm">Previous Balance</th>
                  <th className="p-2 text-left text-xs md:text-sm">New Balance</th>
                </>
              )}
            </tr>
            </thead>
            <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction, index) => (
                <tr key={transaction.id || index} className="border-b border-[#d9d9d9]">
                  <td className="p-2">
                    <div className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]">
                      {transaction.type.toLowerCase() === 'credit' ? (
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="21" cy="21" r="21" fill="#00D222" />
                          <path d="M20.5 32L11.4067 16.25H29.5933L20.5 32Z" fill="white" />
                        </svg>
                      ) : (
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <div className={`flex justify-center items-center gap-2 p-1 md:p-2.5 border rounded text-xs md:text-base ${
                      transaction.status === 'PROCESSING' ? 'border-yellow-400 bg-yellow-50' :
                        transaction.status === 'COMPLETED' ? 'border-green-400 bg-green-50' :
                          'border-gray-400 bg-gray-50'
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
                  {showAllFields && (
                    <>
                      <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
                        {transaction.id}
                      </td>
                      <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
                        ₦{transaction.previousBalance.toLocaleString()}
                      </td>
                      <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
                        ₦{transaction.newBalance.toLocaleString()}
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={showAllFields ? 9 : 6} className="text-center font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f] py-4">
                  No transactions found for this period.
                </td>
              </tr>
            )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f] px-2 md:px-4 py-1 md:py-2.5 border border-[#1a1d1f] rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f] px-2 md:px-4 py-1 md:py-2.5 border border-[#1a1d1f] rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}