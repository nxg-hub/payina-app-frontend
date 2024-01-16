import React from 'react';
import images from '../../../../constants/images';

const SecondSection = () => {
  return (
    <div className="flex flex-col items-center justify-center xl:py-20 xl:pb-[30rem] py-2 xl:pt-0 px-8 xl:px-10 bg-primary">
      <div className="text-lightBlue text-3xl xl:text-5xl font-extrabold xl:w-[50%] md:text-center text-start !leading-[3rem] xl:!leading-[4rem]">
        At Payina, We Offer a Diverse Range of Solutions Needed for Your Business to Excel
      </div>
      <div className="xl:my-20 my-10">
        <img src={images.Cicle} alt="" />
      </div>
    </div>
  );
};

export default SecondSection;
