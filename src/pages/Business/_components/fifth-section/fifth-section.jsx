import React from 'react';
import images from '../../../../constants/images';

const FifthSection = () => {
  return (
    <div className="flex flex-col justify-center text-left bg-black w-full md:py-12 pb-[15rem] md:pb-[13rem] py-6 px-6 xl:px-20 md:px-16">
      <div className="text-primary font-bold text-2xl md:text-3xl xl:text-5xl pb-6">
        Other Ways We Help Your Business
      </div>

      <div className="relative w-full">
        <img
          src={images.BusinessPayroll}
          className="md:w-[50%] w-[80%] relative rounded-[10px]"
          alt=""
        />
        <div className="absolute top-[50%] md:top-[60%] w-[70%] md:w-[40%] px-2 md:px-6 md:space-y-4 ">
          <div className="font-bold md:text-2xl xl:text-4xl text-[0.7rem]">Set Up Payroll</div>
          <div className="font-medium text-[.65rem] xl:text-base">
            Set Up payroll in three easy steps and automatically pay your staff as at when due with
            Payina
          </div>
        </div>

        <div className="absolute md:top-[95%] top-[127%] md:left-[49%] left-[35%] px-6 md:space-y-4 w-[70%] md:w-[40%] z-50 text-right">
          <div className="font-bold md:text-2xl xl:text-4xl text-[0.7rem]">Manage Account Signatories</div>
          <div className="font-medium text-[.65rem] xl:text-base">
            Easily setup multiple signatories to your companies coporate account. Fostering faster access to funds for business activites.
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
