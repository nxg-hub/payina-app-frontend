import React, { useState, useEffect } from 'react';
import moneyBox from './../../../../assets/images/moneyBox.png';
import Credits from './Credits';
import Debits from './Debits';
import { useSelector } from 'react-redux';
import ExportTransaction from './ExportTransaction';
import { FilterMenu } from '../../Dashboard/_components/transaction-history/FilterMenu';
import TransactionCircleChart from './TransactionCircleChart';
import axios from 'axios';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';

const Firstsection = () => {
  const [showCredit, setShowCredit] = useState(true);
  const [showDebit, setShowDebit] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({});
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [transactionStats, setTransactionStats] = useState({
    percentageDebit: 0,
    percentageCredit: 0,
    totalDebit: 0,
    totalCredit: 0,
    message: 'Loading transaction data...',
  });
  const [isLoading, setIsLoading] = useState(true);

  const currentBalance = useSelector((state) => state.wallet?.wallet?.data?.balance?.amount);
  const { credits, debits } = useSelector((state) => state.transactions);
  // const authToken = useSelector((state) => state.auth?.authToken);
  const [authToken] = useLocalStorage('authToken', '');

  // Fetch transaction stats from API
  useEffect(() => {
    // In the fetchTransactionStats function, modify the API call and response handling:

    const fetchTransactionStats = async () => {
      try {
        setIsLoading(true);

        // Get the current date and calculate 1 year ago
        const currentDate = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

        // Format dates as ISO strings (many APIs prefer this format)
        const startDate = oneYearAgo.toISOString();
        const endDate = currentDate.toISOString();

        console.log('Fetching transaction stats with params:', {
          startDate,
          endDate,
        });

        // Make a POST request to the API with the auth token
        const response = await axios.post(
          import.meta.env.VITE_INFLOW,
          {
            page: 0,
            size: 10,
            startDate,
            endDate,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // console.log("Full API Response:", response);

        if (response.data && response.data) {
          const data = response.data;

          // console.log("API Response data:", data);

          const total = (data.totalDebit || 0) + (data.totalCredit || 0);
          const calculatedDebitPercentage = total > 0 ? ((data.totalDebit || 0) / total) * 100 : 0;
          const calculatedCreditPercentage =
            total > 0 ? ((data.totalCredit || 0) / total) * 100 : 0;

          const stats = {
            percentageDebit: data.percentageDebit || calculatedDebitPercentage,
            percentageCredit: data.percentageCredit || calculatedCreditPercentage,
            totalDebit: data.totalDebit || 0,
            totalCredit: data.totalCredit || 0,
            message: data.message || 'Transaction data loaded successfully.',
          };

          // console.log("Setting transaction stats:", stats);
          setTransactionStats(stats);
        } else {
          console.warn('Unexpected API response structure:', response.data);
          setTransactionStats({
            percentageDebit: 0,
            percentageCredit: 0,
            totalDebit: 0,
            totalCredit: 0,
            message: 'Unexpected API response format',
          });
        }
      } catch (error) {
        // console.error("Error fetching transaction stats:", error);
        if (error.response) {
          // console.error("API Error Response:", error.response.data);
        }
        setTransactionStats({
          percentageDebit: 0,
          percentageCredit: 0,
          totalDebit: 0,
          totalCredit: 0,
          message: `Error: ${error.response?.data?.message || error.message}`,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (authToken) {
      fetchTransactionStats();
    }
  }, [authToken]);

  const filterOptions = [
    { key: 'type', label: 'Type', options: ['CREDIT', 'DEBIT'] },
    { key: 'status', label: 'Status', options: ['COMPLETED', 'PROCESSING', 'FAILED'] },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'transactionRef', label: 'Reference', type: 'text' },
    { key: 'amount', label: 'Amount', type: 'number' },
    { key: 'createdAt', label: 'Date', type: 'date' },
  ];

  const clearAllFilters = () => {
    setFilters({});
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
  };

  const toggleCredit = () => {
    setShowCredit(true);
    setShowDebit(false);
  };

  const toggleDebit = () => {
    setShowCredit(false);
    setShowDebit(true);
  };

  let sortedCredits = [...credits].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  let sortedDebits = [...debits].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredCreditTransactions = sortedCredits.filter((transaction) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(transaction[key]).toLowerCase().includes(String(value).toLowerCase());
    })
  );

  const filteredDebitTransactions = sortedDebits.filter((transaction) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(transaction[key]).toLowerCase().includes(String(value).toLowerCase());
    })
  );

  return (
    <>
      <div className="md:px-[.7rem] pb-0 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-2 ">
        <div className="pt-2 md:pt-[9%]">
          <p className="text-[14px] sm:text-[18px] md:text-[32px] font-bold">Transaction History</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="">
                <img src={moneyBox} alt="" className="w-[100px] sm:w-[130px] md:w-[300px]" />
              </div>

              <div className="ml-4 text-[12px] sm:text-[14px] md:text-[21px] w-full">
                <p>Current Balance</p>

                <div className="">
                  <span className="text-[9px] sm:text-[12px] md:text-[18px] font-bold">₦</span>
                  <span className="text-[14px] sm:text-[18px] md:text-[32px] font-bold">
                    {currentBalance?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) ||
                      '0.00'}
                  </span>
                </div>
              </div>
            </div>
            <div className="transaction-chart">
              {isLoading ? (
                <div className="flex items-center justify-center h-48 w-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <TransactionCircleChart
                  debitPercentage={transactionStats.percentageDebit}
                  creditPercentage={transactionStats.percentageCredit}
                  totalDebit={transactionStats.totalDebit}
                  totalCredit={transactionStats.totalCredit}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between py-2 mt-5">
          <div className="flex px-2 md:px-6 text-[7.5px] md:text-base">
            <p className="font-bold">Recent Transactions</p>
            <nav className="flex">
              <p className={`mr-7 ml-7 ${showCredit ? 'border-b-2 border-secondary' : ''}`}>
                <button onClick={toggleCredit}>Credit</button>
              </p>
              <p className={`${showDebit ? 'border-b-2 border-secondary ' : ''}`}>
                <button onClick={toggleDebit}>Debit</button>
              </p>
            </nav>
          </div>
          <div className="flex mr-10 items-center">
            <FilterMenu
              showFilterMenu={showFilterMenu}
              setShowFilterMenu={setShowFilterMenu}
              filters={filters}
              filterOptions={filterOptions}
              handleFilterChange={handleFilter}
              transactions={[...credits, ...debits]}
              clearAllFilters={clearAllFilters}
              closeOtherMenus={() => {
                setShowExportMenu(false);
                setShowMoreMenu(false);
              }}
            />
            <div className="">
              <ExportTransaction credits={credits} debits={debits} />
            </div>
          </div>
        </div>
      </div>

      {showCredit && <Credits sortedCredits={filteredCreditTransactions} />}
      {showDebit && <Debits sortedDebits={filteredDebitTransactions} />}
    </>
  );
};

export default Firstsection;
