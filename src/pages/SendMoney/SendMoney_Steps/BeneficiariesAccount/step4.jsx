import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import SuccessMessage from '../step5';
import DeclineMessage from '../step6';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const EnterPin = ({ data }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [userEmail, setUserEmail] = useState('');
  const [walletId, setWalletId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [loading, setLoading] = useState(false);

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

  const handlePinChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`pin-input-${index - 1}`).focus();
    }
  };

  const handleNext = async () => {
    if (!userEmail || !walletId) {
      setErrorMessage('User data is not available. Please try again.');
      return;
    }

    const pinString = pin.join('');
    if (pinString.length < 4) {
      setErrorMessage('Please enter a complete PIN.');
      return;
    }

    setLoading(true);
    try {
      const pinResponse = await axios.post(
        import.meta.env.VITE_VALIDATE_TRANSACTION_PIN_ENDPOINT,
        null,
        {
          params: {
            email: userEmail,
            transactionPin: pinString,
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
          name: data.selectedBeneficiaryName,
          account_number: data.accountNumber,
          bank_code: data.bankCode,
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

        console.log('Transaction Response Data:', transactionResponse.data);

        const isSuccess =
          transactionResponse.data?.httpStatusCode === 'OK' &&
          transactionResponse.data?.response?.toLowerCase().includes('transfer successful');

        if (isSuccess) {
          setShowSuccess(true);
          console.log('Transaction Success: Transaction completed successfully.');
        } else {
          setShowDecline(true);
          console.log('Transaction Declined: Transaction could not be completed.');
        }
      } else {
        console.log('PIN validation failed.');
        setShowDecline(true);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.debugMessage ||
          error.response?.data?.response ||
          'Transaction process failed. Please try again.'
      );
      console.error('Error Status:', error.response?.status);
      console.error('Error Data:', error.response?.data);
      setShowDecline(true);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) return <SuccessMessage />;
  if (showDecline) return <DeclineMessage errorMessage={errorMessage} />;
  // if (showDecline) return <DeclineMessage />;

  return (
    <div className="transaction-pin flex flex-col justify-center items-center bg-[#D2D2D285] rounded-md md:p-[2rem] sm:p-[2rem] xl:py-[3rem] xl:px-[5rem] mt-[5rem] gap-8 mx-auto">
      {loading ? (
        <div className="flex flex-col items-center">
          <ReactLoading type="spin" color="#00678F" height={50} width={50} />
          <span className="mt-4 text-lightBlue">Transaction processing...</span>
        </div>
      ) : (
        <>
          <span>Enter Transaction Pin</span>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="circle flex flex-row justify-center items-center gap-6">
            {pin.map((_, i) => (
              <input
                key={i}
                id={`pin-input-${i}`}
                type="password"
                maxLength="1"
                pattern="[0-9]*"
                inputMode="numeric"
                className="rounded-full border-2 border-lightBlue bg-[#D2D2D285] w-12 h-12 text-center text-lg"
                value={pin[i]}
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
        </>
      )}
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
    bankCode: PropTypes.string.isRequired,
    accountNumber: PropTypes.string.isRequired,
    accountBankCode: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default EnterPin;
