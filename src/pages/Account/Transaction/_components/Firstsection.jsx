import React from 'react'
import Transactioncircle from './../../../../assets/images/Transactioncircle.png'
import moneyBox from './../../../../assets/images/moneyBox.png'
import { Link } from 'react-router-dom';

const Firstsection = () => {
  return (
    <>
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-2" >
    <div  className="pt-2 md:pt-[9%] text-sm md:text-base pb-6 " >
    <p className='text-[32px] font-bold pt-4'>Transaction History</p>
      <div className='flex justify-between'>
      <div className='flex items-center'>
        <div><img src={moneyBox} alt="" className='w-full' />
        </div>
        <div className='ml-4'>
        <p>Current Balance</p>
        <p className='text-[32px] font-bold'>NGN 2,000,000.00</p>
        </div>
      </div>
      <div>
      <div><img src={Transactioncircle} alt="" /></div>
      </div>
    </div>

    </div>
    <p>Recent Transactions</p>

    </div>
    </>
  )
}

export default Firstsection
