import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessMessage from '../step5.jsx';
import DeclineMessage from '../step6.jsx';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const EnterPin = ({ data }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [userEmail, setUserEmail] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverEmailAddress, setReceiverEmailAddress] = useState('');
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
        setSenderName(userResponse.data.accountName);
        setSourceId(userResponse.data.walletId);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
      }
    };

    const fetchDestinationId = async (payinaTag) => {
      try {
        let endpoint;
        if (isNaN(payinaTag)) {
          endpoint = import.meta.env.VITE_GET_PAYINA_TAG_ENDPOINT.replace('{username}', payinaTag);
        } else {
          endpoint = `${import.meta.env.VITE_GET_ACCOUNT_NUMBER_ENDPOINT}?accountNumber=${payinaTag}`;
        }

        const payinaResponse = await axios.get(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        console.log('Destination data fetched successfully:', payinaResponse.data);
        setDestinationId(payinaResponse.data.walletId);
        setReceiverName(payinaResponse.data.accountName);
        setReceiverEmailAddress(payinaResponse.data.email);
      } catch (error) {
        console.error('Error fetching destination ID:', error.response?.data || error.message);
      }
    };

    fetchUserData();
    if (data.payinaTag) {
      fetchDestinationId(data.payinaTag);
    }
  }, [newAuthToken, data.payinaTag]);

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
    if (
      !userEmail ||
      !sourceId ||
      !destinationId ||
      !senderName ||
      !receiverName ||
      !receiverEmailAddress
    ) {
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
        console.log('PIN validated successfully. Starting in-house transfer...');

        const transactionPayload = {
          sourceId: sourceId,
          destinationId: destinationId,
          amount: data.amount,
          senderName: senderName,
          receiverName: receiverName,
          senderEmailAddress: userEmail,
          receiverEmailAddress: receiverEmailAddress,
          description: data.purpose,
        };

        console.log('Transaction payload:', transactionPayload);

        const transactionResponse = await axios.post(
          import.meta.env.VITE_IN_HOUSE_TRANSFER_ENDPOINT,
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
        if (transactionResponse.status === 200) {
          const responseData = transactionResponse.data;
          if (responseData.response === 'Transfer was successful') {
            console.log('Transaction Success: Transaction completed successfully.');
            setShowSuccess(true);
          } else {
            console.log('Transaction Declined: Transaction could not be completed.', responseData);
            setErrorMessage(
              responseData.debugMessage || responseData.response || 'Transaction failed.'
            );
            setShowDecline(true);
          }
        } else {
          console.log('Unexpected response structure:', transactionResponse.data);
          setErrorMessage('Unexpected error occurred. Please try again.');
          setShowDecline(true);
        }
      } else {
        console.log('PIN validation failed.');
        setErrorMessage('PIN validation failed.');
        setShowDecline(true);
      }
    } catch (error) {
      console.error('Error during transaction process:', error);

      if (error.response) {
        console.error('Error Status:', error.response.status);
        console.error('Error Data:', error.response.data);
        const backendMessage =
          error.response.data.response || error.response.data.debugMessage || 'Transaction failed.';
        setErrorMessage(backendMessage);
      } else {
        console.error('Error Message:', error.message);
      }

      setErrorMessage('Transaction process failed. Please try again.');
      setShowDecline(true);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) return <SuccessMessage />;
  if (showDecline) return <DeclineMessage errorMessage={errorMessage} />;
  // if (showDecline) return <DeclineMessage />;

  return (
    <div className="transaction-pin flex flex-col justify-center items-center bg-[#D2D2D285] rounded-md p-[2rem] lg:py-[3rem] lg:px-[5rem] mt-[5rem] gap-8 mx-auto">
      {loading ? (
        <div className="flex flex-col items-center">
          <ReactLoading type="spin" color="#00678F" height={50} width={50} />
          <span className="mt-4 text-ligthBlue">Transaction processing...</span>
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
    purpose: PropTypes.string.isRequired,
    payinaTag: PropTypes.string.isRequired,
  }).isRequired,
};

export default EnterPin;
