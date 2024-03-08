import React from 'react'
import { Link } from 'react-router-dom';
import notes from "./../../../../assets/images/notesbook.png"

const Secondsection = () => {
  return (
    <div>
      <div className='md:px-[.7rem] pb-9 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-2'>
      <div className='grid md:grid-cols-4 gap-8'>
        <div className='shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6 px-3 rounded-md md:h-[200px] grid place-content-center'>
        <div className='grid place-content-center'>
          <img src={notes} alt="" />
          </div>
          <p className='text-center text-[14px] md:text-[18px] font-bold'>Total Customer</p>
          <p className='text-center text-[14px] r md:text-[18px] font-bold'>223</p>
        </div>
        <div className='shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6 px-3 rounded-md md:h-[200px] grid place-content-center'>
        <div className='grid place-content-center'>
          <img src={notes} alt="" /> 
          </div>
          <p className='text-center  text-[14px] md:text-[18px] font-bold'>Invoices Generated</p>
          <p className='text-center  text-[14px] md:text-[18px] font-bold'>223</p>
        </div>
        <div className='shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6 px-3 rounded-md md:h-[200px] grid place-content-center'>
        <div className='grid place-content-center'>
          <img src={notes} alt="" />
          </div>
          <p className='text-center  text-[14px] md:text-[18px] font-bold'>Paid Invoices</p>
          <p className='text-center  text-[14px] md:text-[18px] font-bold'> 223</p>
        </div>
        <div className='shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6 px-3 rounded-md md:h-[200px] grid place-content-center'>
          <div className='grid place-content-center'>
          <img src={notes} alt=""  />
          </div>
          <p className='text-center  text-[14px] md:text-[18px] font-bold'>Unpaid Invoices</p>
          <p className='text-center  text-[14px] md:text-[18px] font-bold'>223</p>
        </div>
      </div>
      </div>
      
      
    </div>
  )
}

export default Secondsection
