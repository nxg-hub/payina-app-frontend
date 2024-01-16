import React from 'react';
import CustomButton from '../../../../components/button/button';
import { images } from '../../../../constants';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="xl:py-20 py-10 xl:pt-0 px-8 xl:px-10 bg-primary">
      <hr className="border-none bg-yellow h-1 w-[87%] mx-auto" />
      <div className="md:items-center flex flex-col">
        <div className="lg:text-5xl xl:w-[60%] md:text-center xl:text-[64px] text-4xl flex justify-center font-bold text-lightBlue pt-10 !leading-normal">
        Elevate Your Finances: Unleash the Future of Business.
        </div>
        <p className="xl:text-xl text-[16px] font-normal xl:w-1/2 text-[#000] lg:pt-6 pt-4 md:text-center xl:leading-normal leading-8">
        Revolutionize your business with our advanced solutions, offering seamless transactions,
          real-time analytics, and enhanced financial control. Experience innovation, efficiency,
          and growth in every aspect of your financial ecosystem.
        </p>
        <div className="mt-6 flex items-center justify-center w-auto  px-4 xl:gap-4 py-6 xl:py-8 xl:pt-10 bg-yellow xl:my-6 xl:mb-12 rounded-[10px]">
          <div className="xl:space-x-4 xl:gap-0 gap-4 flex">
            <div className="flex items-center ml-8 xl:ml-0">
              <CustomButton className='hover:scale-95 font-extrabold w-[130px] duration-300 center gap-2 xl:w-auto xl:!py-3 xl:!px-24 !py-2 !px-10'>
                <span className='text-nowrap'>Sign Up</span>
              </CustomButton>
            </div>
            <div className="flex items-center mr-8 xl:mr-0">
              <CustomButton
                className='hover:scale-95 font-extrabold duration-300 w-[130px] center gap-2 xl:w-auto xl:!py-3 xl:!px-12 !py-2 !px-4'
                backgroundColor="transparent"
                textColor="#000"
                padding="10px 50px">
                <span className='text-wrap'>Speak to a Consultant</span>
              </CustomButton>
            </div>
          </div>
        </div>
        <hr className="border-none bg-yellow h-1 w-[87%] mx-auto my-10 xl:my-0" />
      </div>
    </section>
  );
};

export default HeroSection;
