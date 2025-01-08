import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';

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

export const StepSix = ({ next, email }) => {
  // Ensure email is passed as a prop
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const userEmail = localStorage.getItem('userEmail');
  const handleSubmit = async (values, actions) => {
    setLoading(true);
    setApiError('');

    try {
      const imageFile = values.passport[0];
      await uploadImage(imageFile, userEmail); // Pass the email to uploadImage function
      next(values);
    } catch (error) {
      setApiError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  localStorage.setItem('currentStep', 6);

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
        className="absolute bottom-[4rem] right-[42rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[4rem] right-[45rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[3rem] right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[4rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[6rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[7rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 py-3 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[600px]">
        <h1 className="text-lightBlue text-start xl:text-[32px] text-nowrap text-xl font-bold pb-4 w-[85%]">
          Let’s Get Your Facial Profile!
        </h1>
        <p className="w-[84%]">
          Make sure all parts of your face are well lit. Ensure all parts of your face are visible
          and not covered by objects.
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
                  className=" w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
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
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8"
                disabled={isSubmitting || loading}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
