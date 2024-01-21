import { Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';

export const StepSeven = ({ next }) => {
  const handleSubmit = (values) => {
    next(values);
  };
  return (
    <>
      <div className="p-2 xl:p-10 bg-primary">
        Congratulation Step
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
