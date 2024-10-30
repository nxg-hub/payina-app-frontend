import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import { images } from '../../../../../constants';

export default function TransactionTable() {
  const [authToken] = useLocalStorage('authToken', '');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      .toISOString()
      .split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(110);
  const [pageSize] = useState(100);
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
          page,
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

      // Remove duplicates based on transaction ID or reference
      const uniqueTransactions = Array.from(
        new Map(allTransactions.map((item) => [item.transactionRef, item])).values()
      );

      // Sort by date
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
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
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

  return (
    <div className="main-container flex w-full max-w-[1100px] flex-col gap-[19px] items-start flex-nowrap relative mx-auto my-0">
      {/* Controls Section */}
      <div className="flex w-full gap-4 items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange((prev) => ({ ...prev, startDate: e.target.value }))}
            className="border border-[#d9d9d9] p-2 rounded"
          />
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange((prev) => ({ ...prev, endDate: e.target.value }))}
            className="border border-[#d9d9d9] p-2 rounded"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#d9d9d9] p-2 rounded min-w-[200px]"
          />
        </div>
        <button
          onClick={toggleFields}
          className="flex px-4 py-2 gap-[10px] justify-center items-center border-solid border border-[#1a1d1f] rounded">
          {showAllFields ? 'Hide Details' : 'Show More Fields'}
        </button>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="w-full text-center">Loading...</div>
      ) : error ? (
        <div className="w-full text-center text-red-500">{error}</div>
      ) : (
        <div id="transactions-table" className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id || index} className="border-b border-gray-300">
                    <td className="px-4 py-2 border-b">
                      {transaction.type.toLowerCase() === 'credit' ? (
                        <img
                          src={images.GreenArrow}
                          className="md:w-[40px] w-[20px]"
                          alt="Credit"
                        />
                      ) : (
                        <img src={images.RedArrow} className="md:w-[40px] w-[20px]" alt="Debit" />
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">{transaction.description}</td>
                    <td className="px-4 py-2 border-b">{transaction.transactionRef}</td>
                    <td className="px-4 py-2 border-b">{transaction.status}</td>
                    <td className="px-4 py-2 border-b">{transaction.amount}</td>
                    <td className="px-4 py-2 border-b">{transaction.createdAt}</td>
                    {showAllFields && (
                      <>
                        <td className="px-4 py-2 border-b">{transaction.id}</td>
                        <td className="px-4 py-2 border-b">{transaction.previousBalance}</td>
                        <td className="px-4 py-2 border-b">{transaction.newBalance}</td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button onClick={handlePreviousPage} disabled={page === 0}>
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages - 1}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
