// eslint-disable-next-line no-unused-vars
import React from 'react';
import doreen from './../../../../assets/images/doreen.png';
import Norman from './../../../../assets/images/Norman.png';
import star from './../../../../assets/images/star.png';

const SixthSection = () => {
  return (
    <div className="bg-[#000]">
      <div className="flex  text-primary py-12 px-12 items-center">
        <hr className="border mt-4 mb-4 text-yellow w-[35%] mx-auto" />
        <h1 className="w-[158px] text-center  text-[11px] sm:text-[13px] md:text-[16px] font-bold ">
          {' '}
          Join Our Community
        </h1>
        <hr className="border mt-4 mb-4 text-yellow w-[35%] mx-auto" />
      </div>
      <div className=" py-16 text-primary grid md:grid-cols-3 px-8   gap-8 md:pr-[100px]   ">
        <div className="w-full grid  place-content-center ">
          <div className="text-[34px] md:text-[48px] flex md:flex-col ">
            <p className=" ">They</p>
            <p className=" md:px-0 px-2 ">Trusted</p>
            <p className=" ">Us</p>
          </div>
          <p className="">Happy customers make us happy!</p>
          <button className="bg-[white] w-[200px] rounded-md font-medium my-6  py-3 text-lightBlue hidden md:hidden lg:inline-block ">
            See more reviews
          </button>
        </div>

        <div className=" bg-lightBlue mb-5 h-[574px] py-[42px] px-[12px] sm:px-[14px] md:px-[15px] rounded-md w-full md:w-full">
          <p className="text-center  leading-[24.35px] md:leading-[25.35px] lg:leading-[31.35px] md:text-[14px] text-[12px] sm:text-[12px] ">
            "Innovative fintech solution! Streamlined processes, user-friendly interface, and
            efficient transactions. Enhances financial management seamlessly. A game-changer for
            modern finance. Highly recommend for convenience and reliability!"
          </p>
          <div className=" w-full grid place-content-center items-center ">
            <img
              src={doreen}
              alt=""
              className="pt-8 pb-8 sm:pb-6 sm:pt-6  md:pb-0 md:pt-4 w-full sm:w-[70%] md:w-[80%] lg:w-full  "
            />
          </div>
          <hr className="border-[0.1px] mt-4 mb-4 text-primary w-full mx-auto" />
          <p className="text-center">Doreen Schumm</p>
          <div className="flex justify-center">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
          </div>
        </div>

        <div className="bg-lightBlue mb-5  h-[574px] rounded-md py-[42px] px-[18px] md:w-full ">
          <p className="text-center  leading-[24.35px] md:leading-[25.35px] lg:leading-[31.35px] md:text-[14px] text-[12px] sm:text-[12px] ">
            "Spectacular fintech platform! Swift transactions, intuitive interface, and robust
            security. Simplifies financial tasks effortlessly. A must-have for seamless banking.
            Truly impressed by its efficiency and convenience!"
          </p>
          <div className="grid place-content-center">
            <img
              src={Norman}
              alt=""
              className="pt-8 pb-8 sm:pb-6 sm:pt-6  md:pb-0 md:pt-4 w-full sm:w-[70%] md:w-[80%] lg:w-full  "
            />
          </div>
          <hr className="border-[0.1px] mt-4 mb-4 text-primary w-full mx-auto" />
          <p className="text-center">Norman Conn</p>
          <div className="flex justify-center">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
          </div>
        </div>
      </div>
      <div className="grid place-content-end pr-4 ">
        <button className="bg-[white] w-[200px] rounded-md  font-medium  mx-auto  py-3 text-lightBlue">
          See more reviews
        </button>
      </div>
      SixthSection
    </div>
  );
};

export default SixthSection;
