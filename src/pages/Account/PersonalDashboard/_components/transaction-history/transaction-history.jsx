import React, { useState, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import { FilterMenu } from '../../../Dashboard/_components/transaction-history/FilterMenu.jsx';
import { ExportMenu } from '../../../Dashboard/_components/transaction-history/ExportMenu.jsx';

export default function TransactionTable() {
  const [authToken] = useLocalStorage('authToken', '');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const defaultEndDate = new Date().toISOString().split('T')[0];
  const defaultStartDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toISOString()
    .split('T')[0];

  const [dateRange, setDateRange] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showAllFields, setShowAllFields] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({});

  const filterOptions = [
    { key: 'type', label: 'Type', options: ['CREDIT', 'DEBIT'] },
    { key: 'status', label: 'Status', options: ['COMPLETED', 'PROCESSING', 'FAILED'] },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'transactionRef', label: 'Reference', type: 'text' },
    { key: 'amount', label: 'Amount', type: 'number' },
    { key: 'createdAt', label: 'Date', type: 'date' },
  ];

  const fetchAllTransactions = async () => {
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
          startDate: new Date(dateRange.startDate).toISOString(),
          endDate: new Date(dateRange.endDate).toISOString(),
          page: page - 1,
          pageSize,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(JSON.stringify(errorResponse));
      }

      const data = await response.json();
      const allTransactions = data.data.content;

      allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactions(allTransactions);
      setTotalPages(Math.ceil(allTransactions.length / pageSize) || 1);
    } catch (err) {
      const serverError = JSON.parse(err.message);
      setError(serverError.response || 'An error occurred while fetching transactions.');
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

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const handleFilter = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (value === '') {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
    setPage(1);
  };

  const toggleFields = () => {
    setShowAllFields((prev) => !prev);
  };

  const closeOtherMenus = () => {
    setShowFilterMenu(false);
    setShowExportMenu(false);
    setShowMoreMenu(false);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(transaction[key]).toLowerCase().includes(String(value).toLowerCase());
    })
  );

  const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    const handleClickOutside = () => {
      closeOtherMenus();
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const clearAllFilters = () => {
    setFilters({});
    setPage(1);
  };

  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Transaction History</h2>
          <div className="flex gap-4">
            <FilterMenu
              showFilterMenu={showFilterMenu}
              setShowFilterMenu={setShowFilterMenu}
              filters={filters}
              filterOptions={filterOptions}
              handleFilterChange={handleFilter}
              transactions={transactions}
              clearAllFilters={clearAllFilters}
              closeOtherMenus={() => {
                setShowExportMenu(false);
                setShowMoreMenu(false);
              }}
            />

            <ExportMenu
              showExportMenu={showExportMenu}
              setShowExportMenu={setShowExportMenu}
              transactions={filteredTransactions}
              selectedRows={selectedRows}
              showAllFields={showAllFields}
              closeOtherMenus={() => {
                setShowFilterMenu(false);
                setShowMoreMenu(false);
              }}
              formatCurrency={formatCurrency}
            />

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreMenu(!showMoreMenu);
                  closeOtherMenus();
                }}
                className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="w-full text-center py-4">Loading...</div>
      ) : error ? (
        <div className="w-full text-center py-4 text-red-600">{error}</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setSelectedRows(
                        e.target.checked ? filteredTransactions.map((t) => t.id) : []
                      );
                    }}
                    checked={
                      selectedRows.length === filteredTransactions.length &&
                      filteredTransactions.length > 0
                    }
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Reference</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Date</th>
                {showAllFields && (
                  <>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Previous Balance</th>
                    <th className="p-2 text-left">New Balance</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(transaction.id)}
                        onChange={() => {
                          setSelectedRows((prev) =>
                            prev.includes(transaction.id)
                              ? prev.filter((id) => id !== transaction.id)
                              : [...prev, transaction.id]
                          );
                        }}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="p-2">
                      <div className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]">
                        {transaction.type.toLowerCase() === 'credit' ? (
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
                    <td className="p-2 font-manrope text-sm font-semibold">
                      {transaction.description}
                    </td>
                    <td className="p-2 font-manrope text-sm">{transaction.transactionRef}</td>
                    <td className="p-2">
                      <div
                        className={`inline-flex px-2 py-1 rounded-full text-sm ${
                          transaction.status === 'PROCESSING'
                            ? 'bg-yellow-50 text-yellow-800'
                            : transaction.status === 'COMPLETED'
                              ? 'bg-green-50 text-green-800'
                              : 'bg-gray-50 text-gray-800'
                        }`}>
                        {transaction.status}
                      </div>
                    </td>
                    <td className="p-2 font-manrope text-sm">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="p-2 font-manrope text-sm">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                    {showAllFields && (
                      <>
                        <td className="p-2 font-manrope text-sm">{transaction.id}</td>
                        <td className="p-2 font-manrope text-sm">
                          {formatCurrency(transaction.previousBalance)}
                        </td>
                        <td className="p-2 font-manrope text-sm">
                          {formatCurrency(transaction.newBalance)}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={showAllFields ? 10 : 7}
                    className="text-center py-4 font-manrope text-sm">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
