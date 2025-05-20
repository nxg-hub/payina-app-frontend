import React, { useEffect, useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { OthersPhoneNumberSchema } from '../../schemas/schemas.js';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import RequestSent from '../RequestSent.jsx';
import RequestDecline from '../RequestDecline.jsx';

const PhoneNumber = () => {
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [loginUserData, setLoginUserData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDecline, setShowDecline] = useState(false);

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

  const handleSubmit = async (values) => {
    const requestData = {
      approverPhoneNumber: values.phoneNumber,
      approverEmail: values.emailAddress,
      requesterEmail: loginUserData.email,
      requesterName: loginUserData.firstName,
      approverName: values.receiverName,
      amount: Number(values.amount),
      purpose: values.purpose,
    };

    console.log('Request Data:', JSON.stringify(requestData, null, 2));

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_EXTERNAL_REQUEST_MONEY_ENDPOINT}`, {
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
        const contentType = response.headers.get('content-type');
        const responseText = await response.text();
        console.error('Error requesting money:', responseText);

        if (contentType && contentType.includes('application/json')) {
          try {
            const errorDetails = JSON.parse(responseText);
            console.error('Parsed error details:', errorDetails);
          } catch (parseError) {
            console.error('Error parsing the JSON error response:', parseError);
          }
        } else {
          console.error('Received non-JSON error response:', responseText);
        }

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
          emailAddress: '',
          receiverName: '',
          amount: '',
          purpose: '',
        }}
        validationSchema={OthersPhoneNumberSchema}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="phoneNumber" className="text-left font-md text-md">
                Phone Number
              </label>
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Enter Phone Number"
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="phoneNumber"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="emailAddress" className="text-left font-md text-md">
                Email Address
              </label>
              <Field
                name="emailAddress"
                type="text"
                placeholder="Enter Email Address"
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="emailAddress"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col w-full gap-2 py-2">
              <label htmlFor="receiverName" className="text-left font-md text-md">
                Enter Name
              </label>
              <Field
                name="receiverName"
                type="text"
                placeholder=""
                className="xl:w-[700px] w-[400px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="receiverName"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
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

export default PhoneNumber;
