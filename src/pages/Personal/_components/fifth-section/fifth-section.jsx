// eslint-disable-next-line no-unused-vars
import React from 'react';
import section5 from './../../../../assets/images/section-four.png';
import { Link } from 'react-router-dom';

const FifthSection = () => {
  return (
    <div>
      <div className="bg-lightBlue pt-16 flex flex-col-reverse justify-between lg:flex-row items-center px-16">
        <div className="">
          <img src={section5} alt="" />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-[36px] text-primary md:text-[48px] ">One Login </p>
          <p className="font-bold text-[36px] text-primary text-center md:text-[48px] ">
            Infinite Possibilities{' '}
          </p>
          <Link to="/onboarding/email_verification">
            <button className="bg-[white] w-[200px] rounded-md font-medium md:my-6 my-8 mx-auto py-3 text-[#000]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
