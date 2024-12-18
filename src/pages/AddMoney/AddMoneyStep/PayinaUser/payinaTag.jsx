import React, { useState, useRef, useEffect } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { PayinaSchema } from '../../schemas/schemas.js';
import axios from 'axios';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import RequestSent from '../RequestSent.jsx';
import RequestDecline from '../RequestDecline.jsx';

const PayinaTag = () => {
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [loginUserData, setLoginUserData] = useState(null);
  const debounceTimeoutRef = useRef(null);
  const [payinaTagError, setPayinaTagError] = useState(false);

  useEffect(() => {
    const fetchLoginUserData = async () => {
      if (!newAuthToken) {
        console.error('No auth token available');
        return;
      }
      console.log('Auth Token:', newAuthToken);
      try {
        const endpoint = import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT;
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${newAuthToken}` },
        });
        if (response.data) {
          setLoginUserData(response.data);
        } else {
          console.warn('No user data found in response.');
          setLoginUserData({});
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoginUserData(null);
      }
    };

    fetchLoginUserData();
  }, [newAuthToken]);

  const verifyPayinaTag = async (payinaTag) => {
    try {
      if (isNaN(payinaTag)) {
        const endpoint = import.meta.env.VITE_GET_PAYINA_TAG_ENDPOINT.replace(
          '{username}',
          payinaTag
        );
        const response = await axios.get(endpoint);
        if (response.data && response.data.payinaUserName) {
          return {
            isValid: true,
            message: `${response.data.firstName} ${response.data.lastName}`,
            walletId: response.data.walletId,
            email: response.data.email,
          };
        }
        return { isValid: false, message: 'PayinaTag not found.' };
      } else {
        const endpoint = import.meta.env.VITE_GET_ACCOUNT_NUMBER_ENDPOINT;
        const response = await axios.get(`${endpoint}?accountNumber=${payinaTag}`);
        if (response.data && response.data.customerId != null) {
          return {
            isValid: true,
            message: `${response.data.firstName} ${response.data.lastName}`,
            walletId: response.data.walletId,
            email: response.data.email,
          };
        }
        return { isValid: false, message: 'Account number not found.' };
      }
    } catch (error) {
      console.error('Error verifying PayinaTag:', error);
      return { isValid: false, message: 'Error verifying PayinaTag.' };
    }
  };

  const handleInputChange = (payinaTag, setFieldValue) => {
    if (!payinaTag) {
      setConfirmationMessage('');
      setFieldValue('confirmName', '');
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      setIsVerifying(true);
      const validation = await verifyPayinaTag(payinaTag);
      setIsVerifying(false);
      setConfirmationMessage(validation.message);

      if (validation.isValid) {
        setFieldValue('confirmName', validation.message);
        setFieldValue('destinationId', validation.walletId);
        setFieldValue('destinationEmail', validation.email);
        setPayinaTagError(false);
      } else {
        setFieldValue('confirmName', '');
        setFieldValue('destinationId', '');
        setFieldValue('destinationEmail', '');
        setPayinaTagError(true);
      }
    }, 1800);
  };

  const requestMoney = async (payload) => {
    try {
      const endpoint = import.meta.env.VITE_REQUEST_MONEY_ENDPOINT;
      const response = await axios.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${newAuthToken}` },
      });
      if (response.status === 200) {
        setShowSuccess(true);
      } else {
        setShowDecline(true);
      }
    } catch (error) {
      console.error('Error requesting money:', error);
      setShowDecline(true);
    }
  };

  const handleSubmit = async (values, { setFieldError }) => {
    setConfirmationMessage('');

    if (!values.confirmName || confirmationMessage.includes('not found')) {
      setFieldError('confirmName', 'Invalid PayinaTag or Account Number. Please try again.');
      return;
    }

    if (!loginUserData || !loginUserData.phoneNumber || !loginUserData.email) {
      console.error('Incomplete user data for transaction.');
      setFieldError('confirmName', 'Error fetching user data. Please try again later.');
      return;
    }

    const isAccountNumber = !isNaN(values.payinaTag);

    const payload = {
      amount: Number(values.amount),
      purpose: values.purpose,
      requestType: 'PAYINA_USERNAME',
      phoneNumber: loginUserData.phoneNumber,
      approverEmail: values.destinationEmail,
      requesterEmail: loginUserData.email,
      requesterName: `${loginUserData.firstName} ${loginUserData.lastName}`,
      senderName: values.confirmName,
      payinaUsername: isAccountNumber ? '' : values.payinaTag,
      payinaUserAccountNumber: isAccountNumber ? values.payinaTag : '',
      requesterWalletId: loginUserData.walletId,
      senderWalletId: values.destinationId,
    };

    console.log('Payload being sent to backend:', payload);
    await requestMoney(payload);
  };

  if (showSuccess) return <RequestSent />;
  if (showDecline) return <RequestDecline />;

  return (
    <div>
      <Formik
        initialValues={{
          payinaTag: '',
          confirmName: '',
          amount: '',
          purpose: '',
          destinationId: '',
          destinationEmail: '',
        }}
        validationSchema={PayinaSchema}
        onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="payinaTag" className="text-left font-md text-md">
                Payina Tag
              </label>
              <Field
                name="payinaTag"
                type="text"
                placeholder="Enter Recipient Payina Tag or Account Number"
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                onChange={(e) => {
                  const payinaTag = e.target.value;
                  setFieldValue('payinaTag', payinaTag);
                  handleInputChange(payinaTag, setFieldValue);
                }}
              />
              <ErrorMessage
                name="payinaTag"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>

            <div className="flex flex-col w-full gap-2 py-2">
              <label htmlFor="confirmName" className="text-left font-md text-md">
                Confirm Payina Tag
              </label>
              <Field
                name="confirmName"
                type="text"
                placeholder=""
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                readOnly
                value={
                  isVerifying
                    ? 'Verifying...'
                    : confirmationMessage || 'Enter PayinaTag to confirm here'
                }
              />
              {payinaTagError && (
                <span className="text-red-500 text-xs mt-2">PayinaTag not found</span>
              )}
            </div>

            <div className="flex flex-col w-full gap-2 py-2">
              <label htmlFor="amount" className="text-left font-md text-md">
                Amount
              </label>
              <Field
                name="amount"
                type="number"
                placeholder="Enter Amount"
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="amount"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>

            <div className="flex flex-col w-full gap-2 py-2">
              <label htmlFor="purpose" className="text-left font-md text-md">
                Purpose
              </label>
              <Field
                name="purpose"
                type="text"
                placeholder="Enter Purpose"
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="purpose"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[200px] lg:mr-0 mr-5 lg:w-[300px] text-primary">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PayinaTag;
