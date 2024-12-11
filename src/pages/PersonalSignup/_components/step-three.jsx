import { Field, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';

export const StepThree = ({ next, data }) => {
  const [codeAlert, setCodeAlert] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [canResendCode, setCanResendCode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanResendCode(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(import.meta.env.VITE_VALIDATE_OTP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: values.otp }),
      });
      const data = await response.json();

      if (response.ok) {
        next(values);
      } else {
        setOtpError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      setOtpError('An error occurred. Please try again.');
    }
  };

  const handleCode = (e) => {
    e.preventDefault();
    setIsAlertVisible(true);
    setCodeAlert('Code has been successfully sent');
    setCanResendCode(false); // Reset the resend code state

    // Restart the timer for the resend code
    const timer = setTimeout(() => {
      setCanResendCode(true);
    }, 30000);

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

  let phoneNumber =
    data.phone?.slice(0, 4) +
    '-' +
    data.phone?.slice(4, 7) +
    '-' +
    data.phone?.slice(7, 10) +
    '-' +
    data.phone?.slice(10);

  console.log(phoneNumber);

  return (
    <div>
      <div className="hidden md:block fixed md:top-[-14.5rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-39.5rem]">
        <img src={images.Group} alt="" />
      </div>
      <div className="hidden md:block fixed top-[-3.5rem] right-[8.5rem] -z-10">
        <img src={images.Vector3} alt="" />
      </div>
      <div className="hidden md:block fixed top-[12.5rem] right-[20rem] -z-10">
        <img src={images.Vector2} alt="" />
      </div>
      <div className="hidden md:block fixed top-[14.6rem] right-[24rem] -z-10">
        <img src={images.Vector1} alt="" />
      </div>
      <div className="hidden md:block fixed top-[35rem] right-[6.5rem] -z-10">
        <img src={images.Vector2} alt="" />
      </div>
      <div className="hidden md:block fixed top-[42rem] right-[7.4rem] -z-10">
        <img src={images.Vector5} alt="" />
      </div>
      <div className="hidden md:block fixed top-[40rem] right-[9.4rem] -z-10">
        <img src={images.Vector4} alt="" />
      </div>
      <div className="hidden md:block fixed top-[31rem] right-[11.6rem] -z-10">
        <img src={images.Vector6} alt="" />
      </div>
      <div className="bg-primary flex flex-col justify-center items-start py-4 xl:py-8 px-4 xl:px-20">
        <div className="text-lightBlue text-start font-bold xl:text-[32px] w-full xl:w-[450px] leading-9 text-xl">
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
                  children="Resend Code"
                  onClick={(e) => handleCode(e)}
                  className="text-sm font-bold mt-10 !py-[1px] !px-[9px] !border-none !rounded-[10px] !bg-[#E80516]"
                />
              ) : (
                <span className="text-sm text-gray-500 mt-10">
                  You can resend the code in 30 seconds.
                </span>
              )}
              <span className="text-sm text-[#33b444] mt-4">{isAlertVisible && codeAlert}</span>
              <div className="flex flex-col items-center justify-center">
                <input
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
                />
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
                padding="15px"
                type="submit"
                children="Next"
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[87%] w-[90%] mx-auto my-10 !mb-12 xl:my-12 xl:mb-20"
              />
            </Form>
          )}
        </Formik>
      </div>
      <style>{otpInput}</style>
    </div>
  );
};
