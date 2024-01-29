import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomButton from "../../../components/button/button";
import { images } from "../../../constants";
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { ProofOfResidence } from "../schemas/schema";


export const StepNine = ({ next }) => {
    const [document_details, setDocumentDetails] = useState('');
  
    const handleSubmit = (document_type) => {
      next({ document_details, document_type });
    };
    const selectArrow = `
      select{
        -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
        border: 1px solid #CCC;
        border-radius: 4px;
        padding-right: 1rem;
        margin-right: 3rem;
        background-position: calc(100% - 1rem);
        background-image: url(/dropdown-arrow.svg);
        background-repeat: no-repeat;
      }
  
      input[type='file'] {
        opacity: 0;
        width: 0.1px;
        height: 0.1px;
        position: absolute;
      }
     
      `;
  
    return (
      <>
        <div className="hidden xl:block fixed top-[-12.5rem] right-[-37.5rem]">
          <img src={images.Group} alt="" />
        </div>
        <div className="hidden md:block fixed top-[-1.5rem] right-[8.5rem] -z-10">
          <img src={images.Vector3} alt="" />
        </div>
        <div className="hidden md:block fixed top-[12.5rem] right-[20rem] -z-10">
          <img src={images.Vector2} alt="" />
        </div>
        <div className="hidden md:block fixed top-[14.6rem] right-[24rem] -z-10">
          <img src={images.Vector1} alt="" />
        </div>
        <div className="hidden md:block fixed top-[30rem] right-[6.5rem] -z-10">
          <img src={images.Vector2} alt="" />
        </div>
        <div className="hidden md:block fixed top-[35rem] right-[7.4rem] -z-10">
          <img src={images.Vector5} alt="" />
        </div>
        <div className="hidden md:block fixed top-[35rem] right-[9.4rem] -z-10">
          <img src={images.Vector4} alt="" />
        </div>
        <div className="hidden md:block fixed top-[30rem] right-[11.6rem] -z-10">
          <img src={images.Vector6} alt="" />
        </div>
        <div className="bg-primary !mt-24 xl:mt-0 flex flex-col justify-center items-start mx-auto">
          <Formik initialValues={{ file: '' }} onSubmit={(values) => handleSubmit(values.document_type)} validationSchema={ProofOfResidence}>
            {(formik) => (
              <Form className="w-full space-y-4">
                <div className="xl:pt-16 p-4 pt-[2.2rem] xl:px-20 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                  <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl w-5/6 xl:leading-10">
                    Kindly Upload Proof of Residence
                  </div>
  
                  <div className="xl:w-full md:w-[85%] items-start flex flex-col space-y-2 ">
                    <Field
                      as="select"
                      name="document_type"
                      className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base text-gray rounded-[5px] py-2 px-8 bg-secondary">
                      <option
                        name="doumments"
                        className="!bg-secondary text-primary font-medium"
                        disabled
                        selected>
                        Select Document
                      </option>
                      <option
                        value="bvn"
                        name="document"
                        className="!bg-secondary text-primary font-medium">
                        BVN
                      </option>
                      <option
                        value="nin"
                        name="document"
                        className="!bg-secondary text-primary font-medium">
                        NIN
                      </option>
                      <option
                        value="voters-card"
                        name="document"
                        className="!bg-secondary text-primary font-medium">
                        Voter's Card
                      </option>
                    </Field>
                    <ErrorMessage name="document_type" component="span" className="text-[#db3a3a]" />
                    <div className="flex flex-col items-center border rounded-[10px] border-[#006181] w-full text-center p-4 !mt-8">
                      <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={(e) => setDocumentDetails(e.currentTarget.files[0])}
                        value={formik.values.file}
                      />
  
                      <label
                        htmlFor="file"
                        className="cursor-pointer font-bold flex items-center flex-col">
                        <MdOutlineFileUpload size={22} opacity={0.65} />
                        <span className="text-[#E80516]">Upload Document</span>
                      </label>
                      <span className="text-lightBlue">{document_details?.name}</span>
                    </div>
                  </div>
                  <CustomButton
                    padding="15px"
                    type="submit"
                    children="Next"
                    className="hover:cursor-pointer flex justify-center items-center !text-lightBlue xl:text-[19px] !border-none !bg-yellow font-extrabold duration-300 mx-auto md:mx-0 w-full md:w-[85%] xl:w-full !mb-12 xl:my-12 xl:mb-20"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <style>{selectArrow}</style>
      </>
    );
  };
  