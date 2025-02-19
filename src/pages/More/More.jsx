import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../constants';
import AccountLimits from './Limits';
import SwitchAccount from './SwitchAccount';
import Terms from './Terms';
import ContactUs from './contactUs/moreContact';

const More = () => {
  const [activeSection, setActiveSection] = useState(null);

  const goBack = () => {
    setActiveSection(null);
  };

  const menuItems = [
    // {
    //   icon: images.Invoice,
    //   text: 'Bank Statement',
    //   link: '/bank-statement'
    // },
    {
      icon: images.InvoiceMore,
      text: 'Account Limits',
      spanText: 'Select a tier to view benefits and upgrade your account.',
      section: 'accountLimits',
    },
    // {
    //   icon: images.Recurr,
    //   text: 'Recurring Payments',
    //   link: '/recurring-payments'
    // },
    // {
    //   icon: images.IdentityVerification,
    //   text: 'Identity Verification',
    //   link: '/verify-identity'
    // },
    {
      icon: images.ContactUs,
      text: 'Contact Us',
      spanText: 'Get in touch with our support team for help.',
      section: 'ContactUs',
    },
    {
      icon: images.TermsAndConditions,
      text: 'Terms and Conditions',
      spanText: 'View the terms guiding your account and services.',
      className: 'lg:px-[48px]',
      section: 'terms',
    },
    {
      icon: images.SwitchAccount,
      text: 'Switch Account',
      spanText: 'Switch between your accounts easily.',
      section: 'switchAccount',
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'accountLimits':
        return <AccountLimits goBack={goBack} />;
      case 'ContactUs':
        return <ContactUs goBack={goBack} />;
      case 'terms':
        return <Terms goBack={goBack} />;
      case 'switchAccount':
        return <SwitchAccount goBack={goBack} />;
      default:
        return (
          <div className="flex flex-col justify-between items-start p-7 lg:px-0 lg:ml-80 lg:py-28 pt-10 mx-auto">
            <div className="flex flex-row justify-between items-left gap-[5rem] md:gap-[15rem] lg:gap-[45rem] pb-7">
              <div className="text-xl md:text-3xl font-medium">More</div>
              <Link to="/account/dashboard">
                <div className="cancelAction-img">
                  <img src={images.BackIcon} alt="cancelAction"></img>
                </div>
              </Link>
            </div>
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveSection(item.section)}
                className={`flex flex-row lg:gap-[7rem] gap-5 justify-between items-center cursor-pointer hover:border-yellow mt-3 lg:px-[69px] px-2 py-2 bg-[#D9D9D9] text-black border border-[#006181] rounded-lg ${item.className}`}>
                <div className="flex flex-col gap-3">
                  <h1 className="text-left text-black font-bold mt-5 ml-2 text-md lg:text-2xl whitespace-nowrap">
                    {item.text}
                  </h1>
                  <p className="text-left text-neutral ml-2 text-sm md:text-base max-w-[220px]">
                    {item.spanText}
                  </p>
                </div>
                <div className="border border-yellow rounded-full lg:p-3 p-2">
                  <img src={item.icon} alt="" className="lg:w-[100px] w-[200px]" />
                </div>
                <div className="text-gray-400">
                  <img src={images.ArrowRight} alt="" className="lg:w-5 lg:h-5 w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return <div className="">{renderSection()}</div>;
};

export default More;
