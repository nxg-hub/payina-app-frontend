// import React from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';
import { useState, React } from 'react';
import { useDispatch } from 'react-redux';
import { previousStep, setStep } from '../../../Redux/BusinessSignUpSlice';

// Validation schema using Yup
// const StepFourteenValidationSchema = Yup.object().shape({
//   numberOfSignatories: Yup.number()
//     .required('Number of signatories is required')
//     .min(1, 'Number of signatories must be at least 1')
//     .integer('Number of signatories must be an integer'),
// });

export const StepFourteen = ({ next }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handlePrevious = () => {
    dispatch(previousStep());
  };
  const handleSubmit = async (values) => {
    if (value === '') {
      setError('select an option');
      return;
    }
    const userEmail = localStorage.getItem('userEmail');
    if (value === 'Yes') {
      setLoading(true);
      setError('');

      try {
        // Fetch customerId using the provided email
        const data = await authenticateEmail(userEmail);

        if (!data) {
          console.error('Failed to fetch customer ID.');
          return;
        }

        // Set corporateCustomerId to the fetched customerId
        const corporateCustomerId = data.customerId;

        const requestBody = {
          corporateCustomerId: corporateCustomerId,
          signatories: [
            {
              name: data.firstName,
              phoneNumber: data.phoneNumber,
              email: userEmail,
            },
          ],
        };

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_ADD_SOLE_SIGNATORY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        // console.log('Uploaded Data:',requestBody )
        try {
          if (response.ok) {
            console.log('Signatories registered successfully:', response);
            // next(jsonResponse);
            dispatch(setStep(15));
          } else {
            console.error('Failed to register signatories:', response.status);
          }
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.error('Error registering signatories:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      next(values);
    }
  };

  // Function to authenticate email and fetch customerId
  const authenticateEmail = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${encodeURIComponent(email)}`
      );
      if (response.ok) {
        const data = await response.json();
        return data; // Return the data
      } else {
        console.error('Failed to authenticate email:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error authenticating email:', error);
      throw error;
    }
  };

  // Generate options for the number of signatories
  const generateSignatoriesOptions = () => {
    const options = [{ label: 'Select number of signatories', value: '', disabled: true }];

    for (let i = 1; i <= 10; i++) {
      options.push({ label: `${i}`, value: i });
    }

    return options;
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
        className="absolute bottom-[5.5rem] right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[5.5rem] right-[45rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[2rem] right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[3rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[5rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[6rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[500px]">
        <Formik
          initialValues={{
            numberOfSignatories: '',
          }}
          // validationSchema={StepFourteenValidationSchema}
          onSubmit={(values) => handleSubmit(values)}>
          {() => (
            <Form className="">
              <div className="my-4">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-nowrap text-xl mb-6 pr-0 xl:pr-20">
                  Business Signatories
                </div>
                <div>
                  <h2 className="capitalize text-lightBlue ">
                    Are you the sole signatory of this account?
                  </h2>
                  <label className="mr-4">
                    <input
                      type="radio"
                      value="Yes"
                      checked={value === 'Yes'}
                      onChange={(e) => setValue(e.target.value)}
                      className="mr-1"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="No"
                      checked={value === 'No'}
                      onChange={(e) => setValue(e.target.value)}
                      className="mr-1"
                    />
                    No
                  </label>
                  <p className="mt-3">Selected: {value || 'None'}</p>
                </div>
                {value === 'No' && (
                  <>
                    <label htmlFor="numberOfSignatories" className=" block mb-2">
                      Number of Signatories
                    </label>
                    <Field
                      as="select"
                      id="numberOfSignatories"
                      name="numberOfSignatories"
                      placeholder="Select Numbers of Signatories"
                      className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-primary rounded-[5px] py-2 px-[10px] bg-[#00678F]">
                      {generateSignatoriesOptions().map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="numberOfSignatories"
                      component="div"
                      className="text-[#db3a3a] mt-2"
                    />
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <button
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
              {error && <h2 className="text-red-500 text-center pb-3">{error}</h2>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
