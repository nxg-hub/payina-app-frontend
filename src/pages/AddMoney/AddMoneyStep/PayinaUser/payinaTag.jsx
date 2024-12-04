import React, { useState } from 'react';
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

  const verifyPayinaUsername = async (payinaUsername) => {
    try {
      const endpoint = import.meta.env.VITE_GET_PAYINA_TAG_ENDPOINT.replace(
        '{username}',
        payinaUsername
      );
      console.log(`Requesting endpoint for username: ${endpoint}`);

      const response = await axios.get(endpoint);
      console.log('API username response data:', response.data);
      if (response.data && response.data.payinaUserName) {
        const successMessage = `Username "${response.data.payinaUserName}" verified successfully.`;
        setConfirmationMessage(successMessage);
        return response.data.payinaUserName;
      }
      setConfirmationMessage('Verification failed, user not found.');
      return null;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(`Payina username "${payinaUsername}" not found.`);
        setConfirmationMessage(`Payina username "${payinaUsername}" not found.`);
      } else {
        console.error('Error verifying payina username:', error);
        setConfirmationMessage('Error verifying Payina username.');
      }
      return null;
    }
  };

  const verifyAccountNumber = async (accountNumber) => {
    try {
      const endpoint = import.meta.env.VITE_GET_ACCOUNT_NUMBER_ENDPOINT;
      const response = await axios.get(`${endpoint}?accountNumber=${accountNumber}`);
      console.log('API account number response:', response.data);

      const isValid = response.data && response.data.customerId != null;
      if (isValid) {
        setConfirmationMessage(`Account number "${accountNumber}" verified successfully.`);
      } else {
        setConfirmationMessage('Invalid account number.');
      }
      return isValid;
    } catch (error) {
      console.error('Error verifying account number:', error);
      setConfirmationMessage('Error verifying account number.');
      return false;
    }
  };

  const getRequesterData = async (payinaTag) => {
    const endpoint = import.meta.env.VITE_GET_PAYINA_TAG_ENDPOINT.replace('{username}', payinaTag);
    const response = await axios.get(endpoint);
    return response.data;
  };

  const getAccountData = async (accountNumber) => {
    const endpoint = import.meta.env.VITE_GET_ACCOUNT_NUMBER_ENDPOINT;
    const response = await axios.get(`${endpoint}?accountNumber=${accountNumber}`);
    return response.data;
  };

  const getLoginUserData = async () => {
    if (!newAuthToken) {
      console.error('No auth token available');
      throw new Error('Authentication token is required');
    }
    console.log('Auth Token:', newAuthToken);
    try {
      const response = await axios.get(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAuthToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting login user data:', error);
      throw error;
    }
  };

  const requestMoney = async (data) => {
    const endpoint = import.meta.env.VITE_REQUEST_MONEY_ENDPOINT;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${newAuthToken}`,
    };

    try {
      console.log('Data being sent to request money:', data);
      const response = await axios.post(endpoint, data, { headers });
      console.log('Request money response:', response.data);
      console.log('Money request successfully sent');
      setShowSuccess(true);
    } catch (error) {
      console.error(
        'Error requesting money:',
        error.response ? error.response.data : error.message
      );
      setShowDecline(true);
      throw new Error('Failed to request money');
    }
  };

  const handleSubmit = async (values, { setFieldError }) => {
    setConfirmationMessage('');
    if (values.payinaTag !== values.confirmName) {
      setFieldError('confirmName', 'Payina Tag and Confirm Payina Tag must match.');
      setConfirmationMessage('Payina Tag and Confirm Payina Tag must match.');
      return;
    }

    let isValid;
    const requestData = {
      amount: Number(values.amount),
      purpose: values.purpose,
      requestType: 'PAYINA_USERNAME',
    };
    console.log('Payload being sent to backend:', requestData);
    if (isNaN(values.payinaTag)) {
      const payinaUsername = await verifyPayinaUsername(values.payinaTag);
      isValid = payinaUsername !== null;

      if (isValid) {
        const requesterData = await getRequesterData(values.payinaTag);
        const loginUserData = await getLoginUserData();

        Object.assign(requestData, {
          phoneNumber: requesterData.phoneNumber,
          approverEmail: requesterData.email,
          requesterEmail: loginUserData.email,
          requesterName: loginUserData.firstName,
          senderName: requesterData.firstName,
          payinaUsername: values.payinaTag,
          requesterWalletId: loginUserData.walletId,
          senderWalletId: requesterData.walletId,
        });

        await requestMoney(requestData);
      } else {
        setFieldError('confirmName', 'Invalid Payina username. Please re-enter the correct one.');
        setConfirmationMessage('Invalid Payina username. Please try again.');
      }
    } else {
      isValid = await verifyAccountNumber(values.payinaTag);
      console.log(`Account number validity for "${values.payinaTag}":`, isValid);

      if (isValid) {
        const accountData = await getAccountData(values.payinaTag);
        const loginUserData = await getLoginUserData();

        Object.assign(requestData, {
          phoneNumber: accountData.phoneNumber,
          approverEmail: accountData.email,
          requesterEmail: loginUserData.email,
          requesterName: loginUserData.firstName,
          senderName: accountData.firstName,
          payinaUserAccountNumber: values.payinaTag,
          requesterWalletId: loginUserData.walletId,
          senderWalletId: accountData.walletId,
        });

        await requestMoney(requestData);
      } else {
        setFieldError('confirmName', 'Invalid account number. Please re-enter the correct one.');
        setConfirmationMessage('Invalid Account Number Please try again.');
      }
    }
  };
  if (showSuccess) return <RequestSent />;
  if (showDecline) return <RequestDecline />;
  return (
    <div className="">
      <Formik
        initialValues={{
          payinaTag: '',
          confirmName: '',
          amount: '',
          purpose: '',
        }}
        validationSchema={PayinaSchema}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="payinaTag" className="text-left font-md text-md">
                Payina Tag
              </label>
              <Field
                name="payinaTag"
                type="text"
                placeholder="Enter Recipient Payina Tag"
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
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
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="confirmName"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
              <span className="text-green-600 text-xs">{confirmationMessage}</span>
            </div>
            <div className="flex flex-col  w-full gap-2 py-2">
              <label htmlFor="amount" className="text-left font-md text-md">
                How Much are you requesting?
              </label>
              <Field
                name="amount"
                type="text"
                placeholder="Enter Amount"
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="amount"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col  w-full gap-2 py-2">
              <label htmlFor="purpose" className="text-left font-md text-md">
                Purpose
              </label>
              <Field
                name="purpose"
                type="text"
                placeholder=""
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
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
                className="rounded-[5px] text-xs md:text-base  py-2 border border-lightBlue bg-lightBlue w-[250px] xl:mr-0 mr-5 xl:w-[300px] text-primary">
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PayinaTag;
