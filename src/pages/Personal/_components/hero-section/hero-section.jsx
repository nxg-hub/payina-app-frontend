import React from 'react';
import Button from '../../../../components/button/button';
import { images } from '../../../../constants';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="xl:py-20 py-10 xl:pt-0 px-10 bg-[#000]">
      <hr className="bg-yellow h-1 w-[87%] mx-auto" />
      <div className="md:items-center flex flex-col">
        <div className="lg:text-5xl md:w-1/2 md:text-center xl:text-[64px] text-5xl flex justify-center font-bold text-lightBlue pt-10 !leading-normal">
          Manage money on the go, anytime, anywhere
        </div>
        <p className="xl:text-xl text-[16px] font-normal xl:w-1/2 text-primary lg:pt-6 pt-4 md:text-center xl:leading-normal leading-8">
          Choose us for a transformative financial experience—where innovation meets reliability.
          Enjoy seamless transactions, robust security, and personalized solutions. Embrace the
          future with a user-centric platform that adapts to your evolving needs
        </p>
        <p className="my-12 text-xl xl:text-2xl font-bold text-primary">Download Payina App</p>
        <div className="flex items-center justify-center xl:w-[35%] gap-4 py-8 xl:pt-10 bg-yellow xl:my-6 xl:mb-12 rounded-[10px]">
          <div className="xl:space-x-4 flex">
            <div className="flex items-center">
              <Button padding="10px 50px">
                <img src={images.googlePlay} alt="google_play" />
                <span>Playstore</span>
              </Button>
            </div>
            <div className="flex items-center">
              <Button backgroundColor="transparent" textColor="#000" padding="10px 50px" s>
                <img src={images.appStore} alt="app_store" />
                <span>Appstore</span>
              </Button>
            </div>
          </div>
        </div>
        <hr className="bg-yellow h-1 w-[87%] mx-auto my-10 xl:my-0" />
      </div>
    </section>
  );
};

export default HeroSection;
