import React from 'react';
import { images } from '../../../../constants';

const FirstSection = () => {
  return (
    <div className="bg-[#000] flex justify-center items-center xl:pb-4">
      <div className="relative">
        <img
          src={images.Revenue}
          alt="transaction"
          className="py-12 px-10 md:py-16 md:px-20 xl:mb-10"
        />
        <div className="bg-primary p-4 h-[60%] md:px-4 md:py-10 w-[30%] md:w-[30%] md:h-fit absolute md:left-[12%] left-[12%] md:top-[20%] top-[3.5rem] text-lightBlue flex items-center justify-center flex-col rounded-[8.34px]">
          <span className="uppercase md:text-center text-start text-[6px] xl:text-[1rem] md:text-[.9rem]">
            SEAMLESSLY SEND AND RECEIVE MONEY
          </span>
          <hr className="border-none bg-yellow h-[.1rem] w-[80%] xl:mx-auto" />
          <p className="md:leading-[224.024%] text-start md:text-center font-medium text-[7px] xl:text-[1rem] md:text-base ">
            Enjoy instant transactions, low fees, and robust security. Experience the convenience of
            a user-friendly platform designed for efficiency, making your financial interactions
            effortless and reliable
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
