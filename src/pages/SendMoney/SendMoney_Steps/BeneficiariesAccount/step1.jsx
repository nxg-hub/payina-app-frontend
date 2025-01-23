import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { RecieverSchema } from './schemas/schemas.js';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';

const RecipientDetails = ({ nextStep }) => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        // console.log('User data fetched successfully:', userResponse.data);
        const fetchedCustomerId = userResponse.data.customerId;
        setCustomerId(fetchedCustomerId);
        setLoading(false);
        // console.log('Set customerId:', fetchedCustomerId);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [newAuthToken]);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      if (!customerId) return;

      const endpoint = import.meta.env.VITE_GET_SAVED_BENEFICIARIES_ENDPOINT.replace(
        '{customerId}',
        customerId
      );
      // console.log('Fetching beneficiaries from endpoint:', endpoint);
      setLoading(true);
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        // console.log('Beneficiaries fetched successfully:', response.data);
        setBeneficiaries(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch beneficiaries', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, [customerId, newAuthToken]);

  return (
    <div className="flex flex-col items-left justify-left gap-4 form lg:ml-0 ml-3">
      <span className="text-md md:text-xl font-medium mt-5">Recipient Details</span>
      <Formik
        initialValues={{
          beneficiaryName: '',
        }}
        validationSchema={RecieverSchema}
        onSubmit={(values) => {
          const selectedBeneficiaryName = values.beneficiaryName;
          const selectedBeneficiary = beneficiaries.find(
            (beneficiary) => beneficiary.name === selectedBeneficiaryName
          );

          if (selectedBeneficiary) {
            const { id, accountNumber, bankCode, bankName } = selectedBeneficiary;
            // console.log('Selected Beneficiary:', selectedBeneficiary);
            nextStep({ selectedBeneficiaryName, accountNumber, bankCode, bankName, id });
          }
        }}>
        {() => (
          <Form>
            <div className="flex flex-col items-left gap-2">
              <label htmlFor="beneficiaryName" className="text-left font-md text-md">
                Choose Beneficiaries
              </label>
              <Field
                as="select"
                name="beneficiaryName"
                className="lg:w-[700px] w-[300px]  border outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm">
                <option
                  value=""
                  label={loading ? 'Loading Beneficiary...' : 'Select a beneficiary'}
                />
                {beneficiaries
                  .filter((beneficiary) => beneficiary && beneficiary.name)
                  .map((beneficiary) => (
                    <option key={beneficiary.id} value={beneficiary.name}>
                      {beneficiary.name}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name="beneficiaryName"
                component="span"
                className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
              />
            </div>
            <div className="flex lg:justify-end mt-5">
              <button
                type="submit"
                className="rounded-[5px] text-xs md:text-base py-2 border border-lightBlue bg-lightBlue w-[250px] xl:mr-0 mr-5 xl:w-[300px] text-primary">
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
