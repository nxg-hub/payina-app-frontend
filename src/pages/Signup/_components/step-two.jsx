import { useState } from 'react';
import { images } from '../../../constants';
import { Form, Formik } from 'formik';
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import 'react-international-phone/style.css';
import CustomButton from '../../../components/button/button';

export const StepTwo = ({ next, initialValues }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (values) => {
    try {
      const payload = {
        phoneNumber: phone,
        password: initialValues.password,
        confirmPassword: initialValues.confirmPassword,
        userType: 'corporate',
        email: initialValues.email
      };

      const response = await fetch(import.meta.env.VITE_REGISTER_USER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
        const data = await response.json();
        setMessage('Registration successful');
        next({ ...initialValues, phone: phone });
      } else {
        const errorMessage = await response.text(); // Capture the XML error message
        console.error('Error message:', errorMessage);
        const parsedMessage = parseXML(errorMessage); // Parse the XML error message
        setMessage(
          `Registration failed: ${parsedMessage || response.statusText || 'Unknown error'}`
        );
      }
    } catch (error) {
      setMessage('An error occurred');
      console.error('An error occurred:', error);
    }
  };

  const parseXML = (xml) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');

    const messageElement = doc.querySelector('message');
    const debugMessageElement = doc.querySelector('debugMessage');

    const message = messageElement ? messageElement.textContent : 'No error message available';
    const debugMessage = debugMessageElement
      ? debugMessageElement.textContent
      : 'No debug message available';

    // Return the debug message if available, otherwise return the message
    return debugMessage || message;
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
      <div className="hidden md:block fixed md:top-[-24.5rem] xl:top-[-21.5rem] md:right-[-0.1rem] xl:right-[-39.5rem]">
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
        initialValues={{ phoneNumber: '' }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
        enable
        enableReinitialize>
        {() => (
          <Form>
            <PhoneInput
              defaultCountry="ng"
              value={phone}
              onChange={(phone) => setPhone(phone)}
              countries={countries}
              className="xl:w-[500px] !w-full xl:px-[1.95rem] px-[1.2rem] py-6 h-20 countryButton"
              inputClassName="!w-[125%] xl:w-full !text-base xl:!text-xl"
              style={{
                ReactInternationalPhoneHeight: '500px',
                '--react-international-phone-flag-width': '54px',
                '--react-international-phone-border-radius': '5px'
              }}
              buttonClassName="!p-2"
              countrySelectorStyleProps="p-2"
              // charAfterDialCode=""
              onFocus={() => {}}
            />
            {phone.length > 5 && !phone.match(phoneRegExp) && (
              <span className="text-center text-[#db3a3a] flex justify-center mt-4">
                Invalid Number
              </span>
            )}
            {message && (
              <div className="text-center text-[#db3a3a] flex justify-center mt-4">{message}</div>
            )}
            <CustomButton
              padding="15px"
              type="submit"
              children="Next"
              className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[87%] w-[90%] mx-auto my-10 !mb-12 xl:my-12 xl:mb-20"
            />
          </Form>
        )}
      </Formik>
      <style>{countryButton}</style>
    </div>
  );
};
