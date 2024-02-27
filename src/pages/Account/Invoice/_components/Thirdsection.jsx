import React from 'react'
import { LiaGreaterThanSolid } from 'react-icons/lia';
import box from './../../../../assets/images/invoicebox.png'

import GreenArrow from './../../../../assets/images/green_arrow.svg'
import RedArrow from './../../../../assets/images/red_arrow.svg'

const Thirdsection = () => {
  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
     
    <div className="opacity-70 font-bold text-lightBlue py-2 text-sm md:text-base">
     Recent Invoices
    </div>
    
      
      <div className="flex flex-col border-b border-[#D9D9D9] ">
      <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
      <div>
      <div className='flex'>
          <p className=' text-[7.5px] md:text-base'>Client Name</p>
        </div>
        </div>
        <span className="font-medium  text-[7.5px]   md:text-base xl:pl-12 md:pl-11 pl-5 sm:pl-4 ">Created Date</span>
        <span className=" text-[7.5px] md:text-base sm: md:pl-7 lg:  xl:pl-12 pl-5   sm:pl-4">Due Date</span>
        <span className=" text-[7.5px] md:text-base  md:pl-8 sm:pl-4">
        Status
        </span>
        <span className=" text-[7.5px] md:text-base  md:pl-2 ">Amount</span>
        <span className=" text-[7.5px] md:text-base text-primary">...</span>
      </div>
    </div>


    <div className="grid grid-cols-6 gap-4 w-full sm:w-auto">
     
      {/* Add more rows and data here as needed */}
    </div>


    <div className="flex flex-col border-b border-[#D9D9D9]">
      <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
      <div>
      <div className='flex'>
          <div> <img src={box} alt="" className='h-[70%] md:h-full w-[70%]  md:w-full ' /></div>
          <p className=' text-[7.5px] md:text-base'>Micosoft Inc</p>
        </div>
           <p className=' text-[7.5px] md:text-base'>Invoice#  276323234</p>
        </div>
        <span className="font-medium  text-[7.5px] md:text-base">Aug, 12 2023 21:30</span>
        <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
        <span className="border border-[#FF0000] text-[7.5px] text-[#FF0000] md:text-base py-2 md:py-2 px-6 md:px-6">
          Unpaid
        </span>
        <span className=" text-[7.5px] md:text-base">$10,078.87</span>
        <span className=" text-[7.5px] md:text-base">...</span>
      </div>
    </div> 

    <div className="flex flex-col border-b border-[#D9D9D9]">
      <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
      <div>
      <div className='flex'>
          <div> <img src={box} alt="" className='h-[70%] md:h-full w-[70%]  md:w-full ' /></div>
          <p className=' text-[7.5px] md:text-base'>Micosoft Inc</p>
        </div>
           <p className=' text-[7.5px] md:text-base'>Invoice#  276323234</p>
        </div>
        <span className="font-medium  text-[7.5px] md:text-base">Aug, 12 2023 21:30</span>
        <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
        <span className="border border-[#0C4E06] text-[#0C4E06] text-[7.5px] md:text-base py-2 md:py-2 px-6 md:px-6">
          Paid
        </span>
        <span className=" text-[7.5px] md:text-base">$478.87</span>
        <span className=" text-[7.5px] md:text-base">...</span>
      </div>
    </div>

    <div className="flex flex-col border-b border-[#D9D9D9]">
      <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
      <div>
      <div className='flex'>
          <div> <img src={box} alt="" className='h-[70%] md:h-full w-[70%]  md:w-full ' /></div>
          <p className=' text-[7.5px] md:text-base'>Micosoft Inc</p>
        </div>
           <p className=' text-[7.5px] md:text-base'>Invoice#  276323234</p>
        </div>
        <span className="font-medium  text-[7.5px] md:text-base">Aug, 12 2023 21:30</span>
        <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
        <span className="border border-[#0C4E06] text-[#0C4E06]  text-[7.5px] md:text-base py-2 md:py-2 px-6 md:px-6">
          Paid
        </span>
        <span className=" text-[7.5px] md:text-base">$478.87</span>
        <span className=" text-[7.5px] md:text-base">...</span>
      </div>
    </div>

    <div className="flex flex-col border-b border-[#D9D9D9]">
      <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
      <div>
      <div className='flex'>
          <div> <img src={box} alt="" className='h-[70%] md:h-full w-[70%]  md:w-full ' /></div>
          <p className=' text-[7.5px] md:text-base'>Micosoft Inc</p>
        </div>
           <p className=' text-[7.5px] md:text-base'>Invoice#  276323234</p>
        </div>
        <span className="font-medium  text-[7.5px] md:text-base">Aug, 12 2023 21:30</span>
        <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
        <span className="border border-[#FF0000]  text-[7.5px] text-[#FF0000] md:text-base py-2 md:py-2 px-6 md:px-6">
          Unpaid
        </span>
        <span className=" text-[7.5px] md:text-base">$478.87</span>
        <span className=" text-[7.5px] md:text-base">...</span>
      </div>
    </div>
    




    
    
  </div>
  )
}

export default Thirdsection
