// eslint-disable-next-line no-unused-vars
import React from 'react';
import plus from './../../../../assets/images/invoiceplus.png';
import { Link } from 'react-router-dom';

const Firstsection = () => {
  return (
    <>
      <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-2">
        <div className="pt-2 md:pt-[9%] text-sm md:text-base pb-6 ">
          <div className="flex justify-between">
            <div className=" text-[21px] md:text-[32px] font-bold">Invoice</div>
            <Link to="/invoice/createinvoice">
              <div className="flex items-center border border-lightBlue px-[8px] md:px-[16px] py-[4px] md:py-[8px] rounded-md ">
                <img src={plus} alt="" />
                <p className="text-[14px] md:text-[21px] text-lightBlue font-semibold">
                  Create Invoice
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-8 px-3 rounded-md">
          <div className="w-full md:w-[90%]">
            <h2 className="pb-6 md:text-[21px]  font-bold">All Invoices</h2>

            <div className="grid grid-cols-4 gap-4   ">
              <div className="">
                <p className="pb-2 text-[10px] sm:text-[13px] md:text-base font-bold">Begin Date</p>
                <input
                  type="date"
                  id="beginDate"
                  name="beginDate"
                  className="text-[9px] md:text-base  w-[90%] md:w-full bg-[#82B5C6] h-[30px] sm:text-[13px] md:h-[48px] p-2 rounded-md"
                />
              </div>
              <div className=" ">
                <p className="pb-2 text-[10px] sm:text-[13px] md:text-base  font-bold">End Date</p>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className=" text-[9px] md:text-base  w-[90%] md:w-full bg-[#F1A2A2] h-[30px] sm:text-[13px] md:h-[48px] p-2 rounded-md "
                />
              </div>
              <div className="">
                <p className="pb-2 text-[10px] sm:text-[13px] md:text-base  font-bold">Status</p>
                <select
                  id="status"
                  name="status"
                  className=" h-[30px] md:h-[48px] rounded-md p-2 w-full md:w-full text-[9px] sm:text-[13px] md:text-base bg-[#BADD56]
">
                  <option value="">Select </option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="">
                <p className="pb-2 text-[10px] sm:text-[13px] md:text-base  font-bold">Client</p>
                <select
                  id="client"
                  name="client"
                  className="h-[30px] md:h-[48px] p-2 text-[9px] sm:text-[13px] md:text-base rounded-md  w-[100%] md:w-full bg-[#A3F5FB]
">
                  <option value="">Select </option>
                  <option value="client1">Client 1</option>
                  <option value="client2">Client 2</option>
                  <option value="client3">Client 3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Firstsection;
