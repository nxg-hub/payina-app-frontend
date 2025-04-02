import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../../Redux/PersonalSignUpSlice';

export const StepSeventeen = () => {
  let manualEntry = useSelector((state) => state.personalSignUp.manualEntry);
  const [userData, setUserData] = useState(null);
  const userEmail = localStorage.getItem('userEmail');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) {
        setError('Email is required.');
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_GET_USER_BY_EMAIL_ENDPOINT}?email=${encodeURIComponent(userEmail)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userDataResponse = await response.json();
        setUserData(userDataResponse);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleClick = () => {
    dispatch(resetState());

    navigate('/login');
  };
  // const handleClick = () => {
  //   if (newAuthToken) {
  //     navigate('/account/dashboard');
  //   } else {
  //     navigate('/login');
  //   }
  // }
  //   const token = localStorage.getItem('authToken');
  // console.log (token)
  //   const handleClick = (values, token) => {
  //       if (location.pathname.includes('/personal/signup')) {
  //         navigate('/personal/dashboard');
  //       }
  //       // next(values);
  //       dispatch(resetState());
  //     };

  // const handleClick = (values, token) => {
  //   if (!token) {
  //     console.error('No token found. Redirecting to login.');
  //     navigate('/login'); // Redirect to login if token is missing
  //     return;
  //   }

  //   if (location.pathname.includes('/personal/signup')) {
  //     navigate('/personal/dashboard'); // Navigate to the dashboard
  //   }

  //   dispatch(resetState());
  // };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

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
        className="absolute bottom-[3rem] right-[41rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[3rem] right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[0.3rem] right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[1rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[2rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[2rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 lg:px-6 lg:mb-5 lg:mt-0 !mt-10 rounded-[10px] bg-lightBlue flex flex-col w-auto lg:w-[843px]">
        <div className="flex flex-col xl:w-[50%] text-center mx-auto space-y-2">
          <span className="text-[24px] lg:text-[32px] font-bold">Congrats Champ!</span>
          <span className="lg:text-2xl text-center text-yellow font-bold">
            You have successfully set up your Payina Personal account.
          </span>
          <span className="lg:text-2xl text-center text-yellow font-bold">
            Here are your details
          </span>
        </div>
        <div className="mt-12 xl:mt-8">
          <div className="flex flex-col w-3/4 px-11 md:px-0 text-center mx-auto space-y-12">
            <div className="w-full relative">
              <img
                src={images.Rectangle}
                className="bg-black h-[70px] md:h-[166px] z-50 w-full md:mt-0 mt-[-0.3rem]"
                alt=""
              />
              <img
                src={images.CircleBlack}
                className="w-[100px] md:w-[202px] rounded-[50%] absolute top-[-1.5rem] left-[-5rem] contrast-[3.5]"
                alt=""
              />
              <img
                src={images.CircleBlack}
                className="w-[100px] md:w-[202px] rounded-[50%] absolute top-[-1.5rem] right-[-5rem] contrast-[3.5]"
                alt=""
              />
              <div className="w-full text-primary absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex flex-col md:space-y-4">
                <span className="md:text-2xl text-xs font-medium">Payina Account Number</span>
                <span className="md:text-3xl text-sm font-bold">
                  {userData?.accountNumber || 'N/A'}
                </span>
              </div>
            </div>
            {!manualEntry && (
              <div className="w-full relative">
                <img
                  src={images.Rectangle}
                  className="bg-black h-[70px] md:h-[166px] z-50 w-full"
                  alt=""
                />
                <img
                  src={images.CircleBlack}
                  className="w-[100px] md:w-[202px] rounded-[50%] absolute top-[-1rem] left-[-5rem] contrast-[3.5]"
                  alt=""
                />
                <img
                  src={images.CircleBlack}
                  className="w-[100px] md:w-[202px] rounded-[50%] absolute top-[-1rem] right-[-5rem] contrast-[3.5]"
                  alt=""
                />
                (
                <div className="w-full text-primary absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex flex-col md:space-y-4">
                  <span className="md:text-2xl text-xs font-medium">Account Owner Name</span>
                  <span className="md:text-3xl text-sm font-bold">
                    {userData ? `${userData.firstName} ${userData.lastName}` : 'N/A'}
                  </span>
                </div>
                )
              </div>
            )}
          </div>
          <CustomButton
            // onClick={() => handleClick({}, token)}
            onClick={handleClick}
            padding="15px"
            type="submit"
            children="Proceed to Log in"
            className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8"
          />
        </div>
      </div>
    </div>
  );
};

export default StepSeventeen;
