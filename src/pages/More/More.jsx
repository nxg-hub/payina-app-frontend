import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../constants';
import { Navbar } from '../Account/_components/index.js';
import { Sidebar } from '../Account/_components/sidebar/sidebar.jsx';

const More = () => {
  const menuItems = [
    // {
    //   icon: images.Invoice,
    //   text: 'Bank Statement',
    //   link: '/bank-statement'
    // },
    {
      icon: images.Invoice,
      text: 'Account Limits',
      link: '/account-limits'
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
      link: '/contact-us'
    },
    {
      icon: images.TermsAndConditions,
      text: 'Terms and Conditions',
      link: '/terms'
    },
    {
      icon: images.SwitchAccount,
      text: 'Switch Account',
      link: '/account/switch'
    }
  ];

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="max-w-md mx-auto w-full mt-28">
        {/*<div className="max-w-md mx-auto p-4">*/}
          <div className="space-y-2 w-4/5">
            {menuItems.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-6 h-6"
                    />
                  </div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
                <div className="text-gray-400">
                  <img
                    src={images.ArrowRight}
                    alt=""
                    className="w-5 h-5"
                  />
                </div>
              </Link>
            ))}

            {/*<button*/}
            {/*  className="w-full mt-4 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">*/}
            {/*  <span>Log Out</span>*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
    </div>
        );
        };

        export default More;