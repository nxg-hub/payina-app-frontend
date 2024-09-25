import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';

export const StepSeventeen = ({ data }) => {
  const [business_name, setBusinessName] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/account/dashboard');
  };
  useEffect(() => {
    setBusinessName(data?.business_details?.business_name);
  }, [data]);
  return (
    <>
      <div className="hidden xl:block fixed top-[-1rem] right-[-32rem]">
        <img src={images.Group} alt="" />
      </div>
      <div className="hidden md:block fixed top-[-1rem] right-[-2.5rem] -z-10">
        <img src={images.Vector3} alt="" />
      </div>
      <div className="hidden md:block fixed top-[.2rem] left-[-25rem] -z-10">
        <img src={images.Vector2} alt="" />
      </div>
      <div className="hidden md:block fixed top-[22rem] left-[-30rem] -z-10">
        <img src={images.Vector7} alt="" />
      </div>
      <div className="hidden md:block fixed top-[36rem] left-[-14rem] -z-10">
        <img src={images.Vector7} alt="" />
      </div>
      <div className="hidden md:block fixed top-[.5rem] left-[-30rem] -z-10">
        <img src={images.Vector1} alt="" />
      </div>
      <div className="hidden md:block fixed top-[36rem] right-[-28.5rem] -z-10">
        <img src={images.Vector2} alt="" />
      </div>
      <div className="hidden md:block fixed top-[43rem] right-[-27.4rem] -z-10">
        <img src={images.Vector5} alt="" />
      </div>
      <div className="hidden md:block fixed top-[41rem] right-[-25.5rem] -z-10">
        <img src={images.Vector4} alt="" />
      </div>
      <div className="hidden md:block fixed top-[32rem] right-[-21.6rem] -z-10">
        <img src={images.Vector6} alt="" />
      </div>
      <div className="xl:px-6 xl:mt-0 !mt-10 rounded-[10px] bg-lightBlue flex flex-col w-auto xl:w-[843px]">
        <div className="flex flex-col xl:w-[50%] text-center mx-auto space-y-2">
          <span className="text-[24px] md:text-[32px] font-bold">Congrats Champ!</span>
          <span className="md:text-2xl text-base text-yellow font-bold">
            You have successfully set up your Payina Business account <br /> Here are your details
          </span>
        </div>
        <div className="mt-12 xl:mt-8">
          <div className=" flex flex-col w-3/4 px-11 md:px-0 text-center mx-auto space-y-12">
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
                <span className="md:text-3xl text-sm font-bold">3434556676</span>
              </div>
            </div>
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
              <div className="w-full text-primary absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex flex-col md:space-y-4">
                <span className="md:text-2xl text-xs font-medium">Business Owner Name</span>
                <span className="md:text-3xl text-sm font-bold">Jacob Yakub</span>
              </div>
            </div>
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
              <div className="w-full text-primary absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex flex-col md:space-y-4">
                <span className="md:text-2xl text-xs font-medium">Business Name</span>
                <span className="md:text-3xl text-sm font-bold capitalize">{business_name} </span>
              </div>
            </div>
          </div>
          <CustomButton
            onClick={handleClick}
            padding="15px"
            type="submit"
            children="Proceed to Dashboard"
            className="hover:cursor-pointer flex justify-center items-center !text-[#002A4D] xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 md:w-[334px] xl:w-[434px] w-[90%] mx-auto my-6 xl:mt-6 "
          />
        </div>
      </div>
    </>
  );
};
