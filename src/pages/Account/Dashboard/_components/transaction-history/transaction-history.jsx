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
            // startDate: new Date(dateRange.startDate).toISOString(),
            // endDate: new Date(dateRange.endDate).toISOString(),
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
      const updatedTransactions = updateTransactionStatuses(allTransactions);
      setTransactions(updatedTransactions);
    } catch (err) {
      const serverError = JSON.parse(err.message);
      setError(serverError.response || 'An error occurred while fetching transactions.');
    } finally {
      setLoading(false);
    }
  };
  function updateTransactionStatuses(transactions) {
    return transactions?.map((tx) => {
      const createdAt = new Date(tx.createdAt);
      const now = new Date();
      const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);

      if (tx.status === 'PENDING' && diffInDays > 7) {
        return { ...tx, status: 'FAILED' };
      }
      return tx;
    });
  }
  useEffect(() => {
    if (authToken) {
      fetchAllTransactions();
    } else {
      setError('Authentication token is missing.');
    }
  }, [authToken, dateRange, page]);

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const filteredTransactions = transactions.filter((transaction) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(transaction[key]).toLowerCase().includes(String(value).toLowerCase());
    })
  );

  const paginatedTransactions = filteredTransactions;

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
          <h2 className="text-xl md:text-2xl font-bold">Recent Transactions</h2>
          <div className="flex gap-4"></div>
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
                paginatedTransactions?.map((transaction) => (
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
                          {transaction.type.toLowerCase() === 'credit' &&
                          transaction.status.toLowerCase() === 'completed' ? (
                            <svg
                              width="42"
                              height="42"
                              viewBox="0 0 42 42"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <circle cx="21" cy="21" r="21" fill="#00d222" />
                              <path d="M21 29L13 17H29L21 29Z" fill="white" />
                            </svg>
                          ) : transaction.status.toLowerCase() === 'pending' &&
                            transaction.type.toLowerCase() === 'credit' ? (
                            <svg
                              width="42"
                              height="42"
                              viewBox="0 0 42 42"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <circle cx="21" cy="21" r="21" fill="#fff000" />
                              <path d="M21 29L13 17H29L21 29Z" fill="white" />
                            </svg>
                          ) : transaction.status.toLowerCase() === 'failed' &&
                            transaction.type.toLowerCase() === 'credit' ? (
                            <svg
                              width="42"
                              height="42"
                              viewBox="0 0 42 42"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <circle cx="21" cy="21" r="21" fill="#FF0000" />
                              <path d="M21 29L13 17H29L21 29Z" fill="white" />
                            </svg>
                          ) : (
                            <svg
                              width="42"
                              height="42"
                              viewBox="0 0 42 42"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <circle cx="21" cy="21" r="21" fill="#E80516" />
                              <path d="M21 13L13 25H29L21 13Z" fill="white" />
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
                            transaction.status === 'PENDING'
                              ? 'bg-red-50 text-yellow'
                              : transaction.status === 'COMPLETED'
                                ? 'bg-green-50 text-green-800'
                                : transaction.status === 'FAILED'
                                  ? 'bg-red-100 text-red-800'
                                  : ''
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
