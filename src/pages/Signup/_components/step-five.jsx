import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { useState } from 'react';
import { images } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { previousStep } from '../../../Redux/BusinessSignUpSlice';

const StepFiveValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
});
export const StepFive = ({ next, bvnData, ninData, datas, initialValues }) => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem('userEmail');
  let manualEntry = useSelector((state) => state.businessSignUp.manualEntry);

  const dispatch = useDispatch();

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const SAVE_USERNAME = import.meta.env.VITE_SAVE_USERNAME_ENDPOINT;

  const extractData = () => {
    return {
      gender: bvnData?.gender || ninData?.gender || initialValues?.gender,
      firstName: ninData?.firstname || bvnData?.firstname || initialValues?.firstname,
      lastName: bvnData?.lastname || ninData?.lastname || initialValues?.lastname,
      dob: bvnData?.dob || ninData?.dob || initialValues?.dob,
    };
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setApiError('');

    try {
      const response = await fetch(`${SAVE_USERNAME}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payinaUserName: values.username,
          // gender: bvnData.gender || ninData.gender,
          // email: userEmail,
          // firstName: bvnData.firstname || ninData.firstname,
          // lastName: bvnData.lastname || ninData.lastname,
          // dob: bvnData.dob || ninData.dob,
          gender: values.gender || bvnData.gender || ninData.gender,
          email: userEmail,
          firstName: values.firstName || bvnData.firstname || ninData.firstname,
          lastName: values.lastName || bvnData.lastname || ninData.lastname,
          dob: values.dob || bvnData.dob || ninData.dob,
          bvn: datas?.bvnData.bvn,
          nin: datas?.ninData.nin,
          accountType: 'corporate',
          bvnverificationStatus: 'VERIFIED',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        next(values);
      } else {
        setApiError(data.debugMessage || 'Failed to save username. Please try again.');
      }
    } catch (error) {
      setApiError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  localStorage.setItem('currentStep', 5);

  const extractedData = extractData();

  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src={images.Vector3}
        alt="Background Design"
        className="absolute top-0 right-[32rem] w-24 h-24"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[8rem] right-[41rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[8rem] right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[3rem] right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[4rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[6rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[7rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[600px]">
        <div className="text-lightBlue text-start font-bold xl:text-[32px] text-nowrap text-xl mt-4 pt-[64px] leading-[40px]">
          Kindly Confirm Personal Details
        </div>
        <Formik
          initialValues={{
            username: '',
            firstName: extractedData.firstName || '',
            lastName: extractedData.lastName || '' ,
            gender: extractedData.gender || '',
            dob: extractedData.dob || '',
          }}
          validationSchema={StepFiveValidationSchema}
          onSubmit={(values) => handleSubmit(values)}>
          {({ isValid, dirty }) => (
            <Form className="mt-8">
              <div className="my-2">
                <label htmlFor="firstname" className="text-secondary block mb-4 w-full text-sm">
                  First Name
                </label>
                <Field
                  type="text"
                  id="firstname"
                  name="firstName"
                  readOnly={manualEntry ? false : true}
                  className=" w-full h-[3.4rem] border border-[#9ca3af] outline-none text-start text-gray rounded-[5px] py-2 px-[10px]"
                />
              </div>

              <div className="my-2">
                <label htmlFor="lastname" className="text-secondary block mb-4 w-full text-sm">
                  Last Name
                </label>
                <Field
                  type="text"
                  id="lastname"
                  name="lastName"
                  readOnly={manualEntry ? false : true}
                  className="w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
                />
              </div>

              <div className="my-2">
                <label htmlFor="gender" className="text-secondary block mb-4 w-full text-sm">
                  Gender
                </label>
                <Field
                  type="text"
                  id="gender"
                  name="gender"
                  value={bvnData.gender || ninData.gender}
                  readOnly={manualEntry ? false : true}
                  className=" w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
                />
              </div>

              <div className="my-2">
                <label htmlFor="dob" className="text-secondary block mb-4 w-full text-sm">
                  Date of Birth
                </label>
                <Field
                  type={manualEntry ? 'date' : 'text'}
                  id="dob"
                  name="dob"
                  value={bvnData.dob || ninData.dob}
                  readOnly={manualEntry ? false : true}
                  className="w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
                />
              </div>

              <div className="my-4">
                <label htmlFor="username" className="text-secondary block mb-2 w-full text-sm">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter Your Username"
                  className="w-full lg:w-[500px] h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-[#db3a3a] mt-2 text-sm"
                />
              </div>

              {apiError && <div className="text-red-500 mb-4">{apiError}</div>}
              <div className="flex gap-2">
                <button
                  disabled={loading}
                  onClick={handlePrevious}
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8">
                  Back
                </button>
                <CustomButton
                  padding="15px"
                  type="submit"
                  children={loading ? 'Saving...' : 'Next'}
                  className={`hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8 ${
                    !(isValid && dirty) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!(isValid && dirty) || loading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
