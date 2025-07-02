import React, { useState, useEffect } from 'react';
import backArrow from '../../assets/images/Group-backArrow.png';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavingStatement } from '../../Redux/savingsStatementSlice';
import { hideLoading, showLoading } from '../../Redux/loadingSlice';
import { useNavigate } from 'react-router-dom';

const Myhistory = () => {
  const id = useSelector((state) => state.savings.savingsId);
  const navigate = useNavigate();
  const goalName = useSelector((state) => state.savings.savingsName);
  const statement = useSelector((state) => state.savingsStatement.statement);
  const loading = useSelector((state) => state.savingsStatement.loading);
  const [animateCards, setAnimateCards] = useState(false);
  const [token] = useLocalStorage('authToken', '');
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';

    return date.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  useEffect(() => {
    setAnimateCards(true);
    dispatch(fetchSavingStatement({ id, token }));
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    dispatch(showLoading());
  } else {
    dispatch(hideLoading());
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl relative md:left-[300px]">
        <div
          className={`${'flex flex-row gap-2 items-center md:mt-16 justify-between cancelAction-img max-w-4xl m-auto cursor-pointer'}`}
          onClick={handleBack}>
          <img src={backArrow} alt="cancelAction"></img>
          <h2 className="text-md md:text-xl font-semibold ml-8 text-center">
            Savings History for {goalName}
          </h2>
        </div>

        {/* Transaction List */}
        <div className="space-y-3 sm:space-y-4 mt-11">
          {statement.map((transaction, index) => {
            return (
              <div
                key={transaction.id}
                className={`relative group transition-all duration-500 ${
                  animateCards ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 rounded-xl sm:rounded-2xl transition duration-300"></div>

                <div className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02]">
                  <div className="flex sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-semibold truncate">
                          {transaction.description}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-400">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <span>{formatDate(transaction.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 self-start sm:self-center">
                      <div
                        className={`text-md sm:text-xl font-bold ${
                          transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {transaction.amount > 0 ? '+' : ''}₦
                        {Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">
                        <span>{transaction.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Myhistory;
