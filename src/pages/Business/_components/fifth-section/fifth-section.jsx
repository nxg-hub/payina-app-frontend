import React from 'react';
import images from '../../../../constants/images';

const FifthSection = () => {
  return (
    <div className="flex flex-col justify-center text-left bg-black w-full md:py-12 pb-[15rem] md:pb-[13rem] px-6 xl:px-20 md:px-16">
      <div className="text-primary font-bold text-2xl md:text-3xl xl:text-5xl pb-6">
        Other Ways We Help Your Business
      </div>

      <div className="relative w-full">
        <img
          src={images.BusinessPayroll}
          className="md:w-[50%] w-[80%] relative rounded-[10px]"
          alt=""
        />
        <div className="absolute top-[50%] md:top-[60%] w-[70%] md:w-[40%] xl:w-[30%] px-2 md:px-6 md:space-y-4 ">
          <div className="font-bold md:text-2xl xl:text-4xl">Set Up Payroll</div>
          <div className="font-medium text-xs md:text-base">
            Set Up payroll in three easy steps and automatically pay your staff as at when due with
            Payina
          </div>
        </div>

        <div className="absolute md:top-[95%] top-[130%] md:left-[59%] left-[42%] px-6 md:space-y-4 w-[60%] md:w-[30%] z-50 text-right">
          <div className="font-bold md:text-2xl xl:text-4xl">Set Up Payroll</div>
          <div className="font-medium text-xs xl:text-base">
            Set Up payroll in three easy steps and automatically pay your staff as at when due with
            Payina
          </div>
        </div>
        <img
          src={images.BusinessSignatory}
          className="md:w-[50%] w-[80%]  absolute top-[10rem] left-[20%] md:left-[40%] rounded-[10px]"
          alt=""
        />
      </div>
    </div>
  );
};

export default FifthSection;
