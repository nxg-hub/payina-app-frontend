import { Field, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';
import axios from 'axios';

export const StepThree = ({ next, data }) => {
  const [codeAlert, setCodeAlert] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [canResendCode, setCanResendCode] = useState(false);
  const [loading, setLoading] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const userEmail = localStorage.getItem('userEmail');
  const [timeLeft, setTimeLeft] = useState(60);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCanResendCode(true);
  //   }, 60000);
  //   // 60 seconds
  //   return () => clearTimeout(timer);
  // }, []);
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResendCode(true);
    }
    // Only run if there is time left
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Update every second

      // Cleanup interval on component unmount or when `timeLeft` changes
      return () => clearInterval(timer);
    }
  }, [timeLeft]); // Run

  const handleSubmit = async (values) => {
    setLoading(true);
    setOtpError('');
    try {
      const response = await fetch(import.meta.env.VITE_VALIDATE_OTP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: values.otp }),
      });
      const data = await response.json();

      if (data.status === 'ACCEPTED') {
        next(values);
        setLoading(false);
      } else if (data.status === 'BAD_REQUEST') {
        setOtpError(data.debugMessage || 'Invalid OTP');
        return;
      } else {
        setOtpError(data.debugMessage || 'Invalid OTP');
      }
    } catch (error) {
      setOtpError('An error occurred. Please try again.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleCode = async (e) => {
    e.preventDefault();
    const phone = data.phone.replace(/^\+234/, '0');

    setOtpLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_SEND_TOKEN, {
        phone: phone,
        email: userEmail,
      });
      if (response.status === 200) {
        setIsAlertVisible(true);
        setCodeAlert('Code has been successfully sent');
        setCanResendCode(false); // Reset the resend code state
        setOtpLoading(false);
        setTimeLeft(60);
      }
    } catch (err) {
      setOtpLoading(`Error:Something went wrong`);
      console.log(err);
    } finally {
      setOtpLoading(false);
    }

    // setIsAlertVisible(true);
    // setCodeAlert('Code has been successfully sent');
    // setCanResendCode(false); // Reset the resend code state

    // Restart the timer for the resend code
    const timer = setTimeout(() => {
      setCanResendCode(true);
    }, 60000);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  };

  const otpInput = `
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0
    }
  
    input[type=number] {
      -moz-appearance: textfield;
    }`;
  const phone = localStorage.getItem('phoneNumber ');
  let phoneNumber =
    phone?.slice(0, 4) +
    '-' +
    phone?.slice(4, 7) +
    '-' +
    phone?.slice(7, 10) +
    '-' +
    phone?.slice(10);

  localStorage.setItem('currentStep', 3);

  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src={images.Vector3}
        alt="Background Design"
        className="absolute top-[-5rem] right-[32rem] w-24 h-24"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[2rem] right-[41rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[2rem] right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-0 right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[0.5rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[2rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[1rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[600px]">
        <div className="text-lightBlue text-start font-bold xl:text-[32px] text-wrap xl:w-[450px] leading-9 text-xl">
          Kindly Confirm Your Phone Number
        </div>
        <span className="font-light mt-5 leading-5 text-sm xl:text-base">
          We’ll send a verification code to your phone number and email address
        </span>
        <Formik
          initialValues={{ phone: phoneNumber, otp: '' }}
          onSubmit={(values) => handleSubmit(values)}>
          {(formik) => (
            <Form className="w-full justify-center flex items-center flex-col">
              <Field
                name="phone"
                type="tel"
                value={formik.values.phone}
                maxLength={17}
                className="w-[60%] font-bold text-center mx-auto bg-transparent border-none h-[3.4rem] outline-none text-base xl:text-xl text-gray rounded-[5px] py-6 pb-0 px-[10px]"
              />
              <hr className="border-none bg-[#e80516] h-[1px] w-[180px] mt-2 xl:mx-auto" />
              {canResendCode ? (
                <CustomButton
                  children={otpLoading ? 'sending otp...' : 'Resend Code'}
                  onClick={(e) => handleCode(e)}
                  className="text-sm font-bold mt-10 !py-[1px] !px-[9px] !border-none !rounded-[10px] !bg-[#E80516]"
                />
              ) : (
                <span className="text-sm text-gray-500 mt-10">
                  You can resend the code in <strong>{timeLeft}</strong> seconds.
                </span>
              )}
              <span className="text-sm text-[#33b444] mt-4">{isAlertVisible && codeAlert}</span>
              <div className="flex flex-col items-center justify-center">
                <input
                  className="xl:w-[430px] w-[300px] h-[60px] outline-none border border-[#656666bd] text-start xl:tracking-[61px] tracking-[41px] xl:indent-[1.8rem] indent-[1.4rem] xl:my-10 my-4 xl:mb-0 mt-10 text-sm xl:text-xl"
                  name="otp"
                  id="otp"
                  type="number"
                  maxLength={6}
                  pattern="\d{6}"
                  onInput={(e) => {
                    const value = e.target.value.slice(0, 6); // Limit to 6 digits
                    e.target.value = value; // Enforce truncation
                    formik.setFieldValue('otp', value); // Update Formik value
                  }}
                  value={formik.values.otp}
                  autoFocus
                />

                {/* <input
                  className="xl:w-[430px] w-[300px] h-[60px] outline-none border border-[#656666bd] text-start xl:tracking-[61px] tracking-[41px] xl:indent-[1.8rem] indent-[1.4rem] xl:my-10 my-4 xl:mb-0 mt-10 text-sm xl:text-xl"
                  name="otp"
                  id="otp"
                  type="number"
                  temp=""
                  maxLength={6}
                  onInput="validity.valid ? this.temp = value : value = this.temp"
                  onChange={formik.handleChange}
                  value={formik.values.otp}
                  autoFocus
                /> */}
                <div className="flex xl:-mt-12 -mt-8 justify-between w-full px-4">
                  <span className="xl:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="xl:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="xl:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="xl:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="xl:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                  <span className="xl:w-[35px] w-[24px] xl:mt-2 -mt-6 text-center h-[30px] font-bold text-2xl inline-block border-b border-[#E80516]">
                    &nbsp;
                  </span>
                </div>
              </div>
              {otpError && <span className="text-red-500 mt-4">{otpError}</span>}
              <span className="font-bold text-center mt-10 leading-4 text-sm tracking-[0.28px] text-[#006181]">
                Enter Code
              </span>
              <CustomButton
                loading={loading}
                padding="15px"
                type="submit"
                children="Next"
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8"
              />
            </Form>
          )}
        </Formik>
      </div>
      <style>{otpInput}</style>
    </div>
  );
};
