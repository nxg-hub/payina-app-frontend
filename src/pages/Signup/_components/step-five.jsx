import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';

const StepFiveValidationSchema = Yup.object().shape({
  fullname: Yup.string().required('Fullname is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  gender: Yup.string().required('Gender is required'),
  username: Yup.string().required('Username is required'),
});

export const StepFive = ({ next }) => {
  const handleSubmit = (values) => {
    next(values);
  };

  return (
    <div className="p-2 xl:p-[74px] bg-primary">
      <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl mt-4 pt-[64px] leading-[40px]">
        Kindly Confirm Personal Details
      </div>
      <Formik
        initialValues={{
          fullname: '',
          dateOfBirth: '',
          gender: '',
          username: '',
        }}
        validationSchema={StepFiveValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form className="mt-8">
            <div className="my-2">
              <label htmlFor="fullname" className="text-secondary block mb-4 w-full text-sm ">
                Fullname
              </label>
              <Field
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter Your fullname"
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none   text-gray rounded-[5px] py-2 px-[10px] "
              />
              <ErrorMessage name="fullname" component="div" className="text-[#db3a3a] mt-2 text-sm " />
            </div>

            <div className="my-2">
              <label htmlFor="dateOfBirth" className="text-secondary  block mb-2 w-full text-sm ">
                Date of Birth
              </label>
              <Field
                type="text" // You can use "text" or any other suitable input type
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="Enter Your date of birth"
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none   text-gray rounded-[5px] py-2 px-[10px] "
              />
              <ErrorMessage name="dateOfBirth" component="div" className="text-[#db3a3a] mt-2 text-sm " />
            </div>

            <div className="my-4">
              <label htmlFor="gender" className="block mb-2 w-full text-secondary text-sm  ">
                Gender
              </label>
              {/* You can use a different input type, like radio buttons or text input */}
              <Field
                type="text"
                id="gender"
                name="gender"
                placeholder="Enter Your gender"
                className=" text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none    text-gray rounded-[5px] py-2 px-[10px] "
              />
              <ErrorMessage name="gender" component="div" className="text-[#db3a3a] mt-2 text-sm " />
            </div>

            <div className="my-4">
              <label htmlFor="username" className="text-secondary block mb-2 w-full text-sm  ">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter Your username"
                className="text-gray w-full h-[3.4rem] border border-[#9ca3af] outline-none    text-gray rounded-[5px] py-2 px-[10px] "
              />
              <ErrorMessage name="username" component="div" className="text-[#db3a3a] mt-2 text-sm " />
            </div>

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
  );
};
