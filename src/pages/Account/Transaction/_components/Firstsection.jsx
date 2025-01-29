import React, { useState } from 'react';
import Transactioncircle from './../../../../assets/images/Transactioncircle.png';
import moneyBox from './../../../../assets/images/moneyBox.png';
import Credits from './Credits';
import Debits from './Debits';
import redrectangle from './../../../../assets/images/redrectangle.png';
import greenrectangle from './../../../../assets/images/greenrectangle.png';
import { useSelector } from 'react-redux';
import ExportTransaction from './ExportTransaction';

const Firstsection = () => {
  const [showCredit, setShowCredit] = useState(true);
  const [showDebit, setShowDebit] = useState(false);
  const currentBalance = useSelector((state) => state.wallet.wallet);
  const { credits, debits } = useSelector((state) => state.transactions);

  const toggleCredit = () => {
    setShowCredit(true);
    setShowDebit(false);
  };

  const toggleDebit = () => {
    setShowCredit(false);
    setShowDebit(true);
  };

  let walletBalance;
  return (
    <>
      <div className="md:px-[.7rem] pb-0 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-2 ">
        <div className="pt-2 md:pt-[9%]">
          <p className=" text-[14px] sm:text-[18px] md:text-[32px] font-bold">
            Transaction History
          </p>
          <div className="flex  items-center  justify-between">
            <div className="flex items-center ">
              <div className="">
                <img src={moneyBox} alt="" className="w-[100px] sm:w-[130px] md:w-[300px]" />
              </div>

              <div className="ml-4 text-[12px] sm:text-[14px]  md:text-[21px]  w-full">
                <p>Current Balance</p>

                <div className=" ">
                  <span className="text-[9px] sm:text-[12px] md:text-[18px] font-bold ">NGN</span>
                  <span className="text-[14px] sm:text-[18px]  md:text-[32px] font-bold">
                    {walletBalance}
                  </span>
                  <span className="text-[9px] sm:text-[12px]  md:text-[18px] font-bold">
                    {currentBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <div className=" grid place-content-end">
                <img src={Transactioncircle} alt="" className="w-28 md:w-full pb-4" />
              </div>
              <div className="flex justify-center gap-4">
                <div className="flex items-center">
                  <div>
                    <img src={redrectangle} alt="" className="w-[50%] md:w-full" />
                  </div>
                  <p className="w-full text-[6.5px]   md:text-base">Sent 15%</p>
                </div>
                <div className="flex items-center">
                  <div>
                    <img src={greenrectangle} alt="" className="w-[50%] md:w-full " />
                  </div>
                  <p className="w-full text-[6.5px]   md:text-base">Received 85%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between py-2">
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
          <div className="mr-[5rem]">
            <ExportTransaction credits={credits} debits={debits} />
          </div>
        </div>
      </div>

      {showCredit && <Credits />}
      {showDebit && <Debits />}
    </>
  );
};

export default Firstsection;

// import React, { useState, useEffect } from 'react';
// import { Wallet } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
//
// const Firstsection = () => {
//   const [transactionData, setTransactionData] = useState({
//     totalDebit: 0,
//     totalCredit: 0,
//     percentageDebit: 0,
//     percentageCredit: 0,
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const fetchTransactionData = async () => {
//       try {
//         const response = await fetch('http://localhost:8083/api/V1/transactions/inflow');
//         if (!response.ok) {
//           throw new Error('Failed to fetch transaction data');
//         }
//         const data = await response.json();
//         setTransactionData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//
//     fetchTransactionData();
//   }, []);
//
//   // Calculate the circumference for the progress circle
//   const radius = 80;
//   const circumference = 2 * Math.PI * radius;
//   const creditOffset = (transactionData.percentageCredit / 100) * circumference;
//   const debitOffset = (transactionData.percentageDebit / 100) * circumference;
//
//   if (isLoading) {
//     return (
//       <Card className="w-full max-w-4xl p-6">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
//           <div className="h-32 bg-gray-200 rounded"></div>
//         </div>
//       </Card>
//     );
//   }
//
//   if (error) {
//     return (
//       <Card className="w-full max-w-4xl p-6">
//         <div className="text-red-500">Error loading transaction data: {error}</div>
//       </Card>
//     );
//   }
//
//   return (
//     <Card className="w-full max-w-4xl p-6">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-2xl font-bold">Transaction History</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="flex justify-between items-start">
//           <div className="flex items-center space-x-4">
//             <div className="bg-blue-50 p-4 rounded-full">
//               <Wallet className="w-12 h-12 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-gray-600">Current Balance</p>
//               <div className="flex items-baseline">
//                 <span className="text-sm font-bold">NGN</span>
//                 <span className="text-3xl font-bold mx-1">
//                   {(transactionData.totalCredit - transactionData.totalDebit).toLocaleString()}
//                 </span>
//               </div>
//             </div>
//           </div>
//
//           <div className="flex flex-col items-center">
//             <div className="relative w-48 h-48">
//               <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
//                 {/* Credit amount (green) */}
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r={radius}
//                   stroke="#22c55e"
//                   strokeWidth="24"
//                   fill="none"
//                   strokeDasharray={circumference}
//                   strokeDashoffset={circumference - creditOffset}
//                   className="transition-all duration-1000 ease-in-out"
//                 />
//                 {/* Debit amount (red) */}
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r={radius}
//                   stroke="#ef4444"
//                   strokeWidth="24"
//                   fill="none"
//                   strokeDasharray={circumference}
//                   strokeDashoffset={circumference - debitOffset}
//                   className="transition-all duration-1000 ease-in-out"
//                 />
//                 {/* Display amounts */}
//                 <text
//                   x="100"
//                   y="90"
//                   textAnchor="middle"
//                   className="text-sm font-semibold fill-current">
//                   {transactionData.totalCredit.toLocaleString()}
//                 </text>
//                 <text
//                   x="100"
//                   y="110"
//                   textAnchor="middle"
//                   className="text-sm font-semibold fill-current">
//                   {transactionData.totalDebit.toLocaleString()}
//                 </text>
//               </svg>
//             </div>
//
//             <div className="flex gap-4 mt-4">
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
//                 <span className="text-sm">Debit {transactionData.percentageDebit.toFixed(1)}%</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
//                 <span className="text-sm">
//                   Credit {transactionData.percentageCredit.toFixed(1)}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
//
// export default Firstsection;

// TransactionHistory.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Paper,
//   Typography,
//   Box,
//   CircularProgress,
//   Alert,
//   Grid
// } from '@mui/material';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
//
// const Firstsection = () => {
//   const [transactionData, setTransactionData] = useState({
//     totalDebit: 0,
//     totalCredit: 0,
//     percentageDebit: 0,
//     percentageCredit: 0
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const fetchTransactionData = async () => {
//       try {
//         const response = await fetch('http://localhost:8083/api/V1/transactions/inflow');
//         if (!response.ok) {
//           throw new Error('Failed to fetch transaction data');
//         }
//         const data = await response.json();
//         setTransactionData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//
//     fetchTransactionData();
//   }, []);
//
//   const radius = 80;
//   const circumference = 2 * Math.PI * radius;
//   const creditOffset = (transactionData.percentageCredit / 100) * circumference;
//   const debitOffset = (transactionData.percentageDebit / 100) * circumference;
//
//   if (isLoading) {
//     return (
//       <Paper elevation={3} sx={{ p: 3, maxWidth: '1000px', margin: 'auto' }}>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//           <CircularProgress />
//         </Box>
//       </Paper>
//     );
//   }
//
//   if (error) {
//     return (
//       <Paper elevation={3} sx={{ p: 3, maxWidth: '1000px', margin: 'auto' }}>
//         <Alert severity="error">Error loading transaction data: {error}</Alert>
//       </Paper>
//     );
//   }
//
//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: '1000px', margin: 'auto' }}>
//       <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
//         Transaction History
//       </Typography>
//
//       <Grid container spacing={3} alignItems="flex-start">
//         {/* Balance Section */}
//         <Grid item xs={12} md={6}>
//           <Box display="flex" alignItems="center" gap={2}>
//             <Box
//               sx={{
//                 bgcolor: 'primary.light',
//                 borderRadius: '50%',
//                 p: 2,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//             >
//               <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'primary.main' }} />
//             </Box>
//             <Box>
//               <Typography color="text.secondary">Current Balance</Typography>
//               <Box display="flex" alignItems="baseline">
//                 <Typography variant="subtitle2" fontWeight="bold">NGN</Typography>
//                 <Typography variant="h4" fontWeight="bold" sx={{ mx: 1 }}>
//                   {(transactionData.totalCredit - transactionData.totalDebit).toLocaleString()}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Grid>
//
//         {/* Transaction Circle Section */}
//         <Grid item xs={12} md={6}>
//           <Box display="flex" flexDirection="column" alignItems="center">
//             <Box position="relative" width="200px" height="200px">
//               <svg viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
//                 {/* Credit Circle (Green) */}
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r={radius}
//                   stroke="#4caf50"
//                   strokeWidth="24"
//                   fill="none"
//                   strokeDasharray={circumference}
//                   strokeDashoffset={circumference - creditOffset}
//                   style={{ transition: 'all 1s ease-in-out' }}
//                 />
//                 {/* Debit Circle (Red) */}
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r={radius}
//                   stroke="#f44336"
//                   strokeWidth="24"
//                   fill="none"
//                   strokeDasharray={circumference}
//                   strokeDashoffset={circumference - debitOffset}
//                   style={{ transition: 'all 1s ease-in-out' }}
//                 />
//                 {/* Amount Text */}
//                 <g transform="rotate(90 100 100)">
//                   <text x="100" y="90" textAnchor="middle" fontSize="14" fontWeight="bold">
//                     {transactionData.totalCredit.toLocaleString()}
//                   </text>
//                   <text x="100" y="110" textAnchor="middle" fontSize="14" fontWeight="bold">
//                     {transactionData.totalDebit.toLocaleString()}
//                   </text>
//                 </g>
//               </svg>
//             </Box>
//
//             <Box display="flex" gap={2} mt={2}>
//               <Box display="flex" alignItems="center">
//                 <Box
//                   sx={{
//                     width: 16,
//                     height: 16,
//                     bgcolor: '#f44336',
//                     borderRadius: 1,
//                     mr: 1
//                   }}
//                 />
//                 <Typography variant="body2">
//                   Debit {transactionData.percentageDebit.toFixed(1)}%
//                 </Typography>
//               </Box>
//               <Box display="flex" alignItems="center">
//                 <Box
//                   sx={{
//                     width: 16,
//                     height: 16,
//                     bgcolor: '#4caf50',
//                     borderRadius: 1,
//                     mr: 1
//                   }}
//                 />
//                 <Typography variant="body2">
//                   Credit {transactionData.percentageCredit.toFixed(1)}%
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };
//
// export default Firstsection;
