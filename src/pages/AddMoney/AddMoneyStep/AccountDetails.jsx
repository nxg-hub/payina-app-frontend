import React, { useEffect, useState } from 'react';
import backArrow from '../../../assets/images/Group-backArrow.png';
import axios from 'axios';
import useLocalStorage from '../../../hooks/useLocalStorage';

const AccountDetails = ({ goBack }) => {
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [accountDetails, setAccountDetails] = useState({
    accountName: '',
    payinaUserName: '',
    accountNumber: '',
  });

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        const { accountName, payinaUserName, accountNumber } = response.data;
        setAccountDetails({
          accountName,
          payinaUserName,
          accountNumber,
        });
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchAccountDetails();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start ml-[50px] xl:ml-80 xl:pt-28 md:pt-10 mx-auto">
      <div className="flex flex-row justify-between items-left gap-[45rem]">
        <div className="text-xl md:text-3xl">Add Money</div>
        <div className="flex flex-row gap-2 cancelAction-img cursor-pointer" onClick={goBack}>
          <img src={backArrow} alt="cancelAction"></img>
          <div className="text-md text-center mt-2">Back</div>
        </div>
      </div>
      <div className="flex flex-col items-left justify-between gap-4 bg-[#EBEBEB] rounded-md py-5 px-8 xl:py-10 xl:px-14 mt-[80px]">
        <div className="text-md md:text-xl font-bold">Your Account Details</div>
        <div className="flex flex-row justify-between xl:gap-[20rem] md:gap-[5px]">
          <div className="text-md font-medium">Account Name</div>
          <div className="text-md font-medium">{accountDetails.accountName}</div>
        </div>

        <div className="flex flex-row justify-between xl:gap-[20rem] md:gap-[5px]">
          <div className="text-md font-medium">Payina UserName</div>
          <div className="text-md font-medium">{accountDetails.payinaUserName}</div>
        </div>

        <div className="flex flex-row justify-between xl:gap-[20rem] md:gap-[5px]">
          <div className="text-md font-medium">Account Number</div>
          <div className="text-md font-medium">{accountDetails.accountNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
