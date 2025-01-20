import { Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';

export const StepSeven = ({ next, text }) => {
  const handleSubmit = (values) => {
    next(values);
  };
  localStorage.setItem('currentStep', 7);
    return (
      <div className="relative bg-black min-h-screen flex items-center justify-center">
        <img
          src={images.Vector3}
          alt="Background Design"
          className="absolute top-0 lg:right-[32rem] right-[40rem] w-24 h-24"
        />
        <img
          src={images.Vector2}
          alt="Background Design"
          className="absolute lg:top-[26rem] top-[41rem] left-[47rem] lg:left-[30rem] w-20 h-20"
        />
        <img
          src={images.Vector1}
          alt="Background Design"
          className="absolute lg:top-[26rem] top-[24rem] left-[45rem] lg:left-[28rem] w-20 h-20"
        />
        <img
          src={images.Vector2}
          alt="Background Design"
          className="absolute lg:top-[30rem] top-[28rem] left-[60rem] lg:left-[50rem] w-[100px] h-[100px]"
        />
        <img
          src={images.Vector5}
          alt="Background Design"
          className="absolute lg:top-[35rem] top-[33rem] left-[65rem] lg:left-[55rem] w-3 h-3"
        />
        <img
          src={images.Vector4}
          alt="Background Design"
          className="absolute lg:top-[34rem] top-[31.5rem] left-[61rem] lg:left-[51rem] w-15 h-15"
        />
        <img
          src={images.Vector6}
          alt="Background Design"
          className="absolute lg:top-[28rem] top-[25rem] left-[61rem] lg:left-[51rem] w-20 h-20"
        />
        <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[500px]">
          <div className="text-center">
            <p className="text-[32px] font-bold text-secondary pr-0 xl:px-20">Congratulation!  </p>
            <p className="pt-[20px]">{text}</p>
          </div>
          <Formik initialValues={{}} onSubmit={(values) => handleSubmit(values)}>
            {() => (
              <Form className="">
                <CustomButton
                  padding="15px"
                  type="submit"
                  children="Next"
                  className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-7/5 mx-auto my-8"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };
  


