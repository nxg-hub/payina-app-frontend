import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './_components/logo';
import ActionButtons from './_components/action-buttons';
import { images } from '../../../../constants';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LuX } from 'react-icons/lu';
import { MobileSidebar } from '../sidebar/mobile-sidebar';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import axios from 'axios';

export const Navbar = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [customerUserName, setCustomerUserName] = useState('User');
  const [userImage, setUserImage] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [userTier, setUserTier] = useState('');
  const [showTierAlert, setShowTierAlert] = useState(false);

  const TIER_LEVELS = {
    'TIER_ONE': 'Tier 1 (Basic)',
    'TIER_TWO': 'Tier 2 (Advanced)',
    'TIER_THREE': 'Tier 3 (Premium)',
  };

  const TIER_REQUIREMENTS = {
    'Tier 1': {
      nextTier: 'Tier 2 (Advanced)',
      documents: ['Facials', 'Proof of Address',],
    },
    'Tier 2': {
      nextTier: 'Tier 3 (Premium)',
      documents: ['Government ID', 'Utility Bill'],
    },
  };

  const handleUpgradeClick = () => {
    navigate('/upgrade');
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_GET_USER, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        setCustomerUserName(data.payinaUserName || 'User');
        // setUserImage(data.passportUrl || '');

        const tier = TIER_LEVELS[data.tierLevel] || 'Tier 1';
        setUserTier(tier);

        console.log('Current tier:', tier);
      } catch (error) {
        console.error('Error fetching account details:', error);
        setUserTier('Tier 1 (Basic)');
      }
    };

    fetchAccountDetails();
  }, [newAuthToken]);

  const renderTierStatus = () => {
    const currentTierBase = userTier.split(' ')[0] + ' ' + userTier.split(' ')[1];
    const requirements = TIER_REQUIREMENTS[currentTierBase];

    if (!requirements) {
      return (
        <span className="text-sm font-medium text-green-600">
          {userTier} (Maximum Level)
        </span>
      );
    }

    return (
      <div className="relative">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{userTier}</span>
          <button
            onClick={() => setShowTierAlert(true)}
            className="px-3 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-black rounded-md border border-blue-200"
          >
            Upgrade Available
          </button>
        </div>

        {showTierAlert && (
          <div className="absolute z-50 mt-2 w-72 right-0 bg-white rounded-lg shadow-lg border p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">
                Upgrade to {requirements.nextTier}
              </h3>
              <button
                onClick={() => setShowTierAlert(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="mt-2">
              <p className="mb-2 text-sm">Required documents:</p>
              <ul className="list-disc pl-4 space-y-1">
                {requirements.documents.map((doc, index) => (
                  <li key={index} className="text-sm text-gray-600">{doc}</li>
                ))}
              </ul>
              <button
                onClick={handleUpgradeClick}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Upload Documents
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const selectArrow = `
    select{
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-position: calc(100% - .5rem);
      background-image: url(/blue-dropdown.svg);
      background-repeat: no-repeat;
    }
  `;

  return (
    <div className="flex items-center justify-between pr-10 h-20 bg-[#CCDFE6] xl:fixed w-full text-primary">
      <div className="px-6 xl:px-4 flex space-x-16 gap-20 items-center">
        <div className="w-40">
          <Logo />
        </div>
        <div className="md:space-x-6 hidden xl:flex text-black text-base font-medium">
          <img src={images.Bank} alt="Bank Icon" />
          <div className="text-nowrap font-medium text-base">Personal Account</div>
          <select className="pl-4 pr-8 outline-none border border-lightBlue">
            <option className="capitalize p-2 text-base font-semibold">{customerUserName}</option>
          </select>
          {renderTierStatus()}
        </div>
      </div>

      <div className="items-center hidden xl:flex">
        <ActionButtons />
      </div>
      <style>{selectArrow}</style>
      <div className={`xl:hidden block cursor-pointer ${toggleMenu && 'hidden'}`}>
        <GiHamburgerMenu color="#000000" fontSize={27} onClick={() => setToggleMenu(true)} />
      </div>
      {toggleMenu && (
        <div className="text-black fixed top-0 left-0 right-0 w-full h-[150%] mt-[-1rem] z-50 backdrop-blur-[2px] transition-all duration-150 flex flex-col animate-slideLeft xl:hidden">
          <LuX
            color="#000000"
            className="text-2xl absolute top-8 right-8 cursor-pointer"
            fontSize={30}
            onClick={() => setToggleMenu(false)}
          />
          <MobileSidebar />
        </div>
      )}
    </div>
  );
};
