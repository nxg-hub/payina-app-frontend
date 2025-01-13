import { React, useState } from 'react';
import { Form, Formik, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';

const StepFifteenValidationSchema = Yup.object().shape({
  signatories: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      emailAddress: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must only contain digits')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, "Phone number can't exceed 15 digits")
        .required('Phone number is required'),
    })
  ),
});

export const StepFifteen = ({ next, email }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const userEmail = localStorage.getItem('userEmail');
    setLoading(true);

    try {
      // Fetch customerId using the provided email
      const customerId = await authenticateEmail(userEmail);

      if (!customerId) {
        console.error('Failed to fetch customer ID.');
        return;
      }

      // Set corporateCustomerId to the fetched customerId
      const corporateCustomerId = customerId;

      const requestBody = {
        corporateCustomerId: corporateCustomerId,
        signatories: values.signatories.map((signatory) => ({
          name: signatory.name,
          phoneNumber: signatory.phoneNumber,
          email: signatory.emailAddress,
        })),
      };

      const response = await fetch(import.meta.env.VITE_ADD_SIGNATORIES_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // console.log('Uploaded Data:',requestBody );
      const textResponse = await response.text();

      try {
        const jsonResponse = JSON.parse(textResponse);
        if (response.ok) {
          console.log('Signatories registered successfully:', jsonResponse);
          next(jsonResponse);
        } else {
          console.error('Failed to register signatories:', response.status, jsonResponse);
        }
      } catch (error) {
        if (response.ok) {
          console.log('Signatories registered successfully:', textResponse);
          next();
        } else {
          console.error('Failed to register signatories:', response.status, textResponse);
        }
      }
    } catch (error) {
      console.error('Error registering signatories:', error);
    }
  };
  // Function to authenticate email and fetch customerId
  const authenticateEmail = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${encodeURIComponent(email)}`
      );
      if (response.ok) {
        const data = await response.json();
        return data.customerId; // Return the customerId
      } else {
        console.error('Failed to authenticate email:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error authenticating email:', error);
      throw error;
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
        className="absolute bottom-[3rem] right-[41rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[3rem] right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[0.3rem] right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[1rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[2rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[2rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 py-3 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[500px]">
        <div className="xl:text-[32px] text-nowrap text-xl text-lightBlue text-start font-bold pr-0 xl:pr-20 xl:pl-20 pl-0 ">
          Provide Signatories Details
        </div>
        <Formik
          initialValues={{
            signatories: [{ name: '', emailAddress: '', phoneNumber: '' }],
          }}
          validationSchema={StepFifteenValidationSchema}
          onSubmit={(values) => handleSubmit(values)}>
          {({ values }) => (
            <Form>
              <FieldArray name="signatories">
                {({ insert, remove, push }) => (
                  <div>
                    {values.signatories.length > 0 &&
                      values.signatories.map((signatory, index) => (
                        <div className="my-4" key={index}>
                          <div>
                            <label
                              htmlFor={`signatories.${index}.name`}
                              className="text-white block mb-2">
                              Name
                            </label>
                            <Field
                              name={`signatories.${index}.name`}
                              placeholder="Enter name"
                              className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[10px] py-2 px-[10px]"
                            />
                            <ErrorMessage
                              name={`signatories.${index}.name`}
                              component="div"
                              className="text-[#db3a3a] mt-2"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`signatories.${index}.emailAddress`}
                              className="text-white block mb-2">
                              Email Address
                            </label>
                            <Field
                              name={`signatories.${index}.emailAddress`}
                              placeholder="Enter email address"
                              className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[10px] py-2 px-[10px]"
                            />
                            <ErrorMessage
                              name={`signatories.${index}.emailAddress`}
                              component="div"
                              className="text-[#db3a3a] mt-2"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`signatories.${index}.phoneNumber`}
                              className="text-white block mb-2">
                              Phone Number
                            </label>
                            <Field
                              name={`signatories.${index}.phoneNumber`}
                              placeholder="Enter phone number"
                              className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[10px] py-2 px-[10px]"
                            />
                            <ErrorMessage
                              name={`signatories.${index}.phoneNumber`}
                              component="div"
                              className="text-[#db3a3a] mt-2"
                            />
                          </div>

                          <div className="flex justify-between mt-4 space-x-2">
                            {/* <button
                              type="button"
                              className="px-2 py-1  !text-lightBlue xl:text-[15px] !border-none !bg-yellow rounded text-sm font-extrabold duration-300 "
                              onClick={() => remove(index)}>
                              Remove Signatory
                            </button> */}
                            <button
                              type="button"
                              className="px-2 py-1  !text-lightBlue xl:text-[15px] !border-none !bg-yellow rounded text-sm font-extrabold duration-300 "
                              onClick={() => push({ name: '', emailAddress: '', phoneNumber: '' })}>
                              Add Another Signatory
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </FieldArray>
              <CustomButton
                padding="15px"
                type="submit"
                  children={loading ? 'Loading...' : 'Next'}
className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
