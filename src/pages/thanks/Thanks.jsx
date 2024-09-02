// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../../components/navbar/navbar';
import { tansIcon } from '../../constants/images';
import Footer from '../../components/footer/footer';

const Thanks = () => {
  return (
    <section>
      <Navbar />

      <div
        className="w-[80%] h-1 border-none mr-auto ml-auto 
            mt-[-2px] mb-20 bg-yellow"></div>
      <div className=" flex flex-col text-white justify-center items-center">
        <img src={tansIcon} alt="tansIcon" className="" />
        <p className=" text-sm font-bold">Congrats</p>
        <p className=" text-xs">Your Transaction Was Succesful</p>
        <button
          className="text-primary mb-5 mt-7 text-left px-16 py-4 
                    border-none rounded-[5px] bg-lightBlue cursor-pointer
                     hover:bg-neutral transition-all duration-200 ">
          Register
        </button>
        <p className="text-sm">
          {' '}
          Or<span className="text-lightBlue ">Login</span>
        </p>
      </div>
      <div className=" mt-10">
        <Footer />
      </div>
    </section>
  );
};

export default Thanks;
