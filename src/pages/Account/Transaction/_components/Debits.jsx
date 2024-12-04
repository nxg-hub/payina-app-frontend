// // eslint-disable-next-line no-unused-vars
// import React from 'react';
// import Box from './../../../../assets/images/invoicebox.png';
//
// const Debits = () => {
//   return (
//     <>
//       <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
//         <p className="py-2 md:py-3 px-2 md:px-6 border border-[#D9D9D9] font-bold text-[7.5px] md:text-base">
//           Recent Debit Transactions
//         </p>
//         <div className="flex flex-col border border-[#D9D9D9] ">
//           <div className="flex items-center justify-between px-2 md:px-6 py-2 md:py-3 rounded-sm md:gap-0 gap-0">
//             <div>
//               <div className="flex">
//                 <p className=" text-[7.5px] md:text-base">Client Name</p>
//               </div>
//             </div>
//             <span className="font-medium  text-[7.5px]   md:text-base xl:pl-8 md:pl-10 pl-5  ">
//               Source
//             </span>
//             <span className=" text-[7.5px] md:text-base sm: md:pl-7 lg:  xl:pl-14 pl-5   sm:pl-4">
//               {' '}
//               Date
//             </span>
//             <span className=" text-[7.5px] md:text-base  md:pl-8 xl:pl-11 sm:pl-1">Status</span>
//             <span className=" text-[7.5px] md:text-base  md:pl-8 ">Amount</span>
//             <span className=" text-[7.5px] md:text-base text-primary">...</span>
//           </div>
//         </div>
//
//         <div className="grid grid-cols-6 gap-4 w-full sm:w-auto">
//           {/* Add more rows and data here as needed */}
//         </div>
//
//         <div className="flex flex-col border border-[#D9D9D9]">
//           <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
//             <div>
//               <div className="flex items-center">
//                 <div>
//                   {' '}
//                   <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
//                 </div>
//                 <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
//               </div>
//             </div>
//             <span className="font-medium  text-[7px] md:text-base border border-[#E80516] text-[#E80516] py-1 md:py-2 px-[5.5px] md:px-6">
//               Direct Transfer
//             </span>
//             <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
//             <span className="border border-[#0C4E06] text-[#0C4E06] text-[7.5px]  md:text-base py-1 md:py-2 px-[6px] md:px-6">
//               Successful
//             </span>
//             <span className=" text-[7.5px] md:text-base">$478.87</span>
//             <span className=" text-[7.5px] md:text-base">...</span>
//           </div>
//         </div>
//
//         <div className="flex flex-col border border-[#D9D9D9]">
//           <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
//             <div>
//               <div className="flex items-center">
//                 <div>
//                   {' '}
//                   <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
//                 </div>
//                 <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
//               </div>
//             </div>
//             <span className="font-medium  text-[7.5px] md:text-base border border-secondary text-secondary py-1 md:py-2 px-2 md:px-6">
//               Paid Invoice
//             </span>
//             <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
//             <span className="border border-[#0C4E06] text-[#0C4E06] text-[7.5px] md:text-base py-1 md:py-2 px-[6px] md:px-6">
//               Successful
//             </span>
//             <span className=" text-[7.5px] md:text-base">$478.87</span>
//             <span className=" text-[7.5px] md:text-base">...</span>
//           </div>
//         </div>
//
//         <div className="flex flex-col border border-[#D9D9D9]">
//           <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
//             <div>
//               <div className="flex items-center">
//                 <div>
//                   {' '}
//                   <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
//                 </div>
//                 <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
//               </div>
//             </div>
//             <span className="font-medium  text-[7.5px] md:text-base border border-secondary text-secondary py-1 md:py-2 px-2 md:px-6">
//               Paid Invoice
//             </span>
//             <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
//             <span className="border border-[#0C4E06] text-[#0C4E06]  text-[7.5px] md:text-base py-1 md:py-2 px-[6px] md:px-6">
//               Successful
//             </span>
//             <span className=" text-[7.5px] md:text-base">$478.87</span>
//             <span className=" text-[7.5px] md:text-base">...</span>
//           </div>
//         </div>
//         <div className="flex flex-col border border-[#D9D9D9]">
//           <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
//             <div>
//               <div className="flex items-center">
//                 <div>
//                   {' '}
//                   <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
//                 </div>
//                 <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
//               </div>
//             </div>
//             <span className="font-medium  text-[7px] md:text-base border border-[#E80516] text-[#E80516] py-1 md:py-2 px-[5.5px] md:px-6">
//               Direct Transfer
//             </span>
//             <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
//             <span className="border border-[#0C4E06] text-[#0C4E06] text-[7.5px]  md:text-base py-1 md:py-2 px-[6px] md:px-6">
//               Successful
//             </span>
//             <span className=" text-[7.5px] md:text-base">$478.87</span>
//             <span className=" text-[7.5px] md:text-base">...</span>
//           </div>
//         </div>
//         <div className="flex flex-col border border-[#D9D9D9]">
//           <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
//             <div>
//               <div className="flex items-center">
//                 <div>
//                   {' '}
//                   <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
//                 </div>
//                 <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
//               </div>
//             </div>
//             <span className="font-medium  text-[7.5px] md:text-base border border-secondary text-secondary py-1 md:py-2 px-2 md:px-6">
//               Paid Invoice
//             </span>
//             <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
//             <span className="border border-[#0C4E06] text-[#0C4E06]  text-[7.5px] md:text-base py-1 md:py-2 px-[6px] md:px-6">
//               Successful
//             </span>
//             <span className=" text-[7.5px] md:text-base">$478.87</span>
//             <span className=" text-[7.5px] md:text-base">...</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
//
// export default Debits;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LiaGreaterThanSolid } from 'react-icons/lia';
import useLocalStorage from '../../../../hooks/useLocalStorage';
const Debits = () => {
  const [authToken] = useLocalStorage('authToken', '');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Show 5 recent transactions

  const fetchTransactions = async () => {
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
          type: 'DEBIT',
          page: 0,
          pageSize: 5,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch debit transactions');
      }

      const data = await response.json();
      setTransactions(data.data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchTransactions();
    }
  }, [authToken]);

  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      <div className="w-full">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Recent Debit Transactions</h2>
      </div>

      {loading ? (
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
            </tr>
            </thead>
            <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={transaction.id || index} className="border-b border-[#d9d9d9]">
                  <td className="p-2">
                    <div className="w-[32px] h-[32px] md:w-[42px] md:h-[42px]">
                      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="21" r="21" fill="#E80516" />
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
                    <div className={`flex justify-center items-center gap-2 p-1 md:p-2.5 border rounded text-xs md:text-base ${
                      transaction.status === 'PROCESSING' ? 'border-yellow-400 bg-yellow-50' :
                        transaction.status === 'COMPLETED' ? 'border-green-400 bg-green-50' :
                          'border-gray-400 bg-gray-50'
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center font-manrope text-xs md:text-base font-normal leading-5 text-[#1a1d1f] py-4">
                  No debit transactions found.
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      )}
      <Link
        to="/account/transaction"
        className="float-right pr-0 p-4 text-lightBlue flex items-center gap-2 font-medium text-xs md:text-base">
        See All Transactions <LiaGreaterThanSolid color="#006181" />
      </Link>
    </div>
  );
};
export default Debits;