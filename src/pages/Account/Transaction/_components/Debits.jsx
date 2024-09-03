// eslint-disable-next-line no-unused-vars
import React from 'react';
import Box from './../../../../assets/images/invoicebox.png';

const Debits = () => {
  return (
    <>
      <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
        <p className="py-2 md:py-3 px-2 md:px-6 border border-[#D9D9D9] font-bold text-[7.5px] md:text-base">
          Recent Debit Transactions
        </p>
        <div className="flex flex-col border border-[#D9D9D9] ">
          <div className="flex items-center justify-between px-2 md:px-6 py-2 md:py-3 rounded-sm md:gap-0 gap-0">
            <div>
              <div className="flex">
                <p className=" text-[7.5px] md:text-base">Client Name</p>
              </div>
            </div>
            <span className="font-medium  text-[7.5px]   md:text-base xl:pl-8 md:pl-10 pl-5  ">
              Source
            </span>
            <span className=" text-[7.5px] md:text-base sm: md:pl-7 lg:  xl:pl-14 pl-5   sm:pl-4">
              {' '}
              Date
            </span>
            <span className=" text-[7.5px] md:text-base  md:pl-8 xl:pl-11 sm:pl-1">Status</span>
            <span className=" text-[7.5px] md:text-base  md:pl-8 ">Amount</span>
            <span className=" text-[7.5px] md:text-base text-primary">...</span>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 w-full sm:w-auto">
          {/* Add more rows and data here as needed */}
        </div>

        <div className="flex flex-col border border-[#D9D9D9]">
          <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
            <div>
              <div className="flex items-center">
                <div>
                  {' '}
                  <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
                </div>
                <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
              </div>
            </div>
            <span className="font-medium  text-[7px] md:text-base border border-[#E80516] text-[#E80516] py-1 md:py-2 px-[5.5px] md:px-6">
              Direct Transfer
            </span>
            <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
            <span className="border border-[#0C4E06] text-[#0C4E06] text-[7.5px]  md:text-base py-1 md:py-2 px-[6px] md:px-6">
              Successful
            </span>
            <span className=" text-[7.5px] md:text-base">$478.87</span>
            <span className=" text-[7.5px] md:text-base">...</span>
          </div>
        </div>

        <div className="flex flex-col border border-[#D9D9D9]">
          <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
            <div>
              <div className="flex items-center">
                <div>
                  {' '}
                  <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
                </div>
                <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
              </div>
            </div>
            <span className="font-medium  text-[7.5px] md:text-base border border-secondary text-secondary py-1 md:py-2 px-2 md:px-6">
              Paid Invoice
            </span>
            <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
            <span className="border border-[#0C4E06] text-[#0C4E06] text-[7.5px] md:text-base py-1 md:py-2 px-[6px] md:px-6">
              Successful
            </span>
            <span className=" text-[7.5px] md:text-base">$478.87</span>
            <span className=" text-[7.5px] md:text-base">...</span>
          </div>
        </div>

        <div className="flex flex-col border border-[#D9D9D9]">
          <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
            <div>
              <div className="flex items-center">
                <div>
                  {' '}
                  <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
                </div>
                <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
              </div>
            </div>
            <span className="font-medium  text-[7.5px] md:text-base border border-secondary text-secondary py-1 md:py-2 px-2 md:px-6">
              Paid Invoice
            </span>
            <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
            <span className="border border-[#0C4E06] text-[#0C4E06]  text-[7.5px] md:text-base py-1 md:py-2 px-[6px] md:px-6">
              Successful
            </span>
            <span className=" text-[7.5px] md:text-base">$478.87</span>
            <span className=" text-[7.5px] md:text-base">...</span>
          </div>
        </div>
        <div className="flex flex-col border border-[#D9D9D9]">
          <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
            <div>
              <div className="flex items-center">
                <div>
                  {' '}
                  <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
                </div>
                <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
              </div>
            </div>
            <span className="font-medium  text-[7px] md:text-base border border-[#E80516] text-[#E80516] py-1 md:py-2 px-[5.5px] md:px-6">
              Direct Transfer
            </span>
            <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
            <span className="border border-[#0C4E06] text-[#0C4E06] text-[7.5px]  md:text-base py-1 md:py-2 px-[6px] md:px-6">
              Successful
            </span>
            <span className=" text-[7.5px] md:text-base">$478.87</span>
            <span className=" text-[7.5px] md:text-base">...</span>
          </div>
        </div>
        <div className="flex flex-col border border-[#D9D9D9]">
          <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
            <div>
              <div className="flex items-center">
                <div>
                  {' '}
                  <img src={Box} alt="" className="h-[70%] md:h-full w-[70%]  md:w-full " />
                </div>
                <p className=" text-[7.5px] md:text-base">Micosoft Inc</p>
              </div>
            </div>
            <span className="font-medium  text-[7.5px] md:text-base border border-secondary text-secondary py-1 md:py-2 px-2 md:px-6">
              Paid Invoice
            </span>
            <span className=" text-[7.5px] md:text-base">Aug, 27 2023</span>
            <span className="border border-[#0C4E06] text-[#0C4E06]  text-[7.5px] md:text-base py-1 md:py-2 px-[6px] md:px-6">
              Successful
            </span>
            <span className=" text-[7.5px] md:text-base">$478.87</span>
            <span className=" text-[7.5px] md:text-base">...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Debits;
