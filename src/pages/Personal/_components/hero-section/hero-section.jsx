// eslint-disable-next-line no-unused-vars
import React from 'react';
import CustomButton from '../../../../components/button/button';
import { images } from '../../../../constants';

const HeroSection = () => {
  return (
    <section className="xl:py-20 py-10 xl:pt-0 px-8 xl:px-10 bg-[#000]">
      <hr className="border-none bg-yellow h-1 w-[87%] mx-auto" />
      <div className="md:items-center flex flex-col">

        <div className="lg:text-5xl xl:w-1/2 md:text-center xl:text-[64px] text-4xl flex justify-center font-bold text-lightBlue pt-10 !leading-normal">
          Manage money on the go, anytime, anywhere.
        </div>

        <p className="xl:text-xl text-[16px] font-normal xl:w-1/2 text-primary lg:pt-6 pt-4 md:text-center xl:leading-normal leading-8">
          Choose us for a transformative financial experience—where innovation meets reliability.
          Enjoy seamless transactions, robust security, and personalized solutions. Embrace the
          future with a user-centric platform that adapts to your evolving needs
        </p>
        <p className="my-12 text-xl xl:text-2xl font-bold text-primary">Download Payina App</p>
        <div className="flex items-center justify-center xl:w-[35%] w-auto xl:gap-4 py-6 xl:py-8 xl:pt-10 bg-yellow xl:my-6 xl:mb-12 rounded-[10px]">
          <div className="xl:space-x-4 xl:gap-0 gap-4 flex">
            <div className="flex items-center ml-8 xl:ml-0">
              <CustomButton
                padding="10px 50px"
                className="hover:scale-95 font-extrabold duration-300 center gap-2 w-[130px] xl:w-full">
                <img src={images.googlePlay} alt="google_play" />
                <span>Playstore</span>
              </CustomButton>
            </div>
            <div className="flex items-center mr-8 xl:mr-0">
              <CustomButton
                className="hover:scale-95 font-extrabold duration-300 center gap-2 w-[130px] xl:w-full"
                backgroundColor="transparent"
                textColor="#000"
                padding="10px 50px">
                <img src={images.appStore} alt="app_store" />
                <span>Appstore</span>
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
