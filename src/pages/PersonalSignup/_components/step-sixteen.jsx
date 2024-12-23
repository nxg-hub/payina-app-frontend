import { Form, Formik, Field, ErrorMessage } from 'formik';
import CustomButton from '../../../components/button/button';
import * as Yup from 'yup';

export const StepSixteen = ({ next, email }) => {
  const handleSubmit = async (values) => {
    // Merge OTP and Confirm OTP values into strings
    const otpValue = values.otp.join('');
    const confirmOtpValue = values.confirmOtp.join('');
    const userEmail = localStorage.getItem('userEmail');
    // Check if OTP and Confirm OTP match
    if (otpValue === confirmOtpValue) {
      const requestData = {
        pin: otpValue,
        verifyPin: confirmOtpValue,
        email: userEmail,
      };

      try {
        const response = await fetch(import.meta.env.VITE_PERSONAL_TRANSACTION_PIN_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const result = await response.json();
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

  return (
    <div className="p-2 xl:p-10 bg-primary">
      <h1 className="text-secondary text-start  xl:text-[32px] text-xl">
        Create Your Transaction Pin
      </h1>

      <Formik
        initialValues={{ otp: ['', '', '', ''], confirmOtp: ['', '', '', ''] }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex flex-col">
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
            </div>
            <CustomButton
              padding="15px"
              type="submit"
              children="Next"
              className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
