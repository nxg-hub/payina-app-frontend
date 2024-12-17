import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
// import { images } from '../../../constants';
import { SignUpSchema } from '../schemas/schema';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState } from 'react';

export const StepOne = ({ next }) => {
  const savedEmail = localStorage.getItem('userEmail') || ''; // Fallback to an empty string if no email is stored
  const [showPassword, setShowPassword] = useState(false);

  // const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (values) => {
    // localStorage.setItem('currentStep', 1);
    localStorage.setItem('userEmail', values.email);
    next(values);
  };
  // const handleToggle = () => {
  //   navigate('/personal/signup');
  // };
  return (
    <div className="flex flex-col items-center justify-center py-6 px-5 bg-black">
      <div className="text-center mb-2 mt-20 xl:mt-0 text-primary font-extrabold xl:text-5xl text-2xl">
        Sign up to Payina
      </div>
      {/* <div className="hidden md:block absolute md:top-[-13.6rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-38.5rem]">
        <img src={images.Group} alt="" />
      </div> */}
      <div className="bg-primary flex flex-col justify-center items-start sm:w-[300px] md:w-[400px] xl:w-[600px]">
        <Formik
          initialValues={{ email: savedEmail, password: '', confirmPassword: '' }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => handleSubmit(values)}>
          {() => (
            <Form className="w-full space-y-4">
              <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-nowrap text-xl">
                  Enter Email and Password
                </div>
                {/* <div className="text-center mt-4">
                  <button
                    onClick={handleToggle}
                    className="text-yellow font-bold underline hover:no-underline focus:outline-none">
                    Sign up as a personal User Instead
                  </button>
                </div> */}
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="email" className="text-sm font-normal text-lightBlue">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage name="email" component="span" className="text-[#db3a3a]" />
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 relative">
                  <label htmlFor="password" className="text-sm font-normal text-lightBlue">
                    Password
                  </label>
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  {/* Helper Text for Password Instructions */}
                  <span className="text-xs text-gray-500">
                    Password should not be less than 8 characters and should contain alphabets and
                    numbers (alphanumeric)
                  </span>

                  <ErrorMessage name="password" component="span" className="text-[#db3a3a]" />
                  {showPassword ? (
                    <BsEye onClick={handleShowPassword} className="absolute top-10 right-1" />
                  ) : (
                    <BsEyeSlash onClick={handleShowPassword} className="absolute top-10 right-1" />
                  )}
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2 ">
                  <label htmlFor="password2" className="text-sm font-normal text-lightBlue">
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
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
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[75%] mx-auto w-[90%] !mb-12 xl:my-12 xl:mb-20"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
