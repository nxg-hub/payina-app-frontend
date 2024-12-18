import { Form, Formik, Field, ErrorMessage } from 'formik';
import CustomButton from '../../../components/button/button';
import * as Yup from 'yup';
import { images } from '../../../constants';

export const StepSixteen = ({ next, email }) => {
  const handleSubmit = async (values) => {
    // Merge OTP and Confirm OTP values into strings
    const otpValue = values.otp.join('');
    const confirmOtpValue = values.confirmOtp.join('');

    // Check if OTP and Confirm OTP match
    if (otpValue === confirmOtpValue) {
      const requestData = {
        pin: otpValue,
        verifyPin: confirmOtpValue,
        email: email, // Pass the email from previous steps
      };

      try {
        const response = await fetch(import.meta.env.VITE_TRANSACTION_PIN_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('API Response:', result);
          console.log('Pin set successfully:', result);
          next(result);
        } else {
          console.error('Failed to set pin:', response.statusText);
        }
      } catch (error) {
        console.error('Error setting pin:', error);
      }
    } else {
      console.log('Transaction Pins do not match.');
    }
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.array()
      .of(Yup.string().matches(/^\d$/, 'Transaction Pin digit must be a single digit'))
      .required('Transaction Pin is required'),
    confirmOtp: Yup.array()
      .of(Yup.string().matches(/^\d$/, 'Confirm Transaction Pin digit must be a single digit'))
      .required('Confirm Transaction Pin is required')
      .test('match', 'Transaction Pins do not match', function (value) {
        return this.parent.otp.join('') === value.join('');
      }),
  });
  localStorage.setItem('currentStep', 16);

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
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 py-3 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[600px]">
        <h1 className="text-secondary text-start  xl:text-[32px] text-nowrap text-xl">
          Create Your Transaction Pin
        </h1>
        <Formik
          initialValues={{ otp: ['', '', '', ''], confirmOtp: ['', '', '', ''] }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}>
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-4">
              {/* <div className="flex flex-col">
                <label htmlFor="otp" className="font-semibold pt-8">
                  Enter Transaction Pin:
                </label>
                <div className="flex justify-between py-4 ml">
                  {[0, 1, 2, 3].map((index) => (
                    <Field
                      key={index}
                      type="password"
                      name={`otp[${index}]`}
                      maxLength="1"
                      className="form-input w-12 mr-2 p-[10px] outline-none text-center border border-secondary rounded-full "
                    />
                  ))}
                </div>
                <ErrorMessage name="otp" className="text-[#db3a3a]" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmOtp" className="font-semibold">
                  Confirm Transaction Pin:
                </label>
                <div className="flex justify-between py-4">
                  {[0, 1, 2, 3].map((index) => (
                    <Field
                      key={index}
                      type="password"
                      name={`confirmOtp[${index}]`}
                      maxLength="1"
                      className="form-input w-12 mr-2 p-[10px] outline-none text-center border border-secondary rounded-full "
                    />
                  ))}
                </div>
                <ErrorMessage name="confirmOtp" component="div" className="text-[#db3a3a]" />
              </div> */}
              <div className="flex flex-col">
                <label htmlFor="otp" className="font-semibold pt-8">
                  Enter Transaction Pin:
                </label>
                <div className="flex justify-between py-4">
                  {[0, 1, 2, 3].map((index) => (
                    <Field
                      key={index}
                      type="password"
                      name={`otp[${index}]`}
                      maxLength="1"
                      value={values.otp[index]}
                      className="form-input w-12 mr-2 p-[10px] outline-none text-center border border-secondary rounded-full"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d$/.test(value)) {
                          setFieldValue(`otp[${index}]`, value);
                          if (value && e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          setFieldValue(`otp[${index}]`, '');
                          if (e.target.previousElementSibling) {
                            e.target.previousElementSibling.focus();
                          }
                        }
                      }}
                    />
                  ))}
                </div>
                <ErrorMessage name="otp" component="div" className="text-[#db3a3a]" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmOtp" className="font-semibold">
                  Confirm Transaction Pin:
                </label>
                <div className="flex justify-between py-4">
                  {[0, 1, 2, 3].map((index) => (
                    <Field
                      key={index}
                      type="password"
                      name={`confirmOtp[${index}]`}
                      maxLength="1"
                      value={values.confirmOtp[index]}
                      className="form-input w-12 mr-2 p-[10px] outline-none text-center border border-secondary rounded-full"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d$/.test(value)) {
                          setFieldValue(`confirmOtp[${index}]`, value);
                          if (value && e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          setFieldValue(`confirmOtp[${index}]`, '');
                          if (e.target.previousElementSibling) {
                            e.target.previousElementSibling.focus();
                          }
                        }
                      }}
                    />
                  ))}
                </div>
                <ErrorMessage name="confirmOtp" component="div" className="text-[#db3a3a]" />
              </div>
              <CustomButton
                padding="15px"
                type="submit"
                children="Next"
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
