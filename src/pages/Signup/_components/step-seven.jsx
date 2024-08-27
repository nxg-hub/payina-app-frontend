import { Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';

export const StepSeven = ({ next, text }) => {
  const handleSubmit = (values) => {
    next(values);
  };
  localStorage.setItem('currentStep', 7);

  return (
    <>
      <div className="p-2 xl:p-10  bg-primary text-center w-full ">
        <div className=''>
        <p className='text-[32px] font-bold text-secondary pr-0 xl:px-20'>Congratulation! </p> 
        <p className='pt-[20px]'>Your Identity Has been Verified!</p>
        </div>
    
        <Formik initialValues={{}} onSubmit={(values) => handleSubmit(values)}>
          {() => (
            <Form className="">
              <CustomButton
                padding="15px"
                type="submit"
                children="Next"
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
