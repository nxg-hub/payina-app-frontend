import { useEffect, useState } from 'react';
import { PiCopySimple } from 'react-icons/pi';
import useLocalStorage from '../../../../../hooks/useLocalStorage.js';
import { useSelector } from 'react-redux';

const AccountCard = () => {
  const [accountDetails, setAccountDetails] = useState({});
  const [copyMsg, setCopyMsg] = useState('');
  const [showCopy, setShowCopy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');

  //getting the userDetails  from the store
  const userDetails = useSelector((state) => state.user.user);
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(userDetails.accountNumber);
      setCopyMsg('Copied!');
      setShowCopy(true);
      setTimeout(() => {
        setCopyMsg('');
        setShowCopy(false);
      }, 2000);
    } catch (err) {
      setCopyMsg('Failed to copy');
    }
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      // console.log('Fetching account details...');
      const token = newAuthToken; // Use token from useLocalStorage

      if (!token) {
        setError('No auth token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ACCOUNT_DETAILS}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // console.log('API call response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          // console.log('API Response:', result); // Log the response data here

          setAccountDetails({
            // accountNumber: result.accountNumber || '',
            // accountName: result.accountName || '',
            // ownerName: result.customerUserName || '',
            accountStatus: result.accountStatus === 'true' ? 'active' : 'inactive',
          });
          setError('');
        } else {
          setError('Failed to fetch account details');
        }
      } catch (error) {
        console.error('Error in fetch:', error);
        setError('Error fetching account details');
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className="px-4 py-4 mx-auto w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right">
      <div className="block capitalize text-center md:text-[24px] xl:text-[32px] text-[20px] font-semibold">
        {userDetails?.accountName}
        <span className="text-lightBlue">&nbsp;Dashboard</span>
      </div>
      <div className="w-auto p-4 py-6 mt-6 h-fit xl:h-[160px] md:h-fit mx-auto text-start md:text-center bg-[#EDEDED]  rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px]">
        <span className="text-center text-lightBlue font-semibold text-base md:text-2xl mb-4">
          Account Details
        </span>
        <div className="flex md:flex-row gap-4 md:gap-0 pt-4 md:pt-0 flex-col md:items-center justify-between md:text-sm xl:text-base">
          <div className="md:space-x-2 md:mb-6 space-y-4 xl:pl-16 ">
            <div className="flex items-center">
              <span className="text-lightBlue text-sm md:text-base">
                Account No: <span className="text-black">{userDetails?.accountNumber}</span>{' '}
              </span>
              <PiCopySimple
                onClick={handleCopyClick}
                className={`ml-auto hover:cursor-pointer ${showCopy ? 'hidden' : 'block'}`}
                size={22}
                color="#00678F"
              />
              <span
                className={`text-lightBlue ml-auto hidden text-sm md:text-base ${
                  showCopy ? '!block' : 'hidden'
                }`}>
                {copyMsg}
              </span>
            </div>

            <div className="w-full !ml-0 text-sm md:text-base">
              <span className="text-lightBlue ">Account Name:</span>&nbsp;
              <span className="capitalize ">{userDetails?.accountName}</span>
            </div>
          </div>
          <div className="md:space-x-2 !mt-0 md:!mb-6 space-y-4 xl:pr-16 text-start ">
            <div className="text-sm md:text-base">
              <span className="text-lightBlue ">Name of Account Owner:</span>{' '}
              {userDetails?.firstName}
            </div>
            <div className="w-full !ml-0 text-sm md:text-base">
              <span className="text-lightBlue ">Bank Name:</span>&nbsp;
              <span className="capitalize ">{userDetails?.bankName}</span>
            </div>
            <div className="!ml-0 text-sm md:text-base">
              <span className="text-lightBlue ">Account Active:</span>
              <span
                className={
                  accountDetails.accountStatus === 'active' ? 'text-[#42FF00]' : 'text-[#FF0000]'
                }>
                {loading ? '...' : accountDetails.accountStatus === 'active' ? ' Yes' : ' No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
