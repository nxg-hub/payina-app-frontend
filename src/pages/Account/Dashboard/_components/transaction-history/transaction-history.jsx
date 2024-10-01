// import { LiaGreaterThanSolid } from 'react-icons/lia';
// import { Link } from 'react-router-dom';
// import { images } from '../../../../../constants';
// const TransactionHistory = () => {
//   return (
//     <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
//       <div className="opacity-70 font-bold text-lightBlue py-2 text-sm md:text-base">
//         Transaction History
//       </div>
//       <div className="flex flex-col border-b border-[#D9D9D9]">
//         <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
//           <img src={images.GreenArrow} className="md:w-[40px] w-[20px]" alt="" />
//           <span className="font-medium text-xs md:text-base">Salary For August</span>
//           <span className="text-xs xl:text-base">IITA</span>
//           <span className="border border-[#24FF00] text-xs md:text-base p-2 md:p-4">
//             Successful
//           </span>
//           <span className="text-xs md:text-base">20,000</span>
//         </div>
//       </div>
//       <div className="flex flex-col border-b border-[#D9D9D9]">
//         <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
//           <img src={images.RedArrow} className="md:w-[40px] w-[20px]" alt="" />
//           <span className="font-medium text-xs md:text-base">Salary For August</span>
//           <span className="text-xs xl:text-base">IITA</span>
//           <span className="border border-[#24FF00] text-xs md:text-base p-2 md:p-4">
//             Successful
//           </span>
//           <span className="text-xs md:text-base">20,000</span>
//         </div>
//       </div>
//       <div className="flex flex-col border-b border-[#D9D9D9]">
//         <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
//           <img src={images.RedArrow} className="md:w-[40px] w-[20px]" alt="" />
//           <span className="font-medium text-xs md:text-base">Salary For August</span>
//           <span className="text-xs xl:text-base">IITA</span>
//           <span className="border border-[#24FF00] text-xs md:text-base p-2 md:p-4">
//             Successful
//           </span>
//           <span className="text-xs md:text-base">20,000</span>
//         </div>
//       </div>
//       <div className="flex flex-col border-b border-[#D9D9D9] ">
//         <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
//           <img src={images.RedArrow} className="md:w-[40px] w-[20px]" alt="" />
//           <span className="font-medium text-xs md:text-base">Salary For August</span>
//           <span className="text-xs xl:text-base">IITA</span>
//           <span className="border border-[#24FF00] p-2 md:p-4 text-xs xl:text-base">
//             Successful
//           </span>
//           <span className="text-xs md:text-base">20,000</span>
//         </div>
//       </div>
//       <Link
//         to="/account/transaction"
//         className="float-right pr-0 p-4 text-lightBlue flex items-center gap-2 font-medium text-xs md:text-base">
//         See All Transactions <LiaGreaterThanSolid color="#006181" />
//       </Link>
//     </div>
//   );
// };
//
// export default TransactionHistory;

import { useEffect, useState } from 'react';
import { LiaGreaterThanSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { images } from '../../../../../constants';
const getAuthToken = () => localStorage.getItem('authToken');

const TransactionHistory = () => {
  const [state, setState] = useState({
    transactions: [],
    loading: true,
    error: null
  });

  const getArrowImage = (type) => {
    return type === 'credit' ? images.GreenArrow : images.RedArrow;
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = getAuthToken();

      if (!token) {
        setState({
          transactions: [],
          loading: false,
          error: 'Authorization token not found.'
        });
        return;
      }

      // Get the current date
      const currentDate = new Date();

      // Get the date 10 days ago
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(currentDate.getDate() - 10);

      try {
        console.log('Fetching transactions...');
        console.log('Start Date:', currentDate.toISOString());
        console.log('End Date:', tenDaysAgo.toISOString());

        const response = await fetch(import.meta.env.VITE_TRANSACTION_HISTORY_ENDPOINT, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            walletId: '', // Ensure this is set properly if required
            startDate: currentDate.toISOString(), // Current date as start date
            endDate: tenDaysAgo.toISOString(), // 10 days before current date as end date
            type: '' // Ensure this is set properly if required
          })
        });

        const result = await response.json();

        if (response.ok) {
          // Even if the API call succeeds, check if transactions array is empty
          setState({ transactions: result.transactions || [], loading: false, error: null });
        } else {
          console.error('Error fetching transactions:', result);
          throw new Error(result.message || 'Failed to fetch transaction history');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setState({ transactions: [], loading: false, error: error.message });
      }
    };

    fetchTransactions();
  }, []);

  const { transactions, loading, error } = state;

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) {
    console.error('Error in transaction history:', error);
    return (
      <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
        <div className="opacity-70 font-bold text-white py-2 text-sm md:text-base">
          Transaction History
        </div>
        <div className="text-white">No transactions found</div>
      </div>
    );
  }

  // Transaction history display
  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      <div className="opacity-70 font-bold text-white py-2 text-sm md:text-base">
        Transaction History
      </div>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <div key={index} className="flex flex-col border-b border-[#D9D9D9]">
            <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 gap-2">
              <img
                src={getArrowImage(transaction.type)}
                className="md:w-[40px] w-[20px]"
                alt={transaction.type === 'credit' ? 'Credit' : 'Debit'}
              />
              <span className="font-medium text-xs md:text-base">
                {transaction.description || 'Transaction Description'}
              </span>
              <span className="text-xs xl:text-base">{transaction.merchant || 'Merchant'}</span>
              <span
                className={`border ${
                  transaction.status === 'Successful' ? 'border-[#24FF00]' : 'border-red-500'
                } text-xs md:text-base p-2 md:p-4`}>
                {transaction.status || 'Status'}
              </span>
              <span className="text-xs md:text-base">{transaction.amount || '0.00'}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-white">No transactions found</div>
      )}
      <Link
        to="/account/transaction"
        className="float-right pr-0 p-4 text-lightBlue flex items-center gap-2 font-medium text-xs md:text-base">
        See All Transactions <LiaGreaterThanSolid color="#006181" />
      </Link>
    </div>
  );
};

export default TransactionHistory;
