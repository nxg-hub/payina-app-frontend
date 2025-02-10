import React, { useState } from 'react';
import { images } from '../../../constants';
import { Link } from 'react-router-dom';
import ContactForm from './contactForm';

const MoreContact = ({ goBack }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  return (
    <div className="flex flex-col justify-between items-center lg:ml-80 lg:pt-28 pt-10 ml-0 lg:mx-auto">
      {/* Conditionally render ContactForm or MoreContact */}
      {showContactForm ? (
        <ContactForm goBack={() => setShowContactForm(false)} />
      ) : (
        <>
          <div className="flex flex-row justify-between items-center gap-[5rem] lg:gap-[45rem] p-0 lg:pb-7">
            <div className="text-xl md:text-3xl font-medium">Contact Us</div>
            <div className="cancelAction-img" onClick={goBack}>
              <img src={images.BackIcon} alt="cancelAction"></img>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-5 items-center p-5 mt-3">
            <div className="flex flex-col justify-between items-base gap-[1.8rem] py-5 px-10 rounded-xl w-[300px] h-[700px] bg-[#ccdfe6] text-black">
              <div className="w-[120px] h-[120px]">
                <img src={images.CustomerCare} className="w-[100%] h-auto rounded-full"></img>
              </div>
              <h1 className="text-black text-[30px]">In-App Customer Service</h1>
              <div className="w-[90px] h-[90px]">
                <img src={images.CallingIcon} className="w-[100%] h-auto rounded-full"></img>
              </div>
              <p className="text-black text-[17px] font-semibold">
                At Payina, we are committed to providing you with seamless and secure transactions.
                If you ever encounter any issues or need assistance, our Customer Support Team is
                here for you!
              </p>
            </div>

            <div className="flex flex-col justify-between items-base gap-3 py-7 px-10 rounded-xl w-[300px] h-[700px] bg-[#ccdfe6] text-black">
              <div className="flex flex-col gap-5 items-base justify-center">
                <div className="w-[120px] h-[120px]">
                  <img src={images.CallingIcon} className="w-[100%] h-auto"></img>
                </div>
                <h1 className="text-black text-[30px]">Mobile</h1>
              </div>
              <div className="flex flex-col gap-3 items-base justify-center">
                {' '}
                <div className="w-[40px] h-[40px]">
                  <img src={images.TalkIcon} className="w-[100%] h-auto"></img>
                </div>
                <p className="text-black text-[17px] text-nowrap font-semibold">
                  support@payina.com.ng
                </p>
              </div>

              <div className="flex flex-col gap-5 items-base justify-center">
                {' '}
                <div className="w-[40px] h-[40px]">
                  <img src={images.phoneIcon} className="w-[100%] h-auto"></img>
                </div>
                <p className="text-black text-[17px] text-nowrap font-semibold">
                  09037394146 / 09037394146
                </p>
              </div>

              <div className="flex flex-col gap-5 items-base justify-between">
                {' '}
                <div className="flex flex-row justify-base items-base gap-7">
                  <div className="w-[40px] h-[40px]">
                    <img src={images.ReachAlways} className="w-[100%] h-auto"></img>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <img src={images.WhatsAppIcon} className="w-[100%] h-auto"></img>
                  </div>
                </div>
                <p className="text-black text-[17px] font-semibold"> +234 903 739 4146</p>
              </div>
            </div>

            <div className="flex flex-col justify-between items-base gap-[2rem] py-7 px-10 rounded-xl w-[300px] h-[700px] bg-[#ccdfe6] text-black">
              <div className="w-[120px] h-[120px]">
                <img src={images.SocialTree} className="w-[100%] h-auto"></img>
              </div>
              <h1 className="text-black text-[30px]">Social Media</h1>

              <Link to="/" className="flex flex-row gap-5 cursor-pointer">
                <div className="w-[30px] h-[30px]">
                  <img src={images.InstagramIcon} className="w-[100%] h-auto rounded-full"></img>
                </div>
                <h2 className="text-black text-[18px] font-semibold underline underline-offset-7 decoration-yellow">
                  Instagram
                </h2>
              </Link>

              <Link to="/" className="flex flex-row gap-5 cursor-pointer">
                <div className="w-[30px] h-[30px]">
                  <img src={images.TwitterIcon} className="w-[100%] h-auto rounded-full"></img>
                </div>
                <h2 className="text-black text-[18px] font-semibold underline underline-offset-7 decoration-yellow">
                  Twitter
                </h2>
              </Link>

              <Link to="/" className="flex flex-row gap-5 cursor-pointer">
                <div className="w-[30px] h-[30px]">
                  <img src={images.FacebookIcon} className="w-[100%] h-auto rounded-full"></img>
                </div>
                <h2 className="text-black text-[18px] font-semibold underline underline-offset-7 decoration-yellow">
                  Facebook
                </h2>
              </Link>

              <div className="flex flex-col gap-3">
                <p className="text-black text-[17px] font-semibold text-nowrap">
                  Send message directly
                </p>
                <p className="text-black text-[17px] font-semibold text-nowrap">to our inbox</p>
                <div
                  className="flex flex-row gap-5 mt-2 cursor-pointer"
                  onClick={() => setShowContactForm(true)}>
                  <img src={images.SendEmail} className="w-[30px] h-[30px]"></img>
                  <h2 className="text-black text-[18px] font-semibold underline underline-offset-7 text-nowrap decoration-yellow">
                    {' '}
                    Direct Inbox
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoreContact;
