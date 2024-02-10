import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "../../../components/button/button";

// Validation schema using Yup
const StepThirteenValidationSchema = Yup.object().shape({
  emailAddress: Yup.string().email("Invalid email address").required("Email address is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits")
    .required("Phone number is required"),
});

export const StepThirteen = ({ next }) => {
  const handleSubmit = (values) => {
    next(values);
  };

  return (
    <div className="p-2 xl:p-10 bg-primary">
      <div className="xl:text-[32px] text-xl text-lightBlue text-start font-bold pr-0 xl:pr-20 ">Provide Signatories Details</div> 
      <Formik
        initialValues={{
          emailAddress: "",
          phoneNumber: "",
        }}
        validationSchema={StepThirteenValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form className="">
            <div className="my-4">
              <label htmlFor="emailAddress" className="text-white block mb-2">
                Email Address
              </label>
              <Field
                type="text"
                id="emailAddress"
                name="emailAddress"
                placeholder="Enter your email address"
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[10px] py-2 px-[10px]"
              />
              <ErrorMessage name="emailAddress" component="div" className="text-[#db3a3a] mt-2" />
            </div>

            <div className="my-4">
              <label htmlFor="phoneNumber" className="text-white block mb-2">
                Phone Number
              </label>
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[10px] py-2 px-[10px]"
              />
              <ErrorMessage name="phoneNumber" component="div" className="text-[#db3a3a] mt-2" />
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
