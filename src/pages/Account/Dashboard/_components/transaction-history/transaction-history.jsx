// import React, { useState, useEffect } from 'react';
// import useLocalStorage from '../../../../../hooks/useLocalStorage';

// export default function TransactionTable() {
//   const [authToken] = useLocalStorage('authToken', '');
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Set default date range to last month
//   const defaultEndDate = new Date().toISOString().split('T')[0];
//   const defaultStartDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
//     .toISOString()
//     .split('T')[0];

//   const [dateRange, setDateRange] = useState({
//     startDate: defaultStartDate,
//     endDate: defaultEndDate,
//   });

//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10); // Fixed page size of 10
//   const [totalPages, setTotalPages] = useState(1);
//   const [showAllFields, setShowAllFields] = useState(false);

//   const fetchTransactions = async (type) => {
//     try {
//       const response = await fetch(import.meta.env.VITE_TRANSACTION_HISTORY, {
//         method: 'POST',
//         headers: {
//           accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${authToken}`,
//         },
//         body: JSON.stringify({
//           type,
//           startDate: new Date(dateRange.startDate).toISOString(),
//           endDate: new Date(dateRange.endDate).toISOString(),
//           page: page - 1, // Backend expects 0-based index
//           pageSize,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch ${type} transactions: ${response.statusText}`);
//       }

//       const data = await response.json();
//       return data.data.content;
//     } catch (err) {
//       console.error(`Error fetching ${type} transactions:`, err);
//       throw err;
//     }
//   };

//   const fetchAllTransactions = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const [creditTransactions, debitTransactions] = await Promise.all([
//         fetchTransactions('CREDIT'),
//         fetchTransactions('DEBIT'),
//       ]);

//       const allTransactions = [...creditTransactions, ...debitTransactions];
//       const uniqueTransactions = Array.from(
//         new Map(allTransactions.map((item) => [item.transactionRef, item])).values()
//       );

//       // Sort by date in descending order
//       uniqueTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//       setTransactions(uniqueTransactions);
//       setTotalPages(Math.ceil(uniqueTransactions.length / pageSize) || 1);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (authToken) {
//       fetchAllTransactions();
//     } else {
//       setError('Authentication token is missing.');
//     }
//   }, [authToken, dateRange, page]);

//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (page > 1) {
//       setPage((prevPage) => prevPage - 1);
//     }
//   };

//   const filteredTransactions = transactions.filter((transaction) =>
//     Object.values(transaction).some((value) =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const toggleFields = () => {
//     setShowAllFields((prevShowAllFields) => !prevShowAllFields);
//   };

//   // Paginate filtered transactions
//   const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize);

//   return (
//     <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
//       <div className="w-full">
//         <h2 className="text-xl md:text-2xl font-bold mb-4">Transaction History</h2>
//       </div>

//       <div className="flex flex-col md:flex-row w-full gap-4 items-center justify-between mb-4">
//         <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center w-full">
//           <input
//             type="date"
//             value={dateRange.startDate}
//             onChange={(e) => setDateRange((prev) => ({ ...prev, startDate: e.target.value }))}
//             className="w-full md:w-auto font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f] border border-[#d9d9d9] p-2 rounded"
//           />
//           <input
//             type="date"
//             value={dateRange.endDate}
//             onChange={(e) => setDateRange((prev) => ({ ...prev, endDate: e.target.value }))}
//             className="w-full md:w-auto font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f] border border-[#d9d9d9] p-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Search transactions..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full md:w-auto font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f] border border-[#d9d9d9] p-2 rounded"
//           />
//         </div>
//         <button
//           onClick={toggleFields}
//           className="w-full md:w-auto mt-2 md:mt-0 font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f] flex px-4 py-2 gap-2.5 justify-center items-center border border-[#1a1d1f] rounded">
//           {showAllFields ? 'Hide Details' : 'Show More Fields'}
//         </button>
//       </div>

//       {loading ? (
//         <div className="w-full text-center font-manrope text-sm md:text-base font-normal leading-5 text-[#1a1d1f]">
//           Loading...
//         </div>
//       ) : error ? (
//         <div className="w-full text-center font-manrope text-sm md:text-base font-normal leading-5 text-[#E80516]">
//           {error}
//         </div>
//       ) : (
//         <div className="w-full overflow-x-auto">
//           <table className="min-w-full table-auto border-collapse">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-200">
//                 <th className="p-2 text-left text-xs md:text-sm">Type</th>
//                 <th className="p-2 text-left text-xs md:text-sm">Description</th>
//                 <th className="p-2 text-left text-xs md:text-sm">Reference</th>
//                 <th className="p-2 text-left text-xs md:text-sm">Status</th>
//                 <th className="p-2 text-left text-xs md:text-sm">Amount</th>
//                 <th className="p-2 text-left text-xs md:text-sm">Date</th>
//                 {showAllFields && (
//                   <>
//                     <th className="p-2 text-left text-xs md:text-sm">ID</th>
//                     <th className="p-2 text-left text-xs md:text-sm">Previous Balance</th>
//                     <th className="p-2 text-left text-xs md:text-sm">New Balance</th>
//                   </>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedTransactions.length > 0 ? (
//                 paginatedTransactions.map((transaction, index) => (
//                   <tr key={transaction.id || index} className="border-b border-[#d9d9d9]">
//                     <td className="p-2">
//                       <div className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]">
//                         {transaction.type.toLowerCase() === 'credit' ? (
//                           <svg
//                             width="42"
//                             height="42"
//                             viewBox="0 0 42 42"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="21" cy="21" r="21" fill="#00D222" />
//                             <path d="M20.5 32L11.4067 16.25H29.5933L20.5 32Z" fill="white" />
//                           </svg>
//                         ) : (
//                           <svg
//                             width="42"
//                             height="42"
//                             viewBox="0 0 42 42"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="21" cy="21" r="21" fill="#E80516" />
//                             <path d="M20.5 32L11.4067 16.25H29.5933L20.5 32Z" fill="white" />
//                           </svg>
//                         )}
//                       </div>
//                     </td>
//                     <td className="p-2 font-manrope text-xs md:text-base font-semibold leading-5 text-[#1a1d1f]">
//                       {transaction.description}
//                     </td>
//                     <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
//                       {transaction.transactionRef}
//                     </td>
//                     <td className="p-2">
//                       <div
//                         className={`flex justify-center items-center gap-2 p-1 md:p-2.5 border rounded text-xs md:text-base ${
//                           transaction.status === 'PROCESSING'
//                             ? 'border-yellow-400 bg-yellow-50'
//                             : transaction.status === 'COMPLETED'
//                               ? 'border-green-400 bg-green-50'
//                               : 'border-gray-400 bg-gray-50'
//                         }`}>
//                         <span className="font-manrope font-normal leading-5 text-[#1a1d1f]">
//                           {transaction.status}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
//                       ₦{transaction.amount.toLocaleString()}
//                     </td>
//                     <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
//                       {new Date(transaction.createdAt).toLocaleString()}
//                     </td>
//                     {showAllFields && (
//                       <>
//                         <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
//                           {transaction.id}
//                         </td>
//                         <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
//                           ₦{transaction.previousBalance.toLocaleString()}
//                         </td>
//                         <td className="p-2 font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
//                           ₦{transaction.newBalance.toLocaleString()}
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={showAllFields ? 9 : 6}
//                     className="text-center font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f] py-4">
//                     No transactions found for this period.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           <div className="flex justify-between items-center mt-4">
//             <button
//               onClick={handlePreviousPage}
//               disabled={page === 1}
//               className="font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f] px-2 md:px-4 py-1 md:py-2.5 border border-[#1a1d1f] rounded disabled:opacity-50">
//               Previous
//             </button>
//             <span className="font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f]">
//               Page {page} of {totalPages}
//             </span>
//             <button
//               onClick={handleNextPage}
//               disabled={page === totalPages}
//               className="font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f] px-2 md:px-4 py-1 md:py-2.5 border border-[#1a1d1f] rounded disabled:opacity-50">
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { FilterMenu } from './FilterMenu';
import ExportMenu from './ExportMenu';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import TransactionReceipt from '../../../../../utilities/TransactionReceipt.jsx';
import TransactionModal from '../../../../../utilities/TransactionModal';
import successImage from '../../../../../assets/images/Group-successful.png';
import errorImage from '../../../../../assets/images/Group 10275-decline.png';
import { Link } from 'react-router-dom';

export default function TransactionTable() {
  const [authToken] = useLocalStorage('authToken', '');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalDetails, setModalDetails] = useState('');
  const [currentTransactionRef, setCurrentTransactionRef] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [action, setAction] = useState(false);

  // Set default date range to last month
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

  // Define filter options based on table headers
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

      // Fetch all transactions directly without filtering by type
      const response = await fetch(
        `${import.meta.env.VITE_TRANSACTION_HISTORY}?page=${page - 1}&size=${pageSize}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            startDate: new Date(dateRange.startDate).toISOString(),
            endDate: new Date(dateRange.endDate).toISOString(),
            // page: page - 1,
            // pageSize,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(JSON.stringify(errorResponse));
      }

      const data = await response.json();

      setTotalPages(data.data.totalPages);
      const allTransactions = data.data.content;

      // Sort transactions by creation date in descending order
      allTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactions(allTransactions);
      // setTotalPages(Math.ceil(allTransactions.length / pageSize) || 1);
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

  /*
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
   */

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

  // const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize);
  const paginatedTransactions = filteredTransactions;

  // Add click outside handler
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
  const handlePullReceipt = async (currentTransactionRef) => {
    if (!currentTransactionRef) {
      setModalStatus('error');
      setModalTitle('Error');
      setModalMessage('Transaction reference not found. Please try again or contact support.');
      setShowModal(true);
      return;
    }

    try {
      setModalStatus('loading');
      setModalTitle('Fetching Receipt');
      setModalMessage('Please wait...');

      const response = await fetch(
        `${import.meta.env.VITE_GET_TRANSACTION_RECIEPT}/${currentTransactionRef}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
            // apiKey: apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch receipt: ${response.statusText}`);
      }

      const receiptData = await response.json();

      if (!receiptData || !receiptData.transactionRef || !receiptData.amount) {
        throw new Error('Invalid receipt data received');
      }

      setModalStatus(null);
      setModalTitle('');
      setModalMessage('');
      setModalDetails('');

      setModalContent(
        <TransactionReceipt
          receiptData={receiptData}
          onClose={() => {
            setShowModal(false);
            setModalContent(null);
          }}
        />
      );

      setTimeout(() => setShowModal(true), 0);
    } catch (error) {
      console.error('Error pulling receipt:', error);
      setModalStatus('error');
      setModalTitle('Error');
      setModalMessage(`Failed to fetch receipt: ${error.message}`);
      setModalContent(null);
      setShowModal(true);
    }
  };
  const handleAction = (reference) => {
    setAction(!action);
    setCurrentTransactionRef(reference);
  };
  const handleModalClose = () => {
    setShowModal(false);
    if (modalStatus === 'error') {
      setCurrentTransactionRef(null);
      setModalContent(null);
      setModalStatus(null);
      setModalTitle('');
      setModalMessage('');
      setModalDetails('');
    }
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

            {/* More Menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreMenu(() => !showMoreMenu);

                  {
                    closeOtherMenus();
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-full">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>

              {/* {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      toggleFields();
                      setShowMoreMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                    {showAllFields ? 'Hide Details' : 'Show More Fields'}
                  </button>
                </div>
              )} */}
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
                <th className="p-2 text-left">More</th>
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
                  <>
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
                      <td className="p-2 font-manrope text-sm">
                        <button onClick={() => handleAction(transaction.transactionRef)}>
                          <MoreHorizontal className="w-5 h-5 text-gray-600" />
                        </button>
                      </td>
                      {action && currentTransactionRef === transaction.transactionRef && (
                        <button
                          className="bg-white py-2 px-5 border font-bold border-stone-100 shadow-xl rounded-sm absolute w-[150px] right-[5%]"
                          onClick={() => {
                            setAction(false);
                            handlePullReceipt(transaction.transactionRef);
                          }}>
                          View Reciept
                        </button>
                      )}
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
                  </>
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
              <Link
                to="/account/transaction"
                className="text-center m-auto font-bold my-4 absolute right-10 text-blue-500">
                See more transactions
              </Link>
            </tbody>
          </table>

          {/* <div className="flex justify-between items-center mt-4">
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
          </div> */}
        </div>
      )}
      <TransactionModal
        isOpen={showModal}
        onClose={handleModalClose}
        title={modalTitle}
        message={modalMessage}
        status={modalStatus}
        details={modalDetails}
        successIcon={successImage}
        errorIcon={errorImage}
        buttons={
          modalStatus === 'success'
            ? ['pullReceipt', 'back']
            : // : modalStatus === 'error' && walletBalance !== null && Number(amount) > walletBalance
              //   ? ['fundWallet', 'back']
              modalStatus
              ? ['back']
              : []
        }
        onPullReceipt={handlePullReceipt}
        transactionRef={currentTransactionRef}
        successButtonText="Fund Wallet"
        modalContent={modalContent}
      />
    </div>
  );
}
