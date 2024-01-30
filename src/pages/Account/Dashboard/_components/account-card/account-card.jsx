import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../../context/context';

import { PiCopySimple } from 'react-icons/pi';

const AccountCard = () => {
  const [business_name, setBusinessName] = useState('');
  const [copyMsg, setCopyMsg] = useState('');
  const [showCopy, setShowCopy] = useState(false);
  const { data } = useContext(UserContext);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText('account_number');
      setCopyMsg('Copied!');
      setShowCopy(true);
      setTimeout(() => {
        setCopyMsg('');
        setShowCopy(false);
      }, 2000);
    } catch (err) {
      setCopyMsg('Falied to copy');
    }
  };
  useEffect(() => {
    setBusinessName(data?.business_details?.business_name);
  }, [data]);

  return (
    <div className="px-4 py-4 mx-auto w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right">
      <div className="block capitalize text-center md:text-[24px] xl:text-[32px] text-[20px] font-semibold">
        {business_name}
        <span className="text-lightBlue">&nbsp;Dashboard</span>
      </div>
      <div className="w-auto p-4 py-6 mt-6 h-fit xl:h-[134x] md:h-fit mx-auto text-start md:text-center bg-[#EDEDED] rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px]">
        <span className="text-center text-lightBlue font-semibold text-base md:text-2xl mb-4">
          Account Details
        </span>
        <div className="flex md:flex-row gap-4 md:gap-0 pt-4 md:pt-0 flex-col md:items-center justify-between md:text-sm xl:text-base">
          <div className="md:space-x-2 md:mb-6 space-y-4 xl:pl-16 ">
            <div className="flex items-center">
              <span className="text-lightBlue text-sm md:text-base">
                Account No: <span className="text-black">3434556676</span>{' '}
              </span>{' '}
              <PiCopySimple
                onClick={handleCopyClick}
                className={`ml-auto hover:cursor-pointer ${showCopy ? 'hidden' : 'block'}`}
                size={22}
                color="#00678F"
              />
              <span
                className={`text-lightBlue ml-auto hidden text-sm md:text-base  ${
                  showCopy ? '!block' : 'hidden'
                }`}>
                {copyMsg}
              </span>
            </div>

            <div className="w-full !ml-0 text-sm md:text-base">
              <span className="text-lightBlue ">Account Name:</span>&nbsp;
              <span className="capitalize ">{business_name}</span>
            </div>
          </div>
          <div className="md:space-x-2 !mt-0 md:!mb-6 space-y-4 xl:pr-16 text-start ">
            <div className="text-sm md:text-base">
              <span className="text-lightBlue ">Name of Account Owner:</span> Jacob Yakub
            </div>
            <div className="!ml-0 text-sm md:text-base">
              <span className="text-lightBlue ">Account Active:</span>
              <span className="text-[#42FF00] "> Yes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
