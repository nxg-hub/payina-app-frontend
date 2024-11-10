import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { RecieverSchema } from './schemas/schemas.js';

const RecipientDetails = ({ nextStep }) => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isBankSelected, setIsBankSelected] = useState(false);
  const [receiverConfirmationMessage, setReceiverConfirmationMessage] = useState('');
  const [isReceiverConfirmed, setIsReceiverConfirmed] = useState(false);
  const [accountBankCode, setAccountBankCode] = useState('');
  const [responseDetails, setResponseDetails] = useState({ accountNumber: '', accountName: '' });

  useEffect(() => {
    if (selectedCountry) {
      const endpoint = import.meta.env.VITE_GET_BANKS_NAME_ENDPOINT.replace(
        '{country}',
        selectedCountry
      );

      const fetchBanks = async () => {
        try {
          const response = await axios.get(endpoint);
          const bankList = response.data.data || [];
          setBanks(bankList);
          setFilteredBanks(bankList);
        } catch (error) {
          console.error('Error fetching banks:', error);
          setBanks([]);
          setFilteredBanks([]);
        }
      };

      fetchBanks();
    }
  }, [selectedCountry]);

  const handleBankSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredBanks(banks.filter((bank) => bank.name.toLowerCase().includes(query)));
  };

  const confirmReceiverDetails = async (values, accountNumber, receiverName) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_CONFIRM_OTHER_BANK_RECEIVER_DETAILS,
        {
          accountNumber,
          accountBankCode,
        }
      );

      const { account_name, account_number } = response.data;

      if (account_name) {
        setReceiverConfirmationMessage('Receiver name is confirmed.');
        setIsReceiverConfirmed(true);
        setResponseDetails({ accountNumber: account_number, accountName: account_name });
        setTimeout(() => {
          nextStep({
            receiverName,
            account_name,
            accountNumber,
            accountBankCode,
            bankName: values.bankName,
          });
        }, 1000);
      } else {
        setReceiverConfirmationMessage(
          'Receiver name could not be confirmed. Please re-check the account number.'
        );
        setIsReceiverConfirmed(false);
        setResponseDetails({ accountNumber: '', accountName: '' });
      }
    } catch (error) {
      console.error('Error confirming receiver details:', error);
      setReceiverConfirmationMessage('Error confirming receiver details.');
      setIsReceiverConfirmed(false);
      setResponseDetails({ accountNumber: '', accountName: '' });
    }
  };

  return (
    <div className="flex flex-col items-left justify-left gap-4 form mt-5">
      <span className="text-md md:text-xl font-medium mt-5">Recipient Details</span>
      <Formik
        initialValues={{
          accountNumber: '',
          country: '',
          bankName: '',
          recieverName: '',
        }}
        validationSchema={RecieverSchema}
        onSubmit={async (values) => {
          if (isReceiverConfirmed) {
            nextStep(
              values.recieverName,
              values.account_name,
              values.bankName,
              values.accountNumber,
              values.accountBankCode
            );
          }
        }}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex flex-col items-left gap-2">
              <label htmlFor="accountNumber" className="text-left font-md text-md">
                Enter Account Details
              </label>
              <Field
                name="accountNumber"
                type="text"
                placeholder="Enter Recipient Account Number"
                className="w-[700px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                onChange={(e) => {
                  setFieldValue('accountNumber', e.target.value);
                  setReceiverConfirmationMessage('');
                }}
              />
              <ErrorMessage
                name="accountNumber"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col w-full py-4 space-y-4">
              <label htmlFor="country" className="text-left font-md text-md">
                Select Country
              </label>
              <Field
                as="select"
                name="country"
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setFieldValue('country', e.target.value);
                }}
                className="w-[700px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm">
                <option value="" label="Select a country" />
                <option value="NG" label="Nigeria" />
                <option value="GH" label="Ghana" />
                <option value="KE" label="Kenya" />
                <option value="UG" label="Uganda" />
                <option value="SA" label="South Africa" />
                <option value="TZ" label="Tanzania" />
              </Field>
            </div>
            <div className="flex flex-col w-full py-4 space-y-4">
              <label htmlFor="bankName" className="text-left font-md text-md">
                Select Bank
              </label>
              <div className="relative w-[700px]">
                <input
                  type="text"
                  name="bankName"
                  value={values.bankName}
                  placeholder="Type to search bank"
                  onChange={(e) => {
                    setFieldValue('bankName', e.target.value);
                    handleBankSearch(e);
                    setIsBankSelected(false);
                  }}
                  className="w-full border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                />
                {!isBankSelected && filteredBanks.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border rounded-md shadow-md max-h-40 overflow-y-auto">
                    {filteredBanks.map((bank) => (
                      <div
                        key={bank.code}
                        onClick={() => {
                          setFieldValue('bankName', bank.name);
                          setAccountBankCode(bank.code);
                          setIsBankSelected(true);
                          setFilteredBanks([]);
                        }}
                        className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-xs md:text-sm">
                        {bank.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ErrorMessage
                name="bankName"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex flex-col w-full py-4 space-y-4">
              <label htmlFor="recieverName" className="text-left font-md text-md">
                Confirm Receiver's Name
              </label>
              <Field
                name="recieverName"
                type="text"
                onChange={(e) => {
                  setFieldValue('recieverName', e.target.value);
                  setReceiverConfirmationMessage('');
                }}
                onBlur={() => {
                  confirmReceiverDetails(values, values.accountNumber, values.recieverName);
                }}
                className="w-[700px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
              />
              <ErrorMessage
                name="recieverName"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
              {receiverConfirmationMessage && (
                <span
                  className={`text-xs md:text-base ${isReceiverConfirmed ? 'text-green-500' : 'text-red-500'}`}>
                  {receiverConfirmationMessage}
                </span>
              )}
              {isReceiverConfirmed && (
                <div className="text-xs md:text-base text-green-500">
                  <p>Account Number: {responseDetails.accountNumber}</p>
                  <p>Account Name: {responseDetails.accountName}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isReceiverConfirmed}
                className={`rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[300px] text-primary ${!isReceiverConfirmed ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RecipientDetails;
