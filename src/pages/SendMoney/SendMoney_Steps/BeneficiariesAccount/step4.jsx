import React, { useEffect, useState } from 'react';
import backArrow from '../../../../assets/images/Group-backArrow.png';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import SuccessMessage from './step5';
import DeclineMessage from './step6';
import axios from 'axios';
import PropTypes from 'prop-types';

const EnterPin = ({ prevStep, data }) => {
  const [pin, setPin] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [walletId, setWalletId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [bankCode, setBankCode] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        console.log('User data fetched successfully:', userResponse.data);
        setUserEmail(userResponse.data.email);
        setWalletId(userResponse.data.walletId);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
      }
    };
    fetchUserData();
  }, [newAuthToken]);

  useEffect(() => {
    const fetchBankCode = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GET_BANKS_NAME_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        if (response.data.success) {
          setBankCode(response.data.bank_code);
          console.log('Fetched bank code:', response.data.bankCode);
        } else {
          console.error('Failed to fetch bank code:', response.data);
          setErrorMessage('Failed to fetch bank code.');
        }
      } catch (error) {
        console.error('Error fetching bank code:', error);
        setErrorMessage('Error while fetching bank code.');
      }
    };

    fetchBankCode();
  }, [data.selectedBeneficiaryName, newAuthToken]);

  const handlePinChange = (e, index) => {
    const newPin = pin.split('');
    newPin[index] = e.target.value;
    setPin(newPin.join(''));
  };

  const handleNext = async () => {
    if (!userEmail || !walletId) {
      setErrorMessage('User data is not available. Please try again.');
      return;
    }

    if (pin.length < 4) {
      setErrorMessage('Please enter a complete PIN.');
      return;
    }

    try {
      const pinResponse = await axios.post(
        import.meta.env.VITE_VALIDATE_TRANSACTION_PIN_ENDPOINT,
        null,
        {
          params: {
            email: userEmail,
            transactionPin: pin,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        }
      );

      console.log('Full PIN Validation Response:', pinResponse);

      if (pinResponse.data === 'Transaction PIN is valid.') {
        console.log('PIN validated successfully. Starting another bank transfer...');

        const transactionPayload = {
          amount: data.amount,
          recipient: data.selectedBeneficiaryName,
          reason: data.purpose,
          name: data.bankName,
          account_number: data.accountNumber,
          bank_code: bankCode,
          currency: data.currency,
          customerEmail: userEmail,
          walletId: walletId,
          description: data.purpose,
        };
        console.log('Transaction payload:', transactionPayload);

        const transactionResponse = await axios.post(
          import.meta.env.VITE_API_OTHER_BANK_SEND_MONEY_ENDPOINT,
          transactionPayload,
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAuthToken}`,
            },
          }
        );

        console.log('Full Transaction Response:', transactionResponse);

        if (transactionResponse.data.success) {
          console.log('Transaction Success: Transaction completed successfully.');
          setShowSuccess(true);
        } else {
          console.log('Transaction Declined: Transaction could not be completed.');
          setShowDecline(true);
        }
      } else {
        console.log('PIN validation failed.');
        setShowDecline(true);
      }
    } catch (error) {
      console.error('Error during transaction process:', error);

      if (error.response) {
        console.error('Error Status:', error.response.status);
        console.error('Error Data:', error.response.data);
      } else {
        console.error('Error Message:', error.message);
      }

      setErrorMessage('Transaction process failed. Please try again.');
      setShowDecline(true);
    }
  };

  if (showSuccess) return <SuccessMessage />;
  if (showDecline) return <DeclineMessage />;

  return (
    <div className="transaction-pin flex flex-col justify-center items-center bg-[#D2D2D285] rounded-md py-[3rem] px-[5rem] mt-[5rem] gap-8 mx-auto">
      <span>Enter Transaction Pin</span>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div className="circle flex flex-row justify-center items-center gap-6">
        {[0, 1, 2, 3].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            pattern="[0-9]*"
            inputMode="numeric"
            className="rounded-full border-2 border-lightBlue bg-[#D2D2D285] w-12 h-12 text-center text-lg"
            value={pin[i] || ''}
            onChange={(e) => handlePinChange(e, i)}
          />
        ))}
      </div>
      <div className="flex mt-5 justify-center">
        <button
          type="submit"
          onClick={handleNext}
          className="rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[200px] text-primary">
          Next
        </button>
      </div>
    </div>
  );
};

EnterPin.propTypes = {
  prevStep: PropTypes.func.isRequired,
  data: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    selectedBeneficiaryName: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    bankName: PropTypes.string.isRequired,
    accountNumber: PropTypes.string.isRequired,
    accountBankCode: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default EnterPin;
