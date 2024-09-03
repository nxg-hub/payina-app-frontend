import React from 'react';
import smallbusiness from './../../../../assets/images/shopimage.png';
import superstore from './../../../../assets/images/superstore1.png';
import corporation from './../../../../assets/images/corporation.png';
import WhiteArrow from './../../../../assets/images/whiteArrow.png';
const Seventhsection = () => {
  return (
    <>
      <div className="bg-[#000]">
        <p className="bg-[#000] text-primary text-center pt-6 pb-11 font-semibold text-2xl md:text-3xl xl:text-5xl">
          So what solution would you like us to provide?
        </p>
        <div className="grid place-content-center w-full">
          <div className="flex justify-between flex-col md:flex-row w-full gap-6  ">
            <div className="flex items-center justify-between bg-lightBlue  w-full md:w-[535px] px-4 md:px-8  py-4 md:py-8 rounded-md">
              <div>
                <img src={smallbusiness} alt="" className="w-[80%] md:w-full" />
              </div>
              <div className="flex items-center justify-between w-[150px] md:w-[200px]  ">
                <p className="text-primary text-[12px] md:text-[16px]">Small business</p>
                <div>
                  <img src={WhiteArrow} alt="" className="w-[80%] md:w-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center  bg-lightBlue justify-between  w-full md:w-[535px] px-4 md:px-8  py-4 md:py-8 rounded-md">
              <div>
                <img src={superstore} alt="" className="w-[80%] md:w-full" />
              </div>
              <div className="flex items-center justify-between w-[140px] md:w-[200px]">
                <p className="text-primary text-[12px] md:text-[16px]">Super store</p>
                <div>
                  <img src={WhiteArrow} alt="" className="w-[80%] md:w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between flex-col md:flex-row w-full gap-6 mt-6 mb-6 ">
            <div className="flex items-center bg-lightBlue justify-between px-4 md:px-8  py-4 md:py-8 w-full md:w-[535px] rounded-md ">
              <div>
                <img src={corporation} alt="" className="w-[80%] md:w-full" />
              </div>
              <div className="flex items-center justify-between w-[140px] md:w-[200px]">
                <p className="text-primary text-[12px] md:text-[16px]">Corporation</p>
                <div>
                  <img src={WhiteArrow} alt="" className="w-[80%] md:w-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center  bg-primary  px-4 md:px-8  py-4 md:py-8 w-full md:w-[535px] rounded-md">
              <div>
                <p className="text-[24px] md:text-[34px] font-semibold text-secondary">
                  Not sure?{' '}
                </p>
                <p className="text-[15px] md:text-[20px] text-secondary">Get started</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seventhsection;
