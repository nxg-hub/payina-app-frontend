import { useContext, useEffect, useState } from 'react';

import Logo from './_components/logo';
import ActionButtons from './_components/action-buttons';
import { images } from '../../../../constants';
import { UserContext } from '../../../../context/context';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LuX } from 'react-icons/lu';
import { MobileSidebar } from '../sidebar/mobile-sidebar';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';

export const Navbar = () => {
  // const [userDetails, setUserDetails] = useState();
  const [toggleMenu, setToggleMenu] = useState(false);
  // const { data } = useContext(UserContext);
  const [customerUserName, setCustomerUserName] = useState('User');
  const [userImage, setUserImage] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');

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
        setUserImage(data.passportUrl || '');
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };
    fetchAccountDetails();
  }, []);

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
    <div className="flex items-center justify-between pr-10 h-20 bg-[#CCDFE6] xl:fixed w-full  text-primary">
      <div className="px-6 xl:px-4 flex space-x-16 gap-20 items-center">
        <div className="w-40">
          <Logo />
        </div>
        <div className="md:space-x-6 hidden xl:flex text-black text-base font-medium">
          <img src={images.Bank} />
          <div className="text-nowrap font-medium text-base">Business Account</div>
          <select className="pl-4 pr-8 outline-none border border-lightBlue">
            <option className="capitalize p-2 text-base font-semibold">{customerUserName}</option>
          </select>
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
            className="text-2xl absolute top-8 right-8  cursor-pointer"
            fontSize={30}
            onClick={() => setToggleMenu(false)}
          />
          <MobileSidebar />
        </div>
      )}
    </div>
  );
};
