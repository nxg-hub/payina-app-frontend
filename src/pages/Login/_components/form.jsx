import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
import { LoginSchema } from '../schemas/schema';
import { useNavigate } from 'react-router-dom';
import { images } from '../../../constants';
import { useState } from 'react';

const parseXML = (xml) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const message = doc.querySelector('message');
  return message ? message.textContent : 'An unknown error occurred';
};

const LoginForm = ({ next }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage(''); // Clear any existing error messages

    localStorage.setItem('userEmail', values.email);

    const requestData = {
      email: values.email,
      password: values.password,
    };

    console.log(requestData);

    const endpoint = import.meta.env.VITE_LOGIN_USER_ENDPOINT;
    if (!endpoint) {
      setErrorMessage('Login endpoint is not defined');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(endpoint, {
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
          localStorage.setItem('authToken', token);
          console.log('Log in successful:', token);
          const signupStep = localStorage.getItem('currentStep');
          const totalSteps = 17; // assuming you have 17 steps in total

          if (signupStep && parseInt(signupStep) < totalSteps) {
            // If signup is incomplete, redirect to the last step the user was on
            navigate('/signup');
          } else {
            // If signup is complete, proceed to the dashboard
            navigate('/account/dashboard');
          }
          next(); // Invoke the next callback if provided
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
                    {errorMessage && (
                        <div className="text-[#db3a3a]">
                          {errorMessage}
                        </div>
                    )}
                    <CustomButton
                        padding="15px"
                        type="submit"
                        className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[120%] mx-auto w-[100%] !mb-12 xl:my-12 xl:mb-20"
                        disabled={isLoading}
                    >
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

LoginForm.defaultProps = {
  next: () => {},
};

export default LoginForm;

// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import CustomButton from '../../../components/button/button';
// import { LoginSchema } from '../schemas/schema';
// import { useNavigate } from 'react-router-dom';
// import { images } from '../../../constants';
// import { useState } from 'react';
//
// const LoginForm = ({ next }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//
//   const handleSubmit = async (values) => {
//     setIsLoading(true);
//     setErrorMessage(''); // Clear any existing error messages
//
//     localStorage.setItem('userEmail', values.email);
//
//     const requestData = {
//       email: values.email,
//       password: values.password,
//     };
//
//     console.log(requestData);
//
//     const endpoint = import.meta.env.VITE_LOGIN_USER_ENDPOINT;
//     if (!endpoint) {
//       setErrorMessage('Login endpoint is not defined');
//       setIsLoading(false);
//       return;
//     }
//
//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });
//
//       if (response.ok) {
//         const result = await response.json();
//         const token = result?.data;
//         if (token) {
//           localStorage.setItem('authToken', token);
//           console.log('Log in successful:', token);
//           const signupStep = localStorage.getItem('signupStep');
//           const totalSteps = 17; // assuming you have 17 steps in total
//
//           if (signupStep && parseInt(signupStep) < totalSteps) {
//             // If signup is incomplete, redirect to the last step the user was on
//             navigate('/signup');
//           } else {
//             // If signup is complete, proceed to the dashboard
//             navigate('/account/dashboard');
//           }
//           next(); // Invoke the next callback if provided
//         } else {
//           setErrorMessage('Login failed: Invalid token structure');
//         }
//       } else {
//         const errorText = await response.text();
//         setErrorMessage(`Failed to log in: ${errorText.message}`);
//       }
//     } catch (error) {
//       setErrorMessage(`Error logging in: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return (
//       <div className="md:w-[40%] mx-10 md:mx-auto md:py-10">
//         <div className="text-center mt-20 xl:mt-0 text-primary font-extrabold xl:text-5xl text-2xl py-10">
//           Login to Payina
//         </div>
//         <div className="hidden md:block absolute md:top-[-13.6rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-38.5rem]">
//           <img src={images.Group} alt="" />
//         </div>
//         <div className="bg-primary flex flex-col justify-center items-start mx-auto py-6">
//           <Formik
//               initialValues={{ email: '', password: '' }}
//               validationSchema={LoginSchema}
//               onSubmit={handleSubmit}>
//             {() => (
//                 <Form className="w-full space-y-4">
//                   <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
//                     <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl">
//                       Login
//                     </div>
//                     <div className="xl:w-[120%] flex flex-col space-y-2">
//                       <label htmlFor="email" className="text-sm font-normal text-lightBlue">
//                         Email Address
//                       </label>
//                       <Field
//                           name="email"
//                           type="email"
//                           placeholder="Enter Email Address"
//                           className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                       />
//                       <ErrorMessage name="email" component="span" className="text-[#db3a3a]" />
//                     </div>
//                     <div className="xl:w-[120%] flex flex-col space-y-2">
//                       <label htmlFor="password" className="text-sm font-normal text-lightBlue">
//                         Password
//                       </label>
//                       <Field
//                           name="password"
//                           type="password"
//                           placeholder="Enter Password"
//                           className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                       />
//                       <ErrorMessage name="password" component="span" className="text-[#db3a3a]" />
//                     </div>
//                     {errorMessage && (
//                         <div className="text-[#db3a3a]">
//                           {errorMessage}
//                         </div>
//                     )}
//                     <CustomButton
//                         padding="15px"
//                         type="submit"
//                         className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[120%] mx-auto w-[100%] !mb-12 xl:my-12 xl:mb-20"
//                         disabled={isLoading}
//                     >
//                       {isLoading ? 'Logging in...' : 'Log in'}
//                     </CustomButton>
//                   </div>
//                 </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//   );
// };
//
// LoginForm.defaultProps = {
//   next: () => {},
// };
//
// export default LoginForm;


// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import CustomButton from '../../../components/button/button';
// import { LoginSchema } from '../schemas/schema';
// import { useNavigate } from 'react-router-dom';
// import { images } from '../../../constants';
// import { useState } from 'react';
//
// const LoginForm = ({ next }) => {
//   const [loginDetails, setLoginDetails] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//
//   const handleSubmit = async (values) => {
//     setIsLoading(true);
//     localStorage.setItem('userEmail', values.email);
//
//     setLoginDetails(values);
//
//     const requestData = {
//       email: values.email,
//       password: values.password,
//     };
//
//     console.log(requestData);
//
//     const endpoint = import.meta.env.VITE_LOGIN_USER_ENDPOINT;
//     if (!endpoint) {
//       console.error('Login endpoint is not defined');
//       setIsLoading(false);
//       return;
//     }
//
//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       });
//
//       if (response.ok) {
//         const result = await response.json();
//         const token = result?.data;
//         if (token) {
//           localStorage.setItem('authToken', token);
//           console.log('Log in successful:', token);
//           const signupStep = localStorage.getItem('signupStep');
//           const totalSteps = 17; // assuming you have 17 steps in total
//
//           if (signupStep && parseInt(signupStep) < totalSteps) {
//             // If signup is incomplete, redirect to the last step the user was on
//             navigate('/signup');
//           } else {
//             // If signup is complete, proceed to the dashboard
//             navigate('/account/dashboard');
//           }
//           next(); // Invoke the next callback if provided
//         } else {
//           console.error('Login failed: Invalid token structure');
//         }
//       } else {
//         console.error('Failed to log in:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       // Optionally, you can show a user-friendly error message here
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return (
//       <div className="md:w-[40%] mx-10 md:mx-auto md:py-10">
//         <div className="text-center mt-20 xl:mt-0 text-primary font-extrabold xl:text-5xl text-2xl py-10">
//           Login to Payina
//         </div>
//         <div className="hidden md:block absolute md:top-[-13.6rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-38.5rem]">
//           <img src={images.Group} alt="" />
//         </div>
//         <div className="bg-primary flex flex-col justify-center items-start mx-auto py-6">
//           <Formik
//               initialValues={{ email: '', password: '' }}
//               validationSchema={LoginSchema}
//               onSubmit={handleSubmit}>
//             {() => (
//                 <Form className="w-full space-y-4">
//                   <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
//                     <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl">
//                       Login
//                     </div>
//                     <div className="xl:w-[120%] flex flex-col space-y-2 ">
//                       <label htmlFor="email" className="text-sm font-normal text-lightBlue">
//                         Email Address
//                       </label>
//                       <Field
//                           name="email"
//                           type="email"
//                           placeholder="Enter Email Address"
//                           className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                       />
//                       <ErrorMessage name="email" component="span" className="text-[#db3a3a]" />
//                     </div>
//                     <div className="xl:w-[120%] flex flex-col space-y-2 ">
//                       <label htmlFor="password" className="text-sm font-normal text-lightBlue">
//                         Password
//                       </label>
//                       <Field
//                           name="password"
//                           type="password"
//                           placeholder="Enter Password"
//                           className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                       />
//                       <ErrorMessage name="password" component="span" className="text-[#db3a3a]" />
//                     </div>
//                     <CustomButton
//                         padding="15px"
//                         type="submit"
//                         className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[120%] mx-auto w-[100%] !mb-12 xl:my-12 xl:mb-20"
//                         disabled={isLoading}
//                     >
//                       {isLoading ? 'Logging in...' : 'Log in'}
//                     </CustomButton>
//                   </div>
//                 </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//   );
// };
//
// LoginForm.defaultProps = {
//   next: () => {},
// };
//
// export default LoginForm;


// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import CustomButton from '../../../components/button/button';
// import { LoginSchema } from '../schemas/schema';
// import { useNavigate } from 'react-router-dom';
// import { images } from '../../../constants';
// import { useState } from 'react';
//
// const LoginForm = ({ next }) => {
//   const [loginDetails, setLoginDetails] = useState();
//   const navigate = useNavigate()
//
//   const handleSubmit = async (values) => {
//     localStorage.setItem('userEmail', values.email);
//
//     setLoginDetails(values);
//
//     const requestData = {
//       email: values.email,
//       password: values.password
//     };
// console.log (requestData)
//     try {
//       const response = await fetch(import.meta.env.VITE_LOGIN_USER_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//         });
//
//       if (response.ok) {
//         const result = await response.json();
//         const token = result.data;
//         localStorage.setItem('authToken', token);
//         console.log('Log in successful:', token);
//         const signupStep = localStorage.getItem('signupStep');
//         const totalSteps = 17; // assuming you have 17 steps in total
//
//         if (signupStep && parseInt(signupStep) < totalSteps) {
//           // If signup is incomplete, redirect to the last step the user was on
//           navigate('/signup');
//         } else {
//           // If signup is complete, proceed to the dashboard
//           navigate('/account/dashboard');
//         }
//       } else {
//         console.error('Failed to log in:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//   }
//   };
//
//   return (
//     <div className="md:w-[40%] mx-10 md:mx-auto md:py-10">
//       <div className="text-center mt-20 xl:mt-0 text-primary font-extrabold xl:text-5xl text-2xl py-10">
//         Login to Payina
//       </div>
//       <div className="hidden md:block absolute md:top-[-13.6rem] md:right-[1rem] xl:top-[-12.5rem] xl:right-[-38.5rem]">
//         <img src={images.Group} alt="" />
//       </div>
//       <div className="bg-primary flex flex-col justify-center items-start mx-auto py-6">
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={LoginSchema}
//           onSubmit={handleSubmit}>
//           {() => (
//             <Form className="w-full space-y-4">
//               <div className="xl:py-16 p-4 pt-[2.2rem] xl:p-10 xl:pl-[5rem] xl:pr-40 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
//                 <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl">
//                   Login
//                 </div>
//                 <div className="xl:w-[120%] flex flex-col space-y-2 ">
//                   <label htmlFor="email" className="text-sm font-normal text-lightBlue">
//                     Email Address
//                   </label>
//                   <Field
//                     name="email"
//                     type="email"
//                     placeholder="Enter Email Address"
//                     className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                   />
//                   <ErrorMessage name="email" component="span" className="text-[#db3a3a]" />
//                 </div>
//                 <div className="xl:w-[120%] flex flex-col space-y-2 ">
//                   <label htmlFor="password" className="text-sm font-normal text-lightBlue">
//                     Password
//                   </label>
//                   <Field
//                     name="password"
//                     type="password"
//                     placeholder="Enter Password"
//                     className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-light text-base text-gray rounded-[5px] py-2 px-[10px]"
//                   />
//                   <ErrorMessage name="password" component="span" className="text-[#db3a3a]" />
//                 </div>
//                 <CustomButton
//                 padding="15px"
//                 type="submit"
//                 children="Log in"
//                 className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-[120%] mx-auto w-[100%] !mb-12 xl:my-12 xl:mb-20"
//               />
//               </div>
//
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };
//
// LoginForm.defaultProps = {
//   next: () => {},
// };
// export default LoginForm;
