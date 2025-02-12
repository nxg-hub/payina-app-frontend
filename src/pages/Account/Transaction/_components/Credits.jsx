import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCredits, resetTransactions } from '../../../../Redux/transactionsSlice';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { Link } from 'react-router-dom';
import { LiaGreaterThanSolid } from 'react-icons/lia';
import { MoreHorizontal } from 'lucide-react';
import TransactionModal from '../../../../utilities/TransactionModal';
import TransactionReceipt from '../../../../utilities/TransactionReceipt';
import successImage from '../../../../assets/images/Group-successful.png';
import errorImage from '../../../../assets/images/Group 10275-decline.png';

const Credits = ({ sortedCredits }) => {
  const [action, setAction] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalDetails, setModalDetails] = useState('');
  const [currentTransactionRef, setCurrentTransactionRef] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [pageIncrease, setPageIncrease] = useState(10);
  const dispatch = useDispatch();
  const [authToken] = useLocalStorage('authToken', '');

  const { loading, error, currentCreditPage, hasMoreCredit } = useSelector(
    (state) => state.transactions
  );

  const handleAction = (reference) => {
    setAction(!action);
    setCurrentTransactionRef(reference);
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

  // Load more transactions
  const loadMore = () => {
    setPageIncrease(pageIncrease + 10);
    if (hasMoreCredit && !loading) {
      dispatch(fetchCredits({ authToken, page: currentCreditPage + pageIncrease }));
    }
    // dispatch(resetTransactions());
  };
  useEffect(() => {
    dispatch(fetchCredits({ authToken, page: 10 }));
  }, [dispatch]);

  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      <div className="w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Recent Credit Transactions</h2>
      </div>

      {sortedCredits.length === 0 && loading ? (
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
                <th className="p-2 text-left text-xs md:text-sm">More</th>
              </tr>
            </thead>
            <tbody>
              {sortedCredits.length > 0 ? (
                sortedCredits.map((transaction, index) => (
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
          {/* Load More Button */}
          {hasMoreCredit && (
            <button
              onClick={loadMore}
              disabled={loading}
              className="mt-4 mb-4 bg-[#CCDFE6] text-black font-bold py-2 px-4 rounded m-auto  absolute md:left-[45%] xl:left-[55%] ">
              {loading ? 'Loading...' : 'Load More Trasanctions'}
            </button>
          )}
          {/* No More Data Message */}
          {!hasMoreCredit && (
            <p className="mt-4 text-gray-500 text-center font-semibold">
              No more transactions to load.
            </p>
          )}
        </div>
      )}
      <Link
        to="/account/statement"
        className="float-right pr-0 p-4 text-lightBlue flex items-center gap-2 font-medium text-xs md:text-base">
        Account Statement <LiaGreaterThanSolid color="#006181" />
      </Link>
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
};
export default Credits;
