import React from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  businessDescription: Yup.string().required('Business description is required'),
  numberOfStaff: Yup.string().required('Number of staff is required'),
  annualIncomeRange: Yup.string().required('Annual income range is required'),
});

// Sample data for the number of staff and annual income range
const staffOptions = ['0-9', '10-20', '21-50', '51-100', '101-300'];
const incomeRangeOptions = [
  'Less than 100,000',
  '100,000 - 500,000',
  '500,001 - 1,000,000',
  '1,000,001 - 10,000,000',
  '10,000,001 - 50,000,000',
];

export const StepThirteen = ({ next, email, initialValues }) => {
  const userEmail = localStorage.getItem('userEmail');
  const handleSubmit = async (values) => {
    const customerId = await authenticateEmail(userEmail); // Ensure email is passed correctly
    console.log('Authenticated User ID:', customerId);

    // Combine previous data with the current step's data
    const requestData = {
      houseNumber: initialValues.houseNumber,
      street: initialValues.street,
      state: initialValues.state,
      lga: initialValues.lga,
      businessHouseNumber: initialValues.businessHouseNumber,
      businessStreetName: initialValues.businessStreetName,
      businessState: initialValues.businessState,
      businessLGA: initialValues.businessLGA,
      businessName: initialValues.businessName,
      tin_No: initialValues.tin_No,
      businessRegNumber: initialValues.businessRegNumber,
      businessCategory: initialValues.businessCategory,
      businessType: initialValues.businessType,
      businessDescription: values.businessDescription,
      staffNumber: values.numberOfStaff,
      annualIncome: values.annualIncomeRange,
      customerId: values.customerId,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_CREATE_PROFILE_ENDPOINT}?customerId=${encodeURIComponent(customerId)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      );
      // console.log ('Uploaded Data:', requestData)

      if (response.ok) {
        const result = await response.json();
        console.log('Profile created successfully:', result);
        next(requestData);
      } else {
        console.error('Failed to create profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const authenticateEmail = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },

          //  mode: 'no-cors'
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log('Full Response:', data);

        // Extract the customerId from the response
        const customerId = data.customerId;
        console.log('Customer ID:', customerId);
        return customerId;
      } else {
        const errorText = await response.text();
        console.error('Failed to authenticate email:', response.status, errorText);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <>
      <div className="bg-primary !mt-24 xl:mt-0  mx-auto">
        <Formik
          initialValues={{
            businessDescription: '',
            numberOfStaff: '',
            annualIncomeRange: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form className="">
              <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[4rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl pr-15">
                  Enter Business Details
                </div>
                <div className="my-2 xl:w-full flex flex-col space-y-2 ">
                  <label
                    htmlFor="businessDescription"
                    className="text-sm font-normal text-lightBlue">
                    Business Description
                  </label>
                  <Field
                    as="textarea"
                    id="businessDescription"
                    name="businessDescription"
                    placeholder="Tell us more about your business"
                    className=" xl:w-[125%] h-[138px] border border-[#9ca3af] outline-none  text-sm text-gray rounded-[5px] py-2 px-[10px] "
                  />
                  <ErrorMessage
                    name="businessDescription"
                    component="div"
                    className="text-[#db3a3a] mt-2 text-sm"
                  />
                </div>

                <div className="my-2 xl:w-[130%] flex flex-col space-y-2 ">
                  <label htmlFor="numberOfStaff" className="text-white block  text-sm">
                    Number of Staff
                  </label>
                  <Field
                    as="select"
                    id="numberOfStaff"
                    name="numberOfStaff"
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-sm text-gray rounded-[10px] py-2 px-[20px] bg-secondary">
                    <option value="" disabled>
                      Select Number of Staff
                    </option>
                    {staffOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="numberOfStaff"
                    component="div"
                    className="text-[#db3a3a] mt-2 text-sm"
                  />
                </div>

                <div className="my-4 xl:w-[130%] flex flex-col space-y-2 ">
                  <label htmlFor="annualIncomeRange" className="text-white block text-sm">
                    Annual Income Range
                  </label>
                  <Field
                    as="select"
                    id="annualIncomeRange"
                    name="annualIncomeRange"
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-sm text-gray rounded-[10px] py-2 px-[10px] bg-secondary">
                    <option value="" disabled>
                      Select Annual Income Range
                    </option>
                    {incomeRangeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="annualIncomeRange"
                    component="div"
                    className="text-[#db3a3a] mt-2 text-sm"
                  />
                </div>
              </div>

              <CustomButton
                padding="15px"
                type="submit"
                children="Next"
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[80%] w-[90%] mx-auto my-10 !mb-12 xl:mt-4 xl:!mb-6"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
