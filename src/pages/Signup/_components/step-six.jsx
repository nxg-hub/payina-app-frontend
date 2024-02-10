// Import necessary components and libraries
import { Form, Formik } from "formik";
import CustomButton from "../../../components/button/button";
import  Facialrecognition  from "./../schemas/Facialrecognition"; // Import the Facialrecognition component

// Define the StepSix component
export const StepSix = ({ next }) => {
  const handleSubmit = (values, actions) => {
    // Handle form submission here, including facial recognition data
    console.log('Form data:', values);
    next(values);
  };

  return (
    <div className="p-2 xl:p-10 bg-primary">
      <h1 className='text-lightBlue text-start  xl:text-[32px] text-xl font-bold pb-4 w-[85%]'>Let’s Get Your Facial Profile!</h1>
      <p className="w-[84%]">Make sure all parts of your face are well lit. Ensure all parts of your face are visible and not covered by objects</p>
      <Formik
        initialValues={{}} // Add initial values for other form fields if needed
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-8">
            {/* Include the Facialrecognition component */}
            <Facialrecognition />

            {/* Add other form fields here if needed */}
            <CustomButton
              padding="15px"
              type="submit"
              children="Next"
              className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
