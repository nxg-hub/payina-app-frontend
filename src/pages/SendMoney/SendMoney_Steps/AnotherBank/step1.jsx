import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { RecieverSchema } from './schemas/schemas.js';

const RecipientDetails = ({ nextStep }) => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isBankSelected, setIsBankSelected] = useState(false);
  const [accountBankCode, setAccountBankCode] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

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

  useEffect(() => {
    const verifyAccountNumber = async () => {
      if (!accountNumber || !accountBankCode) return;

      console.log('Verifying account details:', { accountNumber, accountBankCode });

      try {
        setIsVerifying(true);
        const response = await axios.post(
          import.meta.env.VITE_API_CONFIRM_OTHER_BANK_RECEIVER_DETAILS,
          {
            accountNumber,
            accountBankCode,
          }
        );
        console.log('API Response:', response.data);

        if (response.data.account_name && response.data.account_number) {
          setConfirmationMessage(`Receiver Details confirmed: ${response.data.account_name}`);
          setAccountName(response.data.account_name);
        } else {
          setConfirmationMessage(`Account details for "${accountNumber}" not found.`);
          setAccountName('');
        }
      } catch (error) {
        console.error('Error verifying account details:', error);
        if (error.response) {
          setConfirmationMessage(
            `Error verifying account details: ${error.response.data.message || 'Receiver name not found.'}`
          );
        } else {
          setConfirmationMessage('Error verifying account details. Please try again.');
        }
        setAccountName('');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAccountNumber();
  }, [accountNumber, accountBankCode]);

  const handleSubmit = async (values, { setFieldError }) => {
    if (!confirmationMessage.toLowerCase().includes('confirmed')) {
      setFieldError('accountNumber', 'Account verification failed. Please try again.');
      return;
    }

    console.log('Navigating to next step with data:', {
      accountName: accountName,
      bankName: values.bankName,
      accountNumber,
      accountBankCode,
    });
    nextStep({
      accountName: accountName,
      bankName: values.bankName,
      accountNumber,
      accountBankCode,
    });
  };

  return (
    <div className="flex flex-col items-left justify-center gap-4 form mt-5 lg:ml-0 ml-3">
      <span className="text-md md:text-xl font-medium mt-5">Recipient Details</span>
      <Formik
        initialValues={{
          accountNumber: '',
          country: '',
          bankName: '',
        }}
        validationSchema={RecieverSchema}
        onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className="flex flex-col items-left gap-2">
              <label htmlFor="accountNumber" className="text-left font-md text-md">
                Enter Account Details
              </label>
              <input
                type="text"
                name="accountNumber"
                placeholder="Enter Recipient Account Number"
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                onChange={(e) => {
                  const value = e.target.value;
                  setAccountNumber(value);
                  setFieldValue('accountNumber', value);
                  setConfirmationMessage('');
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
                className="lg:w-[700px] w-[300px]  border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm">
                <option value="" label="Select a country" />
                <option value="NG" label="Nigeria" />
                {/* <option value="GH" label="Ghana" />
                <option value="KE" label="Kenya" />
                <option value="UG" label="Uganda" />
                <option value="SA" label="South Africa" />
                <option value="TZ" label="Tanzania" /> */}
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
                    setFilteredBanks(
                      banks.filter((bank) =>
                        bank.name.toLowerCase().includes(e.target.value.toLowerCase())
                      )
                    );
                  }}
                  className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
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
              <label htmlFor="confirmReceiverName" className="text-left font-md text-md">
                Confirm Receiver's Name
              </label>
              <div
                className="lg:w-[700px] w-[300px] border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                readOnly>
                {isVerifying
                  ? 'Verifying...'
                  : confirmationMessage.includes('confirmed')
                    ? confirmationMessage.split(': ')[1]
                    : 'Enter account number to verify'}
              </div>
              <span
                className={`text-xs md:text-sm mt-1 ${
                  confirmationMessage.includes('not found') || confirmationMessage.includes('Error')
                    ? 'text-[#db3a3a]'
                    : 'text-[#00678F]'
                }`}>
                {confirmationMessage.includes('not found') || confirmationMessage.includes('Error')
                  ? 'Receiver name not found or verification failed'
                  : confirmationMessage.includes('confirmed')
                    ? 'Receiver name confirmed'
                    : ''}
              </span>
            </div>
            <div className="flex lg:justify-end">
              <button
                type="submit"
                disabled={isVerifying || !confirmationMessage.toLowerCase().includes('confirmed')}
                className="rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[250px] xl:mr-0 mr-5 lg:w-[300px] text-primary">
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
