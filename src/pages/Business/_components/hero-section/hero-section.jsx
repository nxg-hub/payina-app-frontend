import React from 'react';
import Button from '../../../../components/button/button';
import { images } from '../../../../constants';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="xl:py-20 py-10 xl:pt-0 px-10 bg-primary">
      <hr className="bg-yellow h-1 w-[87%] mx-auto" />
      <div className="md:items-center flex flex-col">
        <div className="lg:text-5xl md:w-[70%] md:text-center xl:text-[64px] text-5xl flex justify-center font-bold text-lightBlue pt-10 !leading-normal">
          Elevate Your Finances: Unleash the Future of Business
        </div>
        <p className="xl:text-xl text-[16px] font-normal xl:w-1/2 text-[#000000] lg:pt-6 pt-4 md:text-center xl:leading-normal leading-8">
          Revolutionize your business with our advanced solutions, offering seamless transactions,
          real-time analytics, and enhanced financial control. Experience innovation, efficiency,
          and growth in every aspect of your financial ecosystem
        </p>
        <div className="flex items-center justify-center xl:w-[35%] gap-4 py-8 xl:pt-10 bg-yellow xl:my-12 rounded-[10px]">
          <div className="xl:space-x-4 flex">
            <div className="flex items-center">
              <Button children="Sign up" padding="10px 90px" />
            </div>
            <div className="flex items-center">
              <Button
                children="Speak to a Consultant"
                backgroundColor="transparent"
                textColor="#000"
                padding="10px 50px"
              />
            </div>
          </div>
        </div>
        <hr className="bg-yellow h-1 w-[87%] mx-auto my-10 xl:my-0" />
      </div>
    </section>
  );
};

export default HeroSection;
