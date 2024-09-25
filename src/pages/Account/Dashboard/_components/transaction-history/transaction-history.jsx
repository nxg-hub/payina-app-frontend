import { useEffect, useState } from 'react';
import { LiaGreaterThanSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { images } from '../../../../../constants';
const getAuthToken = () => localStorage.getItem('authToken');

const TransactionHistory = () => {
  const [state, setState] = useState({
    transactions: [],
    loading: true,
    error: null,
  });
  const getArrowImage = (type) => {
    return type === 'credit' ? images.GreenArrow : images.RedArrow;
  };
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = getAuthToken(); 

      if (!token) {
        return setState({
          transactions: [],
          loading: false,
          error: 'Authorization token not found.',
        });
      }

      try {
        const response = await fetch(import.meta.env.VITE_TRANSACTION_HISTORY_ENDPOINT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletId: '', 
            startDate: '2024-09-12T06:18:59.470Z',
            endDate: '2024-09-12T06:18:59.470Z', 
            type: '',     
          }),
        });

        const result = await response.json();

        if (response.ok) {
          
          setState({ transactions: result.transactions || [], loading: false, error: null });
        } else {
          throw new Error(result.message || 'Failed to fetch transaction history');
        }
      } catch (error) {
        setState({ transactions: [], loading: false, error: error.message });
      }
    };

    fetchTransactions();
  }, []);

  const { transactions, loading, error } = state;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      <div className="opacity-70 font-bold text-lightBlue py-2 text-sm md:text-base">
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
                } text-xs md:text-base p-2 md:p-4`}
              >
                {transaction.status || 'Status'}
              </span>
              <span className="text-xs md:text-base">{transaction.amount || '0.00'}</span>
            </div>
          </div>
        ))
      ) : (
        <div>No transactions found</div>
      )}
      <Link
        to="/account/transaction"
        className="float-right pr-0 p-4 text-lightBlue flex items-center gap-2 font-medium text-xs md:text-base"
      >
        See All Transactions <LiaGreaterThanSolid color="#006181" />
      </Link>
    </div>
  );
};

export default TransactionHistory;