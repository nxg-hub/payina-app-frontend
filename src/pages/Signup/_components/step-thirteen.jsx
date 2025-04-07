import React, { useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { previousStep } from '../../../Redux/BusinessSignUpSlice';

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
  '50,000,000 - Above',
];

export const StepThirteen = ({ next, email, initialValues }) => {
  const userEmail = localStorage.getItem('userEmail');
  const [loading, setLoading] = useState(false);
  const sameAddress = useSelector((state) => state.businessSignUp.sameAddress);

  const dispatch = useDispatch();

  const handlePrevious = () => {
    dispatch(previousStep());
  };
  //retrieving form data from local storage
  const homeAddress = localStorage.getItem('HomeAddress');
  const businessData = localStorage.getItem('businessData');
  const businessAddress = localStorage.getItem('BusinessAddress');
  const parsedHomeAdress = JSON.parse(homeAddress);
  const parsedBusinessData = JSON.parse(businessData);
  const parsedBusinessAddress = JSON.parse(businessAddress);

  // console.log(loading);
  const handleSubmit = async (values) => {
    const customerId = await authenticateEmail(userEmail); // Ensure email is passed correctly
    // console.log('Authenticated User ID:', customerId);

    // Combine previous data with the current step's data
    const requestData =
      sameAddress === 'yes' //send this data if home and business adress are same
        ? {
            houseNumber: parsedHomeAdress.houseNumber,
            street: parsedHomeAdress.street,
            state: parsedHomeAdress.state,
            lga: parsedHomeAdress.lga,
            businessHouseNumber: parsedHomeAdress.houseNumber,
            businessStreetName: parsedHomeAdress.street,
            businessState: parsedHomeAdress.state,
            businessLGA: parsedHomeAdress.lga,
            businessName: parsedBusinessData.businessName,
            tin_No: parsedBusinessData.tin_No,
            businessRegNumber: parsedBusinessData.businessRegNumber,
            businessCategory: parsedBusinessData.businessCategory,
            businessType: parsedBusinessData.businessType,
            businessDescription: values.businessDescription,
            staffNumber: values.numberOfStaff,
            annualIncome: values.annualIncomeRange,
            customerId: values.customerId,
          }
        : //send this data if home and business address are different
          {
            houseNumber: parsedHomeAdress.houseNumber,
            street: parsedHomeAdress.street,
            state: parsedHomeAdress.state,
            lga: parsedHomeAdress.lga,
            businessHouseNumber: parsedBusinessAddress.businessHouseNumber,
            businessStreetName: parsedBusinessAddress.businessStreetName,
            businessState: parsedBusinessAddress.businessState,
            businessLGA: parsedBusinessAddress.businessLGA,
            businessName: parsedBusinessData.businessName,
            tin_No: parsedBusinessData.tin_No,
            businessRegNumber: parsedBusinessData.businessRegNumber,
            businessCategory: parsedBusinessData.businessCategory,
            businessType: parsedBusinessData.businessType,
            businessDescription: values.businessDescription,
            staffNumber: values.numberOfStaff,
            annualIncome: values.annualIncomeRange,
            customerId: values.customerId,
          };
    setLoading(true);
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
        // console.log('Profile created successfully:', result);
        next(requestData);
        setLoading(false);
      } else {
        console.error('Failed to create profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const authenticateEmail = async (email) => {
    setLoading(true);
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
        setLoading(false);
        // console.log('Full Response:', data);

        // Extract the customerId from the response
        const customerId = data.customerId;
        return customerId;
      } else {
        const errorText = await response.text();
        console.error('Failed to authenticate email:', response.status, errorText);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src={images.Vector3}
        alt="Background Design"
        className="absolute top-0 right-[32rem] w-24 h-24"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[11.5rem] right-[41rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[11.5rem] right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[6rem] right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[7rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[9rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[10rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[600px]">
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
                <div className="text-lightBlue text-start font-bold xl:text-[2rem] text-nowrap text-xl pr-15">
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
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-sm  rounded-[10px] py-2 px-[20px] bg-secondary">
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
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-sm rounded-[10px] py-2 px-[10px] bg-secondary">
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
              <div className="flex gap-2">
                <button
                  disabled={loading}
                  onClick={handlePrevious}
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8">
                  Back
                </button>
                <CustomButton
                  padding="15px"
                  type="submit"
                  children={loading ? 'Loading...' : 'Next'}
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
