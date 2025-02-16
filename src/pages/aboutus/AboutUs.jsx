// eslint-disable-next-line no-unused-vars
import React from 'react';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import { images } from '../../constants';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="bg-black text-white">
      <Navbar />
      <div
        className="w-[80%] h-1 border-none mr-auto ml-auto
            mt-[-2px] mb-10 bg-yellow"></div>
      <div className="flex flex-col justify-between items-center p-5 lg:m-auto">
        <div className="flex lg:flex-row flex-col justify-between items-center gap-10 lg:gap-[300px] lg:p-5 lg:mx-auto lg:my-5">
          <div className="flex flex-col jutify-start items-start lg:items-base lg:w-[30vw]">
            <h1 className="lg:text-[45px] text-[30px] font-bold mb-4 text-lightBlue">
              About Payina
            </h1>
            <p className="text-lg">
              We strive to make payments seamless and secure for everyone. Our mission is to
              simplify financial transactions and empower individuals and businesses to thrive in
              the digital economy.
            </p>
            <Link to="/onboarding/email_verification">
              <div className="mt-5">
                <button
                  type="submit"
                  className="rounded-xl text-lightBlue hover:text-white text-xs md:text-base py-[10px] px-[30px] border border-lightBlue bg-yellow hover:bg-[#FFb950] hover:bg-yellow-400 transition-all transform hover:scale-105 hover:animate-bounce">
                  Join Payina
                </button>
              </div>
            </Link>
          </div>

          <div>
            <img src={images.section5} alt="section5Img"></img>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-5 p-5 lg:w-[50vw] lg:m-auto mt-10">
          <h1 className="text-center text-nowrap text-[30px] lg:text-[45px] font-bold lg:mb-4 text-lightBlue">
            Why Choose Payina?
          </h1>
          <p className="text-base lg:text-lg">
            At Payina, we are committed to revolutionizing the way you handle financial
            transactions. Our mission is to simplify payments and empower both individuals and
            businesses to thrive in the digital economy in africa.
          </p>
          <p className="text-base lg:text-lg">
            We believe that financial transactions should be seamless, secure, and accessible to
            all. With a vision of creating a world where payments are frictionless and transparent,
            we leverage cutting-edge technology to transform how money moves.
          </p>
          <p className="text-base lg:text-lg">
            Whether you&apos;re sending funds, paying bills, or managing finances, Payina ensures a
            smooth and hassle-free experience. Our goal is to become a trusted name in the payments
            industry, continuously innovating to enhance security, efficiency, and customer
            satisfactions.
          </p>
          <p className="text-base lg:text-lg">
            With a dedicated team working around the clock, we provide solutions that prioritize
            your convenience, security, and peace of mind. Choose Payina for a smarter, faster, and
            more reliable way to manage your transactions.
          </p>
        </div>

        <div className="mt-10">
          <div className=" text-[white] flex justify-center items-center">
            <div>
              {' '}
              <p className="text-center pt-6 text-primary text-[14px] md:text-[20px]">
                What Set’s Us Apart ?
              </p>
            </div>
          </div>

          <hr className="border-none bg-yellow h-1 mt-4 mb-4  w-[87%] mx-auto" />
          <div className="xl:py-20 py-20 grid place-content-center">
            <img src={images.polygon} className="" alt="" />
          </div>
        </div>

        <div className="flex flex-col justify-center text-center bg-black w-full px-4">
          <div className="text-lightBlue font-bold py-6 text-3xl md:text-4xl xl:text-5xl">
            Businesses That Trust Us
          </div>
          <hr className="border mt-4 mb-10 text-yellow w-[85%] mx-auto" />

          <div className="overflow-hidden whitespace-nowrap py-5">
            <div className="flex gap-10 animate-scroll">
              {/* Duplicating logos for infinite loop */}
              {[
                images.Netflix,
                images.Nivea,
                images.CVS,
                images.Google,
                images.Phillips,
                images.Zillow,
                images.Sap,
                images.Hermes,
                images.Huawei,
                images.Zara,
                images.Ge,
              ].map((logo, index) => (
                <img key={index} src={logo} alt={`logo_${index}`} className="" />
              ))}

              {[
                images.Netflix,
                images.Nivea,
                images.CVS,
                images.Google,
                images.Phillips,
                images.Zillow,
                images.Sap,
                images.Hermes,
                images.Huawei,
                images.Zara,
                images.Ge,
              ].map((logo, index) => (
                <img
                  key={`dup-${index}`}
                  src={logo}
                  alt={`logo_dup_${index}`}
                  className="lg:w-[10%] w-[20%]"
                />
              ))}
            </div>
          </div>

          <hr className="border mt-4 mb-10 text-yellow w-[85%] mx-auto" />
        </div>
      </div>
      <div className="relative">
        <img src={images.transparentimg} alt="" className="h-full w-full" />
        <Link to="/onboarding/email_verification">
          <button
            type="submit"
            className="absolute bottom-[0.2rem] left-[9rem] lg:bottom-[5rem] lg:left-[40rem] rounded-xl text-white text-sm lg:text-xl md:text-center lg:py-[15px] py-[7px] px-[10px] lg:px-[60px] border border-white hover:border-lightBlue bg-lightBlue hover:bg-yellow">
            Get Started
          </button>
        </Link>
      </div>
      <div className="">
        <Footer />
      </div>
    </section>
  );
};

export default AboutUs;
