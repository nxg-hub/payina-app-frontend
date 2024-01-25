import { Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
import Select from 'react-select';

export const StepFour = ({ next }) => {
  const handleSubmit = (values) => {
    next(values);
  };

  const Options = [
    { value: "BVN", label: "BVN" },
    { value: "National ID", label: "National ID" },
    { value: "Drivers License", label: "Drivers License" },
    { value: "International Passport", label: "International Passport" },
    { value: "Voters Card", label: "Voters Card" },
  ];
  // Define custom styles for the Select component
  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: '10px 20px', // Adjust the padding as needed
      backgroundColor:"#00678F"
    }),
    menu: (provided) => ({
      ...provided,
      padding: '0px', // Set padding for the menu (options)
    }),
    option: (provided) => ({
      ...provided,
      padding: '20px', // Set padding for each option
      backgroundColor:"#00678F",
      color: "white", 
      display: 'flex',

      borderBottom: '1px solid ', 
    }),
     placeholder: (provided) => ({
      ...provided,
      color: "white", // Set placeholder text color
    }),
  };

  return (
    <div className="p-2 xl:p-10 bg-primary">
      <div className='leading-[38px]'>
      <h1 className='text-[32px] font-bold text-secondary'>Kindly Provide Identification</h1>
      <p>How would you like us to identify you?</p>
      </div>
     
      <div className="">
        <div className="">
          <Formik
            initialValues={{
              idType: "",
              identificationNumber: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.idType) {
                errors.idType = "Please select an ID type";
              }
              if (!/^\d+$/.test(values.identificationNumber)) {
                errors.identificationNumber = "Please enter a valid identification number (numeric)";
              }
              return errors;
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleChange, values, isValid, dirty }) => (
              <Form className="mt-[30px]">
                <Select
                className=''
                  options={Options}
                  name="idType"
                  placeholder="Select ID Type"
                  onChange={(selectedOption) => {
                    handleChange("idType")(selectedOption.value);
                  
                  }}
                  styles={customStyles} // Apply custom styles
                />

                <div className="my-[40px] ">
                  <input
                  className='w-full px-[27px] py-[16px] border-[0.5px] border-[#006181]  rounded-md '
                    type="text"
                    placeholder="Enter Identification Number"
                    name="identificationNumber"
                    value={values.identificationNumber}
                    onChange={handleChange("identificationNumber")}
                    required
                  />
                </div>

                <CustomButton
                  padding="15px"
                  type="submit"
                  children="Next"
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
