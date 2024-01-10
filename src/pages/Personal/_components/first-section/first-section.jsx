import React from 'react';
import { images } from '../../../../constants';

const FirstSection = () => {
  return (
    <div className="bg-[#000] flex justify-center items-center xl:pb-4">
      <img src={images.sectionOne} alt="transaction" className="relative xl:mb-10" />
      <div className="bg-primary xl:px-10 xl:py-10  xl:w-[15%] xl:h-fit absolute right-[37rem] top-[60rem] text-lightBlue flex items-center justify-center flex-col rounded-[8.34px]">
        <span className="uppercase text-center">SEAMLESSLY SEND AND RECEIVE MONEY </span>
        <hr className="h-4 text-yellow w-full mx-auto" />
        <p className="leading-[224.024%] text-center font-medium ">
          Enjoy instant transactions, low fees, and robust security. Experience the convenience of a
          user-friendly platform designed for efficiency, making your financial interactions
          effortless and reliable
        </p>
      </div>
    </div>
  );
};

export default FirstSection;
