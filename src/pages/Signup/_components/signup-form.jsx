import { useState } from 'react';
import CustomButton from '../../../components/button/button';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignUpSchema } from '../schemas/signup-schema';

import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import 'react-international-phone/style.css';

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
    <StepThree next={handleNextStep} />
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
              className="xl:w-[500px] !w-full p-8 h-20 countryButton"
              inputClassName="!w-[125%] xl:w-full !text-xl"
              style={{
                ' --react-international-phone-height': '500px',
                '--react-international-phone-flag-width': '54px',
                '--react-international-phone-border-radius': '5px'
              }}
              buttonClassName="!p-2"
              countrySelectorStyleProps="p-2"
              // disableDialCodeAndPrefix={true}
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

const StepThree = ({ next }) => {
  return (
    <div className="bg-primary flex flex-col justify-center items-start mx-auto p-2 xl:p-10">
      otp step
    </div>
  );
};
