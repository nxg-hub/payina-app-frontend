import React, { useEffect, useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import PhoneInput from 'react-phone-input-2';
import { PhoneNumberSchema } from '../../schemas/schemas';
import 'react-phone-input-2/lib/style.css';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import RequestSent from '../RequestSent.jsx';
import RequestDecline from '../RequestDecline.jsx';

const PhoneNumber = () => {
  const [loginUserData, setLoginUserData] = useState({});
  const [requesterData, setRequesterData] = useState({});
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [payinaTagError, setPayinaTagError] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const fetchLoginUserData = async () => {
      if (!newAuthToken) {
        console.error('No auth token available');
        throw new Error('Authentication token is required');
      }
      console.log('Auth Token:', newAuthToken);
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        const data = await response.json();
        setLoginUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchLoginUserData();
  }, [newAuthToken]);

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
  };

  const handleConfirmPhone = async (phoneNumber) => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    console.log(formattedPhoneNumber);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_VERIFY_PHONENUMBER_ENDPOINT}?phoneNumber=${encodeURIComponent(formattedPhoneNumber)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorDetails = await response.text();
        setConfirmationMessage(errorDetails);
        throw new Error(`Phone number confirmation failed: ${errorDetails}`);
      }

      const data = await response.json();
      setRequesterData(data);
      setConfirmationMessage(`${data.firstName} ${data.lastName}`);
      setPayinaTagError(false);

      return true;
    } catch (error) {
      console.error('Error confirming phone number:', error);
      setPayinaTagError(true);
      setConfirmationMessage('Phone number confirmation failed');
      return false;
    }
  };

  // const handlePhoneInputChange = (phone, setFieldValue) => {
  //   setFieldValue('confirmPhoneNumber', formatPhoneNumber(phone));
  //   if (phone.length > 0) {
  //     handleConfirmPhone(formatPhoneNumber(phone)).then((isConfirmed) => {
  //       if (!isConfirmed) {
  //         setFieldValue('confirmPhoneNumber', '');
  //       }
  //     });
  //   }
  // };
  const handlePhoneInputChange = (phone, setFieldValue) => {
    setFieldValue('confirmPhoneNumber', formatPhoneNumber(phone));

    // Clear any previous timeout to ensure we're debouncing properly
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    // Set a new timeout to call the verification after 1800ms
    const timeout = setTimeout(() => {
      setIsVerifying(true);
      handleConfirmPhone(formatPhoneNumber(phone)).then((isConfirmed) => {
        if (!isConfirmed) {
          setFieldValue('confirmPhoneNumber', ''); // Clear input if not confirmed
        }
        setIsVerifying(false);
      });
    }, 1800);

    setDebounceTimeout(timeout);
  };

  const handleSubmit = async (values) => {
    console.log('Form Values:', values);
    const formattedPhoneNumber = formatPhoneNumber(values.phoneNumber);

    const isConfirmed = await handleConfirmPhone(formattedPhoneNumber);
    console.log('phoneNumber confirmed:', isConfirmed);

    if (!isConfirmed) {
      console.error('Phone number confirmation failed');
      return;
    }

    const requestData = {
      approvalEmail: requesterData.email,
      requesterEmail: loginUserData.email,
      requesterName: loginUserData.firstName,
      senderName: requesterData.firstName,
      requesterWalletId: loginUserData.walletId,
      senderWalletId: requesterData.walletId,
      phoneNumber: formattedPhoneNumber,
      amount: Number(values.amount),
      purpose: values.purpose,
      requestType: 'PHONE_NUMBER',
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_REQUEST_MONEY_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAuthToken}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('Money request successfully sent');
        setShowSuccess(true);
      } else {
        console.error('Error requesting money:', await response.text());
        setShowDecline(true);
      }
    } catch (error) {
      console.error('Error sending money request:', error);
      setShowDecline(true);
    }
  };
  if (showSuccess) return <RequestSent />;
  if (showDecline) return <RequestDecline />;
  return (
    <div className="">
      <Formik
        initialValues={{
          phoneNumber: '',
          confirmPhoneNumber: '',
          amount: '',
          purpose: '',
        }}
        validationSchema={PhoneNumberSchema}
        onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="phoneNumber" className="text-left font-md text-md">
                Phone Number
              </label>
              <PhoneInput
                country={'ng'}
                value={values.phoneNumber}
                onChange={(phone) => {
                  setFieldValue('phoneNumber', formatPhoneNumber(phone));
                  handlePhoneInputChange(phone, setFieldValue);
                }}
                inputClass={
                  'lg:w-[700px] w-[300px] border outline-none rounded-[5px] py-5 h-20 !w-full lg:px-[1.95rem] px-[1.2rem] py-2 font-light opacity-70 text-xs md:text-sm'
                }
              />
              <ErrorMessage
                name="phoneNumber"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col w-full gap-2 py-2">
              <label htmlFor="confirmPhoneNumber" className="text-left font-md text-md">
                Confirm Phone Number
              </label>
              <Field
                name="confirmPhoneNumber"
                type="text"
                placeholder=""
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                value={
                  isVerifying
                    ? 'Verifying...'
                    : confirmationMessage || 'Enter PayinaTag to confirm here'
                }
              />
              {payinaTagError && (
                <span className="text-red-500 text-xs mt-2">
                  Phone number not found or confirmation failed
                </span>
              )}
              {/* <PhoneInput
                country={'ng'}
                value={values.confirmPhoneNumber}
                onChange={(phone) => {
                  setFieldValue('confirmPhoneNumber', formatPhoneNumber(phone));
                  if (phone.length > 0) {
                    handleConfirmPhone(formatPhoneNumber(phone)).then((isConfirmed) => {
                      if (!isConfirmed) {
                        console.error('Phone number confirmation failed');
                      }
                    });
                  }
                }}
                inputClass={
                  'xl:w-[700px] w-[400px] !w-full xl:px-[1.95rem] px-[1.2rem] border outline-none rounded-[5px] py-5 h-20 font-light opacity-70 text-xs md:text-sm'
                }
              /> */}
              <ErrorMessage
                name="confirmPhoneNumber"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col w-full gap-2 py-2">
              <label htmlFor="amount" className="text-left font-md text-md">
                How Much are you requesting?
              </label>
              <Field
                name="amount"
                type="text"
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
                placeholder=""
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
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PhoneNumber;
