import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import SuccessMessage from '../step5';
import DeclineMessage from '../step6';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../../../Redux/loadingSlice.jsx';
import { setWalletBalance } from '../../../../Redux/WalletSlice.jsx';

const EnterPin = ({ data }) => {
  const dispatch = useDispatch();
  const [pin, setPin] = useState(['', '', '', '']);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [loading, setLoading] = useState(false);
  const [userLoader, setUserLoading] = useState(false);
  const [soleMsg, setSoleMsg] = useState(false);
  //getting the userDetails  from the store
  const currentBalance = useSelector((state) => state.wallet.wallet);
  const userDetails = useSelector((state) => state.user.user);
  const userBusinessDetails = useSelector((state) => state.coporateCustomerProfile.customerDetails);
  const userEmail = userDetails.email;
  const walletId = userDetails.walletId;
  const userType = userDetails.userType;
  const customerId = userDetails.customerId;
  const businessName = userBusinessDetails?.businessName;
  if (loading) {
    dispatch(showLoading());
  } else {
    dispatch(hideLoading());
  }
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

      // console.log('Full PIN Validation Response:', pinResponse);

      if (pinResponse.status === 200 || pinResponse.data.message === 'Transaction PIN is valid.') {
        console.log('PIN validated successfully. Starting another bank transfer...');

        const transactionPayload =
          //conditionally set transactionPayload based on userType
          userType === 'CORPORATE'
            ? {
                corporateCustomerId: customerId,
                amount: data.amount,
                name: businessName,
                account_number: data.accountNumber,
                bank_code: data.bankCode,
                recipient: data.selectedBeneficiaryName,
                customerEmail: userEmail,
                walletId: walletId,
                description: data.purpose,
                reason: data.purpose,
                currency: data.currency,
                initiatorEmail: userEmail,
                trxPin: pinString,
              }
            : {
                amount: data.amount,
                name: data.selectedBeneficiaryName,
                account_number: data.accountNumber,
                bank_code: data.bankCode,
                customerEmail: userEmail,
                walletId: walletId,
                description: data.purpose,
                currency: data.currency,
                trxPin: pinString,
              };
        // console.log('Transaction payload:', transactionPayload);

        const transactionResponse = await axios.post(
          //conditionally call the transfer and initiallize endpoint depending on userType
          userType === 'CORPORATE'
            ? import.meta.env.VITE_INITIATE_TRANSFER_REQUEST
            : import.meta.env.VITE_API_OTHER_BANK_SEND_MONEY_ENDPOINT,
          transactionPayload,
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAuthToken}`,
            },
          }
        );

        //To determine if user is a sole signatory
        if (transactionResponse.data?.httpStatusCode === '200 OK') {
          setSoleMsg(true);
        }
        const isSuccess =
          (transactionResponse.data?.httpStatusCode === 'OK' &&
            transactionResponse.data?.response?.toLowerCase().includes('transfer successful')) ||
          (transactionResponse.data?.httpStatusCode === '202 Accepted' &&
            transactionResponse.data?.data === 'Approval emails have been sent.') ||
          (transactionResponse.data?.httpStatusCode === '200 OK' &&
            transactionResponse.data?.data === 'Transfer details sent successfully.');

        if (isSuccess) {
          //update wallet balance
          const response = await fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
            headers: {
              accept: '*/*',
              Authorization: `Bearer ${newAuthToken}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          const balance = data.data.balance.amount;
          if (balance !== currentBalance) {
            dispatch(setWalletBalance(data));
          }
          setShowSuccess(true);
          console.log('Transaction Success: Transaction completed successfully.');
        } else {
          setShowDecline(true);
          setErrorMessage(
            transactionResponse.data?.response || 'Transaction process failed. Please try again.'
          );
          console.log('Transaction Declined: Transaction could not be completed.');
        }
      } else {
        console.log('PIN validation failed.');
        setShowDecline(true);
      }
    } catch (error) {
      console.error('Error during transaction process:', error);

      if (error.response) {
        console.log(error);
        // Extracting the error message correctly
        const backendMessage =
          error.response.data?.data || // If the message is nested inside 'data'
          error.response.data?.response || // If message is under 'response'
          error.response.data?.debugMessage || // If message is under 'debugMessage'
          error.response.data?.message || // If message is under 'debugMessage'
          error.response.data || // Direct string message
          'Transaction failed.'; // Default fallback

        setErrorMessage(backendMessage);
      } else {
        setErrorMessage('Transaction process failed. Please try again.');
      }
      setShowDecline(true);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) return <SuccessMessage sole={soleMsg} />;
  if (showDecline)
    return (
      <DeclineMessage
        errorMessage={
          errorMessage ===
          'Cannot invoke "com.nxg.payina.external.customer.entity.Signatory.getEmail()" because the return value of "java.util.List.get(int)" is null'
            ? 'No Signatories Found. Contact Support'
            : errorMessage
        }
      />
    );
  // if (showDecline) return <DeclineMessage />;

  return (
    <div className="transaction-pin flex flex-col justify-center items-center bg-[#D2D2D285] rounded-md px-[2rem] py-[2rem] lg:py-[3rem] lg:px-[5rem] mt-[5rem] gap-8 mx-auto">
      {userLoader ? (
        <div className="flex flex-col items-center">
          <ReactLoading type="spin" color="#00678F" height={50} width={50} />
          {/* <span className="mt-4 text-ligthBlue">Transaction processing...</span> */}
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
