import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "../../../components/button/button";

// Validation schema using Yup
const StepTwelveValidationSchema = Yup.object().shape({
  numberOfSignatories: Yup.number()
    .required("Number of signatories is required")
    .min(1, "Number of signatories must be at least 1")
    .integer("Number of signatories must be an integer"),
});

export const StepTwelve = ({ next }) => {
  const handleSubmit = (values) => {
    next(values);
  };

  // Generate options for the number of signatories
  const generateSignatoriesOptions = () => {
    const options = [
      { label: 'Select number of signatories', value: '', disabled: true }, // Disabled default option
    ];

    for (let i = 1; i <= 10; i++) {
      options.push({ label: `${i}`, value: i });
    }

    return options;
  };

  return (
    <>
      <div className="p-2 xl:p-10 bg-primary !mt-24 xl:mt-0 mx-auto ">
        <Formik
          initialValues={{
            numberOfSignatories: '', // Set default value to an empty string
          }}
          validationSchema={StepTwelveValidationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {() => (
            <Form className="">
              <div className="my-4">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl mb-6 pr-0 xl:pr-20">
                  Business Signatories
                </div>
                <label htmlFor="numberOfSignatories" className=" block mb-2">
                  Number of Signatories
                </label>
                <Field
                  as="select"
                  id="numberOfSignatories"
                  name="numberOfSignatories"
                  placeholder="Select Numbers of Signatories"
                  className="w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-primary rounded-[5px] py-2 px-[10px] bg-[#00678F]"
                >
                  {generateSignatoriesOptions().map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="numberOfSignatories"
                  component="div"
                  className="text-[#db3a3a] mt-2"
                />
              </div>

              <CustomButton
                padding="15px"
                type="submit"
                children="Next"
                className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-full mx-auto my-10 !mb-12 xl:mt-6 xl:!mb-6"
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
