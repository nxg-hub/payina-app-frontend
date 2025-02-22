import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { fetchDataSuccess } from '../../../../Redux/UserSlice';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { useDispatch } from 'react-redux';

const BVNValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
});
export const BvnConfirmModal = ({ next, bvnData, ninData, onClose }) => {
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const userEmail = localStorage.getItem('userEmail');
  const bvn = localStorage.getItem('bvn');
  const [newAuthToken] = useLocalStorage('authToken', '');

  const handleSubmit = async (values) => {
    setLoading(true);
    setApiError('');

    try {
      const response = await fetch(import.meta.env.VITE_SAVE_EMPLOYEE_USERNAME_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payinaUserName: values.username,
          gender: bvnData.gender || ninData.gender,
          email: userEmail,
          firstName: bvnData.firstname || ninData.firstname,
          lastName: bvnData.lastname || ninData.lastname,
          dob: bvnData.dob || ninData.dob,
          bvn: bvn,
          accountType: 'personal',
          bvnverificationStatus: 'VERIFIED',
        }),
      });
      // console.log('bvn:', values.identificationNumber);
      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem('bvn');
        setSuccessMessage('Details Updated!');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2000);
        // Fetch the updated user details
        const response = await fetch(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        const data = await response.json();

        //storing the user details in the userSlice using the redux store
        dispatch(fetchDataSuccess(data));
      } else {
        setApiError(data.debugMessage || 'Failed to save username. Please try again.');
      }
    } catch (error) {
      setApiError('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  localStorage.setItem('currentStep', 5);

  return (
    <div className="fixed inset-0 flex items-center justify-center border-2 border-[#a0a0a0] bg-black bg-opacity-40 overflow-y-auto p-3">
      <div className="bg-white p-11 rounded shadow-lg w-[500px] max-h-[90%] overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-2">
          X
        </button>

        <div className="text-lightBlue text-start font-bold xl:text-[32px] text-nowrap text-xl mt-4 pt-[64px] leading-[40px]">
          Kindly Confirm Personal Details
        </div>
        <Formik
          initialValues={{
            username: '',
          }}
          validationSchema={BVNValidationSchema}
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
                  name="firstname"
                  value={bvnData.firstname}
                  readOnly
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
                  name="lastname"
                  value={bvnData.lastname}
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
                  value={bvnData.gender}
                  readOnly
                  className=" w-full h-[3.4rem] border border-[#9ca3af] outline-none text-gray rounded-[5px] py-2 px-[10px]"
                />
              </div>

              <div className="my-2">
                <label htmlFor="dob" className="text-secondary block mb-4 w-full text-sm">
                  Date of Birth
                </label>
                <Field
                  type="text"
                  id="dob"
                  name="dob"
                  value={bvnData.dob}
                  readOnly
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
              {successMessage && (
                <div className="item-added-box border border-blue-100 bg-blue-100 rounded-lg p-4 mt-4 text-blue-700 max-w-md mx-auto shadow-md">
                  <p className="mt-2 text-lightBlue font-bold">{successMessage}</p>
                </div>
              )}

              {apiError && <div className="text-red-500 mb-4">{apiError}</div>}
              <div className="flex gap-2">
                <button
                  padding="15px"
                  type="submit"
                  children={loading ? 'Saving...' : 'Save'}
                  className={`hover:cursor-pointer flex justify-center items-center !text-white text-lg !border-none !bg-lightBlue font-extrabold duration-300 w-2/5 mx-auto py-2 rounded-md my-8 ${
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
