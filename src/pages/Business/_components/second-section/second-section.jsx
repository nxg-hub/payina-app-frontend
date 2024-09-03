import React from 'react';
import images from '../../../../constants/images';

const SecondSection = () => {
  return (
    <div className="flex flex-col items-center justify-center xl:py-0 py-2 xl:px-0 px-8 bg-black">
      <div className="text-primary text-2xl xl:text-5xl font-extrabold xl:w-[80%] md:text-center text-start !leading-[2rem] xl:!leading-[4rem]">
        At Payina, We Offer a Diverse Range of Solutions Needed for Your Business to Excel
      </div>
      <div className="xl:my-20 my-10">
        <img src={images.Cicle} alt="" />
      </div>
    </div>
  );
};

export default SecondSection;
