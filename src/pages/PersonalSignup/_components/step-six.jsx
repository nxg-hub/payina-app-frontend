import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomButton from '../../../components/button/button';
import useLocalStorage from '../../../hooks/useLocalStorage.js';

const uploadImage = async (imageFile, email) => {
  try {
    const formData = new FormData();
    formData.append('passport', imageFile);
    formData.append('email', email);

    const response = await fetch(import.meta.env.VITE_UPLOAD_IMAGE_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.text();
    try {
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (jsonError) {
      console.error('Failed to parse JSON:', jsonError);
      throw new Error('Invalid JSON response');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const StepSix = ({ next }) => {
  const [userDetails] = useLocalStorage('userDetails', ''); // Fetch user details from localStorage
  const email = userDetails?.sub; // Extract email from userDetails
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    setApiError('');

    try {
      const imageFile = values.passport[0];
      if (!email) {
        throw new Error('Email not found. Please try logging in again.');
      }

      await uploadImage(imageFile, email); // Pass email to the uploadImage function
      next(values);
    } catch (error) {
      setApiError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  localStorage.setItem('currentStep', 6);

  return (
    <div className="p-2 xl:p-10 bg-primary">
      <h1 className="text-lightBlue text-start xl:text-[32px] text-xl font-bold pb-4 w-[85%]">
        Let’s Get Your Facial Profile!
      </h1>
      <p className="w-[84%]">
        Make sure all parts of your face are well lit. Ensure all parts of your face are visible and
        not covered by objects.
      </p>
      <Formik initialValues={{ passport: null }} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting }) => (
          <Form className="mt-8">
            <div className="my-2">
              <label htmlFor="passport" className="text-secondary block mb-2 w-full text-sm">
                Passport Image
              </label>
              <input
                type="file"
                id="passport"
                name="passport"
                accept="image/*"
                onChange={(event) => {
                  setFieldValue('passport', event.currentTarget.files);
                }}
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none rounded-[5px] py-2 px-[10px]"
              />
              <ErrorMessage
                name="passport"
                component="div"
                className="text-[#db3a3a] mt-2 text-sm"
              />
            </div>

            {apiError && <div className="text-red-500 mb-4">{apiError}</div>}

            <CustomButton
              padding="15px"
              type="submit"
              children={loading ? 'Uploading...' : 'Upload'}
              className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6"
              disabled={isSubmitting || loading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
