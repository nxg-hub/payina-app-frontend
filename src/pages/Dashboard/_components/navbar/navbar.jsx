import { useContext, useEffect, useState } from 'react';

import Logo from './_components/logo';
import ActionButtons from './_components/action-buttons';
import { images } from '../../../../constants';
import { UserContext } from '../../../../context/context';

export const Navbar = () => {
  const [userDetails, setUserDetails] = useState();
  const { data } = useContext(UserContext);
  console.log(userDetails);

  useEffect(() => {
    setUserDetails(data);
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
    <div className="flex items-center justify-between pr-10 h-20 bg-[#CCDFE6] text-primary">
      <div className="px-6 xl:px-4 flex space-x-16 gap-20 items-center">
        <div className="w-40">
          <Logo />
        </div>
        <div className="md:space-x-6 hidden md:flex text-black text-base font-medium">
          <img src={images.Bank} />
          <div className="text-nowrap font-medium text-base">Business Account</div>
          <select className="pl-4 pr-8 outline-none border border-lightBlue">
            <option className="capitalize p-2 text-base font-semibold">
              {userDetails?.business_details?.business_name}
            </option>
          </select>
        </div>
      </div>

      <div className="items-center hidden md:flex">
        <ActionButtons />
      </div>
      <style>{selectArrow}</style>
    </div>
  );
};
