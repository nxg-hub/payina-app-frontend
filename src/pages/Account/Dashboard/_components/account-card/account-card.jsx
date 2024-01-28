import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../../context/context';

const AccountCard = () => {
  const [business_name, setBusinessName] = useState('KayCee and Sons Enterprise');
  const { data } = useContext(UserContext);

  //   useEffect(() => {
  //     setBusinessName(data?.business_details?.business_name);
  //   }, [data])

  return (
    <div className="px-4 py-6 mx-auto w-auto ml-0 xl:ml-[19rem] clear-none xl:clear-right">
      <div className="block text-center md:text-[24px] xl:text-[32px] text-[20px] font-semibold">
        {business_name}
        <span className="text-lightBlue">&nbsp;Dashboard</span>
      </div>
      <div className="w-auto p-4 py-6 mt-6 h-fit xl:h-[134x] md:h-fit mx-auto text-start md:text-center bg-[#EDEDED] rounded-[10px]">
        <span className="text-center text-lightBlue font-semibold text-2xl mb-4">Account Details</span>
        <div className="flex md:flex-row gap-4 md:gap-0 pt-4 md:pt-0 flex-col md:items-center justify-between md:text-sm xl:text-base">
          <div className="md:space-x-2 md:mb-6 space-y-4 xl:pl-16 ">
            <div><span className='text-lightBlue'>Account No:</span> 3434556676 </div>
            <div><span className='text-lightBlue'>Account Name:</span>&nbsp;{business_name}</div>
          </div>
          <div className="md:space-x-2 !mt-0 md:!mb-6 space-y-4 xl:pr-16">
            <div><span className='text-lightBlue'>Name of Account Owner:</span> Jacob Yakub</div>
            <div><span className='text-lightBlue'>Account Active:</span><span className='text-[#42FF00]'> Yes</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
