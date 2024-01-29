import React from 'react';
import { images } from '../../../../constants';

const FirstSection = () => {
  return (
    <div className="bg-[#000] flex justify-center items-center xl:pb-4">
      <div className="relative">
        <img src={images.sectionOne} alt="transaction" className=" xl:mb-10" />
        <div className="bg-primary p-4 h-[88%] md:px-4 md:py-10 w-[40%] md:h-fit absolute md:right-[1rem] right-[.5rem] md:top-[8rem] top-[3rem] text-lightBlue flex items-center justify-center flex-col rounded-[8.34px]">
          <span className="uppercase md:text-center text-start text-[.7rem] xl:text-[1rem]">
            SEAMLESSLY SEND AND RECEIVE MONEY
          </span>
          <hr className="border-none bg-yellow h-[.1rem] w-[130px] xl:mx-auto" />
          <p className="md:leading-[224.024%] text-start md:text-center font-medium text-[.6rem] xl:text-[1rem] md:text-base ">
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

// /* left: 0; */
// right: 4rem;
// width: 30%;
// height: fit-content;
// padding: 1rem;
