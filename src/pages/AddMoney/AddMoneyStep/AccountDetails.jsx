import React, { useEffect, useState } from 'react';
import backArrow from '../../../assets/images/Group-backArrow.png';
import axios from 'axios';
import useLocalStorage from '../../../hooks/useLocalStorage';

const AccountDetails = ({ goBack }) => {
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accountDetails, setAccountDetails] = useState({
    accountName: '',
    payinaUserName: '',
    accountNumber: '',
    bankName: '',
  });

  useEffect(() => {
    const fetchAccountDetails = async () => {
      setLoading(true);

      try {
        const response = await axios.get(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        if (response.status === 200) {
          setLoading(false);
          setError(false);
          const { accountName, payinaUserName, accountNumber, bankName } = response.data;
          setAccountDetails({
            accountName,
            payinaUserName,
            accountNumber,
            bankName,
          });
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start ml-[50px] xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
      <div className="flex flex-row justify-between items-left lg:gap-[45rem] gap-[5rem] mt-3">
        <div className="text-xl md:text-3xl">Add Money</div>
        <div className="flex flex-row gap-2 cancelAction-img cursor-pointer" onClick={goBack}>
          <img src={backArrow} alt="cancelAction"></img>
          <div className="text-md text-center mt-2">Back</div>
        </div>
      </div>
      <div className="flex flex-col items-left justify-between gap-4 bg-[#EBEBEB] rounded-md py-5 px-8 lg:py-10 lg:px-14 mt-[80px]">
        {loading ? (
          <h2 className="text-center">Loading Account Details...</h2>
        ) : !loading && error ? (
          <h2 className="text-center text-red-500">
            Error Loading Account Details. Check internet connection and try again.
          </h2>
        ) : (
          <>
            <div className="text-md md:text-xl font-bold">Your Account Details</div>
            <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
              <div className="text-md font-medium">Account Name:</div>
              <div className="text-md font-medium">{accountDetails.accountName}</div>
            </div>

            <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
              <div className="text-md font-medium">Payina UserName:</div>
              <div className="text-md font-medium">{accountDetails.payinaUserName}</div>
            </div>

            <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
              <div className="text-md font-medium">Account Number:</div>
              <div className="text-md font-medium">{accountDetails.accountNumber}</div>
            </div>
            <div className="flex flex-row justify-between lg:gap-[20rem] gap-[5px]">
              <div className="text-md font-medium"> Bank Name:</div>
              <div className="text-md font-medium">{accountDetails.bankName}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
