// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../../components/navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/footer/footer';

const Airtime = () => {
  return (
    <section className="text-primary w-full h-screen">
      <Navbar className="pt-6" />
      <div className=" container">
        <div
          className="w-[80%] h-1 border-none mr-auto ml-auto 
            mt-[-2px] mb-40 bg-yellow"></div>
        <p className=" mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
          Buy Airtime & get Cashback
        </p>
        <form>
          <button
            className="text-primary text-left p-10 border-none rounded-[5px]
             w-[64%] bg-neutral px-4 py-2">
            Want to enjoy discounts?
            <span className="text-yellow"> Register</span> or{' '}
            <span className=" text-yellow">Login</span>{' '}
          </button>
          <div className="flex flex-col w-[64%] ">
            <label className="py-4">Email</label>
            <input
              type="email"
              placeholder="Enter Email address"
              className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
            />
          </div>
          <div className="flex flex-col w-[64%] ">
            <label className="py-4">Network</label>
            <div className=" cursor-pointer ">
              <FontAwesomeIcon
                icon={faChevronDown}
                color="teal"
                className=" absolute 
                           pl-[56%] min-w-1 py-4"
              />
              <input
                type="text"
                placeholder="Choose Network "
                className="border-2 rounded-[5px]  px-5 py-2 border-primary
                       bg-black text-slate-600 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-[64%] ">
            <label className="py-4">Phone</label>
            <input
              type="number"
              placeholder="Enter Phone number"
              className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
            />
          </div>
          <div className="flex flex-col w-[64%] ">
            <label className="py-4">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="border-2  mb-8 rounded-[5px] px-5 py-2 
                        border-primary bg-black text-slate-600"
            />
          </div>
          <button
            className="text-primary mb-10 text-left px-16 py-4 
                    border-none rounded-[5px] bg-lightBlue cursor-pointer
                     hover:bg-neutral transition-all duration-200 ">
            Proceed
          </button>
        </form>
      </div>
      <div className="pt[-10]">
        <Footer />
      </div>
    </section>
  );
};

export default Airtime;
