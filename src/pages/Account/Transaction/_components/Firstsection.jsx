import React, { useState } from 'react';
import Transactioncircle from './../../../../assets/images/Transactioncircle.png';
import moneyBox from './../../../../assets/images/moneyBox.png';
import { Link } from 'react-router-dom';
import Credit from './Credit';
import Debits from './Debits';
import redrectangle from './../../../../assets/images/redrectangle.png'
import greenrectangle from './../../../../assets/images/greenrectangle.png'

const Firstsection = () => {
  const [showCredit, setShowCredit] = useState(true); // Initialize with true to show Credit by default
  const [showDebit, setShowDebit] = useState(false); // Initialize with false to hide Debit by default

  const toggleCredit = () => {
    setShowCredit(true);
    setShowDebit(false);
  };

  const toggleDebit = () => {
    setShowCredit(false);
    setShowDebit(true);
  };

  return (
    <>
      <div className="md:px-[.7rem] pb-0 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-2 ">
        <div className='pt-2 md:pt-[9%]'>
          <p className=' text-[14px] sm:text-[18px] md:text-[32px] font-bold'>Transaction History</p>
          <div className="flex  items-center  justify-between">
            <div className="flex items-center ">
              <div className='' >
                <img src={moneyBox} alt="" className="w-[100px] sm:w-[130px] md:w-[300px]" />
              </div>

              <div className="ml-4 text-[12px] sm:text-[14px]  md:text-[21px]  w-full">
                <p>Current Balance</p>
                
                <div className=" "> <span className='text-[9px] sm:text-[12px] md:text-[18px] font-bold '>NGN </span> <span className='text-[14px] sm:text-[18px]  md:text-[32px] font-bold'>2,000,000.</span>  <span className='text-[9px] sm:text-[12px]  md:text-[18px] font-bold'>00</span></div>
              </div>
            </div>
            <div className=''>
              <div className=' grid place-content-end'>
                <img src={Transactioncircle} alt="" className='w-28 md:w-full pb-4' />
              </div>
              <div className='flex justify-center gap-4'>
              <div className='flex items-center' >
              <div><img src={redrectangle} alt="" className='w-[50%] md:w-full'/></div>
              <p className='w-full text-[6.5px]   md:text-base'>Sent 45%</p>
              </div>
              <div className='flex items-center'>
              <div><img src={greenrectangle} alt="" className='w-[50%] md:w-full ' /></div>
              <p className='w-full text-[6.5px]   md:text-base'>Received 55%</p>
              </div>
              </div>
            </div>
          </div>

        </div>
        <div className='flex py-2 px-2 md:px-6 text-[7.5px] md:text-base'>
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
      </div>

      {showCredit && <Credit />}
      {showDebit && <Debits />}
    </>
  );
};

export default Firstsection;
