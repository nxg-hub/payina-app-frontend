import { useEffect, useState } from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { TbChecklist, TbUserDollar, TbSettings } from 'react-icons/tb';
import { LuFileClock } from 'react-icons/lu';
import { RiFileSettingsLine } from 'react-icons/ri';
import { VscSignOut } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';
import images from '../../../../constants/images';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';

export const Sidebar = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [error, setError] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!newAuthToken) {
        setError('No auth token found');
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_GET_USER, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched User Details:', data);
          setUserName(data.payinaUserName || 'User');
          setUserImage(data.passportUrl || '');
          setError('');
        } else {
          setError('Failed to fetch user details');
        }
      } catch (err) {
        setError('Error fetching user details');
        console.error(err);
      }
    };

    fetchUserDetails();
  }, [newAuthToken]);

  return (
    <div style={{
      overflowY: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }} className="bg-[#CCDFE6] fixed left-0 top-[5.5rem] w-[312px] h-[calc(100vh-5.5rem)] overflow-y-auto rounded-[10px] px-4 py-4 xl:block hidden scrollbar">
     <div className="space-y-[52px] flex flex-col w-full pb-20">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-20">
          {userImage ? (
            <img
              src={userImage}
              alt="profile image"
              className="w-24 h-24 rounded-full object-cover"
              onError={(e) => {
                e.target.src = images.Profile;
                console.log('Error loading passport image, using fallback');
              }}
            />
          ) : (
            <img
              src={images.Profile}
              alt="profile image"
              className="w-24 h-24"
            />
          )}
          <div className="font-semibold text-xl mt-2">
            {error ? `Error: ${error}` : `Hi, ${userName}`}
          </div>
        </div>
        <div className="space-y-[52px] flex flex-col w-full">
          <Link
            to="/account/dashboard"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/dashboard' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <AiOutlineAppstore size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Dashboard</span>
          </Link>
          <Link
            to="/account/invoice"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/invoice' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <TbChecklist size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Invoice</span>
          </Link>
          <Link
            to="/account/payroll"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/payroll' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <TbUserDollar size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Payroll</span>
          </Link>
          <Link
            to="/account/transaction"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/transaction' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <LuFileClock size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Transaction History</span>
          </Link>
          <Link
            to="/account/inventory"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/inventory' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <RiFileSettingsLine size={22} />
            <span className="hover:text-lightBlue ease transition-colors text-nowrap">
              Inventory Management
            </span>
          </Link>
          <Link
            to="/account/settings"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/settings' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <TbSettings size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Account Settings</span>
          </Link>
          <Link
            to="/"
            className={`!mt-[10rem] flex items-center space-x-6 ${
              currentRoute === '/' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <VscSignOut size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Sign Out</span>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;