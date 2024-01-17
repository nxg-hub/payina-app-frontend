import { useState } from 'react';
import CustomButton from '../../../components/button/button';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignUpSchema } from '../schemas/signup-schema';

import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import 'react-international-phone/style.css';
import { images } from '../../../constants';

export default function SignUpForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  console.log(data);

  const handleNextStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };

  const steps = [
    <StepOne next={handleNextStep} />,
    <StepTwo next={handleNextStep} />,
    <StepThree next={handleNextStep} data={data} />,
    <StepFour next={handleNextStep} />,
  ];

  return (
    <div className="xl:my-14 space-y-10 xl:w-fit w-full px-6 mx-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      {steps[currentStep]}
    </div>
  );
}

const StepOne = ({ handleChange, next, data }) => {
  const handleSubmit = (values) => {
    next(values);
  };
  return (
    <>
      <div className="text-center mt-20 xl:mt-0 text-primary font-extrabold xl:text-5xl text-2xl">
        Sign In to Payina
      </div>
      <div className="hidden xl:block absolute top-[-16.5rem] right-[-38.5rem]">
        <img src={images.Group} alt="" />
      </div>
      <div className="bg-primary flex flex-col justify-center items-start mx-auto">
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => handleSubmit(values)}>
          {() => (
            <Form className="w-full space-y-4">
              <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl">
                  Enter Email and Password
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="email" className="text-sm font-normal text-lightBlue">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage name="email" component="span" className="text-[#db3a3a]" />
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="password" className="text-sm font-normal text-lightBlue">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage name="password" component="span" className="text-[#db3a3a]" />
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="password2" className="text-sm font-normal text-lightBlue">
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="span"
                    className="text-[#db3a3a]"
                  />
                </div>
              </div>
              <CustomButton
                padding="15px"
                type="submit"
                children="Next"
                className="flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[75%] mx-auto w-[90%] !mb-12 xl:my-12 xl:mb-20"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

const StepTwo = ({ next }) => {
  const [phone, setPhone] = useState('');
  const handleSubmit = () => {
    next({ phone });
  };
  const phoneRegExp =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['af', 'bj', 'bw', 'cm', 'cg', 'sz', 'gh', 'gn', 'gw', 'ir', 'ci', 'jo', 'ng'].includes(
      iso2
    );
  });

  const countryButton = `
  .react-international-phone-country-selector button {
    padding: 1.5rem;
  }
  .react-international-phone-input {
    padding: 1.5rem !important;
  }  
`;
  return (
    <div className="p-2 xl:p-10 bg-primary">
      <div className="hidden md:block fixed md:top-[-24.5rem] xl:top-[-25.5rem] md:right-[-0.1rem] xl:right-[-40.5rem]">
        <img src={images.Group} alt="" />
      </div>
      <div className="hidden md:block fixed md:-z-10 md:top-[-4.5rem] xl:top-[-14.5rem] right-[6.5rem]">
        <img src={images.Vector3} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[8rem] xl:top-[12.5rem] right-[20rem] -z-10">
        <img src={images.Vector2} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[10.5rem] xl:top-[14.6rem] right-[24rem] -z-10">
        <img src={images.Vector1} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[15rem] xl:top-[23rem] right-[6.5rem] -z-10">
        <img src={images.Vector2} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[22rem] xl:top-[30rem] right-[7.4rem] -z-10">
        <img src={images.Vector5} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[20rem] xl:top-[27.5rem] right-[9.4rem] -z-10">
        <img src={images.Vector4} alt="" />
      </div>
      <div className="hidden md:block fixed md:top-[11.5rem] xl:top-[19rem] right-[10.6rem] -z-10">
        <img src={images.Vector6} alt="" />
      </div>
      <Formik
        initialValues={phone}
        onSubmit={phone.length > 8 && phone.match(phoneRegExp) && handleSubmit}>
        {(formik) => (
          <Form>
            <PhoneInput
              defaultCountry="ng"
              value={phone}
              onChange={(phone) => setPhone(phone)}
              countries={countries}
              className="xl:w-[500px] !w-full xl:px-[1.95rem] px-[1.2rem] py-6 h-20 countryButton"
              inputClassName="!w-[125%] xl:w-full !text-base xl:!text-xl"
              style={{
                ' --react-international-phone-height': '500px',
                '--react-international-phone-flag-width': '54px',
                '--react-international-phone-border-radius': '5px'
              }}
              buttonClassName="!p-2"
              countrySelectorStyleProps="p-2"
              charAfterDialCode="-"
              onFocus={true}
            />
            {phone.length > 5 && !phone.match(phoneRegExp) && (
              <span className="text-center text-[#db3a3a] flex justify-center mt-4">
                Invalid Number
              </span>
            )}
            <CustomButton
              padding="15px"
              type="submit"
              children="Next"
              className="flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[87%] w-[90%] mx-auto my-10 !mb-12 xl:my-12 xl:mb-20"
            />
          </Form>
        )}
      </Formik>
      <style>{countryButton}</style>
    </div>
  );
};

const StepThree = ({ next, data }) => {
  const [codeAlert, setCodeAlert] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const handleSubmit = (values) => {
    next(values);
  };
  const handleCode = (e) => {
    e.preventDefault();
    setIsAlertVisible(true);
    setCodeAlert('Code has been succesfully sent');
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };
  let phoneNumber =
    data.phone?.slice(0, 4) +
    '-' +
    data.phone?.slice(4, 7) +
    '-' +
    data.phone?.slice(7, 10) +
    '-' +
    data.phone?.slice(10);

  return (
    <div>
      <div className="hidden xl:block fixed top-[-17.5rem] right-[-39.5rem]">
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
          We’ll send a verification code to your phone number
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
              <CustomButton
                children="Send Code"
                onClick={(e) => handleCode(e)}
                className="text-sm font-bold mt-10 !py-[1px] !px-[9px] !border-none !rounded-[10px] !bg-[#E80516]"
              />
              <span className="text-sm text-[#33b444] mt-4">{isAlertVisible && codeAlert}</span>
              <div className="flex flex-col items-center justify-center">
                <input
                  className="xl:w-[430px] w-[300px] h-[60px] outline-none border border-[#656666bd] text-start xl:tracking-[61px] tracking-[41px] xl:indent-[1.8rem] indent-[1.4rem] xl:my-10 my-4 xl:mb-0 mt-10 text-sm xl:text-xl"
                  name="otp"
                  id="otp"
                  type="tel"
                  temp=""
                  maxLength={6}
                  oninput="validity.valid ? this.temp = value : value = this.temp"
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
              <span className="font-bold text-center mt-10 leading-4 text-sm tracking-[0.28px] text-[#006181]">
                Enter Code
              </span>
              <CustomButton
                padding="15px"
                type="submit"
                children="Next"
                className="flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const StepFour= ({ next, data }) => {
  return (    
    <div className="p-2 xl:p-10 bg-primary">Identification Step</div>
  )
}
