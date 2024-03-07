import React from 'react';
import { images } from '../../../../constants';

const FirstSection = () => {
  return (
    <div className="bg-[#000] flex justify-center items-center xl:pb-4 xl:pt-4">
      <div className="relative">
        <img src={images.sectionOne} alt="transaction" className=" xl:mb-10" />
        <div className='bg-primary px-2 py-5  h-[88%] md:px-10  md:py-10 w-[35%] md:h-fit absolute md:left-[3rem] left-[.5rem] md:top-[4rem] top-[2.5rem] text-lightBlue flex items-center justify-center flex-col rounded-[8.34px]'>
          <span className='uppercase md:text-center md:pl-0 text-start text-[.7rem] xl:text-[1rem] '>
            SEAMLESSLY SEND AND RECEIVE MONEY
          </span>
          <hr className="border mt-4 mb-4 text-yellow w-full mx-auto" />
          <p className='md:leading-[215.024%] font-medium text-[.6rem] md:text-center lg:  xl:text-[1rem] lg:text-[1rem] md:text-[1rem] w-full md:w-full'>
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
