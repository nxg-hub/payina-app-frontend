import React, { useEffect, useState } from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { TbChecklist, TbUserDollar, TbSettings } from 'react-icons/tb';
import { LuFileClock } from 'react-icons/lu';
import { RiFileSettingsLine } from 'react-icons/ri';
import { VscSignOut } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';
import images from '../../../../constants/images';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';

export const MobileSidebar = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [customerUserName, setCustomerUserName] = useState('User'); // Default display name
  const [newAuthToken] = useLocalStorage('authtoken', '');
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_ACCOUNT_DETAILS, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch account details');
        }

        const data = await response.json();
        console.log('FETCHED username:', data.customerUserName);
        setCustomerUserName(data.customerUserName || '');
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchAccountDetails();
  }, []);

  return (
    <div className="bg-[#CCDFE6] rounded-[10px] px-10 py-10 mt-4 w-[312px] h-[999px] overflow-y-scroll">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-20">
          <img src={images.Profile} alt="profile image" />
          <div className="font-semibold text-xl mt-2">Hi, {customerUserName}</div>
        </div>
        <div className="space-y-[42px] flex flex-col w-full">
          <Link to="/account/dashboard" className={`flex items-center space-x-6 ${currentRoute === '/account/dashboard' ? '!ml-3 font-bold text-lightBlue' : ''}`}>
            <AiOutlineAppstore size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Dashboard</span>
          </Link>
          <Link to="/account/invoice" className={`flex items-center space-x-6 ${currentRoute === '/account/invoice' ? '!ml-3 font-bold text-lightBlue' : ''}`}>
            <TbChecklist size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Invoice</span>
          </Link>
          <Link to="/account/payroll" className={`flex items-center space-x-6 ${currentRoute === '/account/payroll' ? '!ml-3 font-bold text-lightBlue' : ''}`}>
            <TbUserDollar size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Payroll</span>
          </Link>
          <Link to="/account/transaction" className={`flex items-center space-x-6 ${currentRoute === '/account/transaction' ? '!ml-3 font-bold text-lightBlue' : ''}`}>
            <LuFileClock size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Transaction History</span>
          </Link>
          <Link to="/account/inventory" className={`flex items-center space-x-6 ${currentRoute === '/account/inventory' ? '!ml-3 font-bold text-lightBlue' : ''}`}>
            <RiFileSettingsLine size={22} />
            <span className="hover:text-lightBlue ease transition-colors text-nowrap">Inventory Management</span>
          </Link>
          <Link to="/account/settings" className={`flex items-center space-x-6 ${currentRoute === '/account/settings' ? '!ml-3 font-bold text-lightBlue' : ''}`}>
            <TbSettings size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Account Settings</span>
          </Link>
          <Link to="/" className={`flex items-center space-x-6 ${currentRoute === '/' ? '!ml-3 font-bold text-lightBlue' : ''}`}>
            <VscSignOut size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Sign Out</span>
          </Link>
          <div className="flex space-x-10 justify-center mt-20">
            <Link href="/" className="items-center">
              <div className="hover:scale-95">
                <img src={images.Headphone} alt="customer care" />
              </div>
            </Link>
            <Link to="/">
              <div className="hover:scale-95">
                <img src={images.Bell} alt="notifications" />
              </div>
            </Link>
            <Link to="/">
              <div className="hover:scale-95">
                <img src={images.Settings} alt="settings" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
