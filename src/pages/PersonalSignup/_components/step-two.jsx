import { useState } from 'react';
import { images } from '../../../constants';
import { Field, Form, Formik } from 'formik';
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import 'react-international-phone/style.css';
import CustomButton from '../../../components/button/button';
import { useDispatch } from 'react-redux';
import { previousStep } from '../../../Redux/PersonalSignUpSlice';

export const StepTwo = ({ next, initialValues }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handleSubmit = async (values) => {
    const userEmail = localStorage.getItem('userEmail');
    localStorage.setItem('phoneNumber ', phone);
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        phoneNumber: phone,
        password: initialValues.password,
        confirmPassword: initialValues.confirmPassword,
        userType: 'personal',
        email: userEmail,
        referralCode: values.promoCode,
      };

      const response = await fetch(`${import.meta.env.VITE_REGISTER_USER_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
        // const data = await response.json();
        setMessage('Registration successful');
        next({ ...initialValues, phone: phone });
      } else {
        data.debugMessage === 'Customer Already Exist'
          ? setMessage(`${data.debugMessage}. Please Login To Continue Your Sign Up Process`)
          : setMessage(data.debugMessage);
      }
    } catch (error) {
      setMessage('An error occurred');
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
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
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src={images.Vector3}
        alt="Background Design"
        className="absolute top-0 lg:right-[32rem] right-[0rem] w-24 h-24"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute lg:bottom-[8rem] bottom-[0rem] left-[0rem] lg:left-[30rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute lg:top-[27rem] top-[0rem] left-[0rem] lg:left-[28rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute lg:top-[31rem] top-[0rem] left-[0rem] lg:left-[50rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute lg:top-[35rem] top-[0rem] left-[0rem] lg:left-[55rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute lg:top-[33.5rem] top-[0rem] left-[0rem] lg:left-[51rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute lg:top-[27rem] top-[0rem] left-[0rem] lg:left-[51rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[600px]">
        <Formik
          initialValues={{ phoneNumber: '', promoCode: '' }}
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
                  '--react-international-phone-border-radius': '5px',
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
              <div className=" flex flex-col space-y-1 ">
                <label htmlFor="promoCode" className="text-sm font-normal ml-5 text-lightBlue">
                  Promo Code
                </label>
                <Field
                  name="promoCode"
                  type={'text'}
                  placeholder="Enter Promo code (If you have any)"
                  className="w-[90%] m-auto h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                />
              </div>
              {message && (
                <div className="text-center text-[#db3a3a] flex justify-center mt-4">{message}</div>
              )}
              <div className=" flex gap-2">
                <button
                  disabled={loading}
                  onClick={handlePrevious}
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-12">
                  Back
                </button>

                <CustomButton
                  padding="15px"
                  type="submit"
                  children={loading ? 'Loading...' : 'Next'}
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[87%] w-[90%] mx-auto my-10 !mb-12 xl:my-12 xl:mb-20"
                />
              </div>
            </Form>
          )}
        </Formik>
        <style>{countryButton}</style>
      </div>
    </div>
  );
};
