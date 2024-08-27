import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/button/button';
import { useState } from 'react';


const StepFourValidationSchema = Yup.object().shape({
  idType: Yup.string().required('Please select an ID type'),
  identificationNumber: Yup.string()
    .required('Please enter an identification number')
    .matches(/^\d+$/, 'Please enter a valid identification number (numeric)'),
});

export const StepFour = ({ next }) => {
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const requestBody = JSON.stringify({ bvn: values.identificationNumber });
    // console.log('Request Body:', requestBody);
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_BVN_VERIFY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      const data = await response.json();
      if (response.ok) {
        next({
          ...values,
          firstName: data.firstName, 
          lastName: data.lastName,
          gender: data.gender,
          dob: data.dob,
        });
        } else {
        setApiError(data.message || 'Verification failed. Please try again.');
      }
    } catch (error) {
      setApiError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  localStorage.setItem('currentStep', 4);

  const Options = [
    { value: "BVN", label: "BVN" },
    // { value: "National ID", label: "National ID" },
    // { value: "Drivers License", label: "Drivers License" },
    // { value: "International Passport", label: "International Passport" },
    // { value: "Voters Card", label: "Voters Card" },
  ];

  const optionStyle = {
    padding: '0.75rem',
    height: '',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid white',
  };

  return (
    <div className="p-2 xl:p-10 bg-primary">
      <div className='leading-[38px]'>
        <h1 className='text-secondary text-start  xl:text-[32px] text-xl'>Kindly Provide Identification</h1>
        <p>How would you like us to identify you?</p>
      </div>
     
      <div className="">
        <div className="">
          <Formik
            initialValues={{
              idType: "",
              identificationNumber: "",
            }}
            validationSchema={StepFourValidationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleChange, values, isValid, dirty }) => (
              <Form className="mt-[30px]">
                <div className="my-4">
                  <label htmlFor="idType" className="text-white block mb-2">
                  </label>
                  <Field
                    as="select"
                    id="idType"
                    name="idType"
                    onChange={handleChange}
                    value={values.idType}
                    className="w-full px-[27px] py-[16px] border-[0.5px] border-[#00678F] rounded-md text-primary  bg-secondary "
                  >
                    <option value="" disabled>Select ID Type</option>
                    {Options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        style={{ ...optionStyle }}
                      >
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="idType" component="div" className="text-[#db3a3a] mt-2" />
                </div>
                <div className="my-8">
                  <label htmlFor="identificationNumber" className="text-white block mb-2">
                  </label>
                  <Field
                    type="text"
                    id="identificationNumber"
                    name="identificationNumber"
                    placeholder="Enter Identification Number"
                    className='w-full px-[27px] py-[16px] border-[0.5px] border-[#00678F] rounded-md'
                    required
                  />
                  <ErrorMessage
                    name="identificationNumber"
                    component="div"
                    className="text-[#db3a3a] mt-2"
                  />
                </div>

                {apiError && <div className="text-red-500 mb-4">{apiError}</div>}
                
                <CustomButton
                  padding="15px"
                  type="submit"
                  children={loading ? 'Loading...' : 'Next'}
                  className={`hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 xl:w-full w-[90%] mx-auto my-10 !mb-12 xl:mt-12 xl:!mb-6 ${
                    !(isValid && dirty) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!(isValid && dirty)}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
