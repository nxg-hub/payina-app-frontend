import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
import { LoginSchema } from '../schemas/schema';
import { images } from '../../../constants';
import { useState } from 'react';
import { useAuth } from '../../../useAuth';
import useLocalStorage from '../../../hooks/useLocalStorage';

const parseXML = (xml) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const message = doc.querySelector('message');
  return message ? message.textContent : 'An unknown error occurred';
};

const decodeJWT = (token) => JSON.parse(atob(token.split('.')[1]));

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth(); // Use the useAuth hook
  const [authToken, setAuthToken] = useLocalStorage('authToken', '');
  const [userDetails, setUserDetails] = useLocalStorage('userDetails', '');

  const handleSubmit = async (values) => {
    setIsLoading(true);
    localStorage.setItem('userEmail', values.email);

    const requestData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch(import.meta.env.VITE_LOGIN_USER_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result?.data;

        if (token) {
          setAuthToken(token);
          const decodedString = decodeJWT(token);
          setUserDetails(decodedString);

          // Debug Logs
          console.log('Token stored in localStorage:', token);
          console.log('Decoded token details:', decodedString);
          console.log('AuthToken from hook:', authToken);

          await auth.checkUserRegistrationLevel();
        } else {
          setErrorMessage('Login failed: Invalid token structure');
        }
      } else {
        const errorText = await response.text();
        const message = parseXML(errorText);
        setErrorMessage(`Failed to log in: ${message}`);
      }
    } catch (error) {
      setErrorMessage(`Error logging in: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:w-[40%] mx-10 md:mx-auto md:py-10">
      <div className="text-center mt-20 xl:mt-0 text-primary font-extrabold xl:text-5xl text-2xl py-10">
        Login to Payina
      </div>
      <div className="hidden md:block absolute md:top-[-13.6rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-38.5rem]">
        <img src={images.Group} alt="" />
      </div>
      <div className="bg-primary flex flex-col justify-center items-start mx-auto py-6">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form className="w-full space-y-4">
              <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl">
                  Login
                </div>
                <div className="xl:w-[120%] flex flex-col space-y-2">
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
                <div className="xl:w-[120%] flex flex-col space-y-2">
                  <label htmlFor="password" className="text-sm font-normal text-lightBlue">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
                  />
                  <ErrorMessage name="password" component="span" className="text-[#db3a3a]" />
                </div>
                {errorMessage && <div className="text-[#db3a3a]">{errorMessage}</div>}
                <CustomButton
                  padding="15px"
                  type="submit"
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[120%] mx-auto w-[100%] !mb-12 xl:my-12 xl:mb-20"
                  disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Log in'}
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;

//
// import React, { useState } from 'react';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import { useAuth } from '../../../useAuth';
// import useLocalStorage from '../../../hooks/useLocalStorage';
// import CustomButton from '../../../components/button/button';
// import { LoginSchema } from '../schemas/schema';
// import { images } from '../../../constants';
//
// const LoginForm = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const auth = useAuth();
//   const [token, setToken] = useLocalStorage('token', ''); // Changed key to 'token'
//
//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     setIsLoading(true);
//     setErrorMessage('');
//
//     try {
//       const response = await fetch(import.meta.env.VITE_LOGIN_USER_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: values.email.trim(),
//           password: values.password,
//         }),
//       });
//
//       const result = await response.json();
//
//       if (response.ok && result.status === 'ACCEPTED') {
//         // Store the token directly from result.data
//         setToken(result.data);
//
//         // Store email for reference
//         localStorage.setItem('userEmail', values.email.trim());
//
//         // Log success
//         console.log('Token stored successfully:', result.data);
//
//         // Check user registration level
//         await auth.checkUserRegistrationLevel();
//
//         // Clear form on success
//         resetForm();
//       } else {
//         setErrorMessage(result.message || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setErrorMessage(
//         'Unable to complete login. Please check your connection and try again.'
//       );
//     } finally {
//       setIsLoading(false);
//       setSubmitting(false);
//     }
//   };
//
//   return (
//     <div className="md:w-[40%] mx-10 md:mx-auto md:py-10">
//       <h1 className="text-center mt-20 xl:mt-0 text-primary font-extrabold xl:text-5xl text-2xl py-10">
//         Login to Payina
//       </h1>
//
//       <div className="hidden md:block absolute md:top-[-13.6rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-38.5rem]">
//         <img src={images.Group} alt="Decorative" />
//       </div>
//
//       <div className="bg-primary p-6">
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={LoginSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="w-full space-y-4" noValidate>
//               <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4">
//                 <h2 className="text-lightBlue text-start font-bold xl:text-[32px] text-xl">
//                   Login
//                 </h2>
//
//                 <div className="xl:w-[120%] space-y-2">
//                   <label htmlFor="email" className="text-sm font-normal text-lightBlue">
//                     Email Address
//                   </label>
//                   <Field
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     placeholder="Enter Email Address"
//                     className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                   />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="text-[#db3a3a] text-sm"
//                   />
//                 </div>
//
//                 <div className="xl:w-[120%] space-y-2">
//                   <label htmlFor="password" className="text-sm font-normal text-lightBlue">
//                     Password
//                   </label>
//                   <Field
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     placeholder="Enter Password"
//                     className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="text-[#db3a3a] text-sm"
//                   />
//                 </div>
//
//                 {errorMessage && (
//                   <div className="text-[#db3a3a] text-sm p-2 bg-red-50 rounded">
//                     {errorMessage}
//                   </div>
//                 )}
//
//                 <CustomButton
//                   type="submit"
//                   padding="15px"
//                   disabled={isLoading || isSubmitting}
//                   className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[120%] mx-auto w-[100%] !mb-12 xl:my-12 xl:mb-20"
//                 >
//                   {isLoading ? 'Logging in...' : 'Log in'}
//                 </CustomButton>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };
//
// export default LoginForm;

// import React, { useState } from 'react';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import { useAuth } from '../../../useAuth';
// import useLocalStorage from '../../../hooks/useLocalStorage';
// import CustomButton from '../../../components/button/button';
// import { LoginSchema } from '../schemas/schema';
// import { images } from '../../../constants';
//
// const LoginForm = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const auth = useAuth();
//   const [token, setToken] = useLocalStorage('authToken', ''); // Consistent key: authToken
//
//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     setIsLoading(true);
//     setErrorMessage('');
//
//     try {
//       const response = await fetch(import.meta.env.VITE_LOGIN_USER_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: values.email.trim(),
//           password: values.password,
//         }),
//       });
//
//       const result = await response.json();
//
//       if (response.ok && result.status === 'ACCEPTED') {
//         // Store token and email
//         setToken(result.data); // Store token securely
//         localStorage.setItem('userEmail', values.email.trim());
//
//         console.log('Token stored successfully:', result.data);
//
//         // Perform additional actions if needed
//         await auth.checkUserRegistrationLevel();
//
//         resetForm(); // Clear form
//       } else {
//         setErrorMessage(result.message || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setErrorMessage('Unable to complete login. Please check your connection and try again.');
//     } finally {
//       setIsLoading(false);
//       setSubmitting(false);
//     }
//   };
//
//   return (
//     <div className="md:w-[40%] mx-10 md:mx-auto md:py-10">
//       <h1 className="text-center mt-20 xl:mt-0 text-primary font-extrabold xl:text-5xl text-2xl py-10">
//         Login to Payina
//       </h1>
//
//       <div className="hidden md:block absolute md:top-[-13.6rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-38.5rem]">
//         <img src={images.Group} alt="Decorative" />
//       </div>
//
//       <div className="bg-primary p-6">
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={LoginSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="w-full space-y-4" noValidate>
//               <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4">
//                 <h2 className="text-lightBlue text-start font-bold xl:text-[32px] text-xl">
//                   Login
//                 </h2>
//
//                 <div className="xl:w-[120%] space-y-2">
//                   <label htmlFor="email" className="text-sm font-normal text-lightBlue">
//                     Email Address
//                   </label>
//                   <Field
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     placeholder="Enter Email Address"
//                     className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                   />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="text-[#db3a3a] text-sm"
//                   />
//                 </div>
//
//                 <div className="xl:w-[120%] space-y-2">
//                   <label htmlFor="password" className="text-sm font-normal text-lightBlue">
//                     Password
//                   </label>
//                   <Field
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     placeholder="Enter Password"
//                     className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="text-[#db3a3a] text-sm"
//                   />
//                 </div>
//
//                 {errorMessage && (
//                   <div className="text-[#db3a3a] text-sm p-2 bg-red-50 rounded">
//                     {errorMessage}
//                   </div>
//                 )}
//
//                 <CustomButton
//                   type="submit"
//                   padding="15px"
//                   disabled={isLoading || isSubmitting}
//                   className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[120%] mx-auto w-[100%] !mb-12 xl:my-12 xl:mb-20"
//                 >
//                   {isLoading ? 'Logging in...' : 'Log in'}
//                 </CustomButton>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };
//
// export default LoginForm;
