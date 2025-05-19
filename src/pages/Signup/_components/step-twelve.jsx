import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/button/button';
import { images } from '../../../constants';
import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { BusinessAddressVerification } from '../schemas/schema';
import { useDispatch } from 'react-redux';
import { previousStep } from '../../../Redux/BusinessSignUpSlice';

const uploadDocument = async (documentFile, email) => {
  const userEmail = localStorage.getItem('userEmail');
  try {
    const formData = new FormData();
    formData.append('document', documentFile);
    formData.append('email', userEmail);

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_UPLOAD_BUSINESS_DOCUMENT_ENDPOINT}`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.text();

    try {
      const jsonData = JSON.parse(data);
      // console.log('Document uploaded successfully:', jsonData);
      return jsonData;
    } catch (jsonError) {
      console.error('Failed to parse JSON:', jsonError);
      throw new Error('Invalid JSON response');
    }
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};
const uploadLogo = async (logoFile) => {
  const userEmail = localStorage.getItem('userEmail');

  try {
    const formData = new FormData();
    formData.append('document', logoFile);
    formData.append('email', userEmail);

    const response = await fetch(import.meta.env.VITE_UPLOAD_BUSINESS_LOGO_ENDPOINT, {
      method: 'POST',

      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload business logo');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const StepTwelve = ({ next, email }) => {
  const [businessDocumentDetails, setBusinessDocumentDetails] = useState('');
  const [businessLogoDetails, setBusinessLogoDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const dispatch = useDispatch();

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setApiError('');
    try {
      const response = await uploadDocument(businessDocumentDetails, email);
      const logoResponse = await uploadLogo(businessLogoDetails, email);

      next({
        businessDocumentDetails: response,
        businessLogoDetails: logoResponse,

        business_confirm_document: values.business_confirm_document,
      });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectArrow = `
    select {
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
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src={images.Vector3}
        alt="Background Design"
        className="absolute top-0 right-[32rem] w-24 h-24"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[11.5rem] right-[41rem] w-20 h-20"
      />
      <img
        src={images.Vector1}
        alt="Background Design"
        className="absolute bottom-[11.5rem] right-[43rem] w-20 h-20"
      />
      <img
        src={images.Vector2}
        alt="Background Design"
        className="absolute bottom-[6rem] right-[31rem] w-[100px] h-[100px]"
      />
      <img
        src={images.Vector5}
        alt="Background Design"
        className="absolute bottom-[7rem] right-[31.5rem] w-3 h-3"
      />
      <img
        src={images.Vector4}
        alt="Background Design"
        className="absolute bottom-[9rem] right-[32rem] w-15 h-15"
      />
      <img
        src={images.Vector6}
        alt="Background Design"
        className="absolute bottom-[10rem] right-[32rem] w-20 h-20"
      />
      <div className="relative z-10 flex flex-col justify-center items-center bg-white shadow-md xl:p-8 px-4 rounded-lg mx-auto sm:w-[300px] md:w-[400px] lg:w-[600px]">
        <Formik
          initialValues={{ business_confirm_document: '', logo: null }}
          onSubmit={handleSubmit}
          validationSchema={BusinessAddressVerification}>
          {(formik) => (
            <Form className="w-full space-y-4">
              <div className="xl:pt-16 p-4 pt-[2.2rem] xl:px-16 xl:w-auto w-full m-auto xl:space-y-8 space-y-4 pb-2 xl:pb-6">
                <div className="text-lightBlue text-start font-bold xl:text-[32px] text-xl xl:leading-10">
                  Kindly Upload Business Proof of Residence and Company Logo
                </div>
                <div className="xl:w-full md:w-[85%] items-start flex flex-col space-y-2 ">
                  <Field
                    as="select"
                    name="business_confirm_document"
                    className="text-primary w-full h-[3.4rem] border border-[#9ca3af] outline-none font-bold text-base rounded-[5px] py-2 px-8 bg-secondary">
                    <option value="" className="!bg-secondary text-primary font-medium" disabled>
                      Select Document
                    </option>
                    <option value="utility-bill" className="!bg-secondary text-primary font-medium">
                      Utility Bill
                    </option>
                  </Field>
                  <ErrorMessage
                    name="business_confirm_document"
                    component="span"
                    className="text-[#db3a3a]"
                  />

                  <div className="flex flex-col items-center border rounded-[10px] border-[#006181] w-full text-center p-4 !mt-8">
                    <input
                      id="document"
                      name="file"
                      type="file"
                      onChange={(e) => {
                        setBusinessDocumentDetails(e.currentTarget.files[0]);
                        formik.setFieldValue('file', e.currentTarget.files[0]);
                      }}
                    />

                    <label
                      htmlFor="document"
                      className="cursor-pointer font-bold flex items-center flex-col">
                      <MdOutlineFileUpload size={22} opacity={0.65} />
                      <span className="text-[#E80516]">Upload Document</span>
                    </label>
                    <span className="text-lightBlue">{businessDocumentDetails?.name}</span>
                  </div>
                </div>
                {/* Business Logo Upload */}
                <div className="xl:w-full md:w-[85%] items-start flex flex-col space-y-2 mt-6">
                  <div className="flex flex-col items-center border rounded-[10px] border-[#006181] w-full text-center p-4">
                    <input
                      id="logo"
                      name="logo"
                      accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                      type="file"
                      onChange={(e) => {
                        setBusinessLogoDetails(e.currentTarget.files[0]);
                        formik.setFieldValue('logo', e.currentTarget.files[0]);
                      }}
                    />
                    <label
                      htmlFor="logo"
                      className="cursor-pointer font-bold flex items-center flex-col">
                      <MdOutlineFileUpload size={22} opacity={0.65} />
                      <span className="text-[#E80516]">Upload Logo</span>
                    </label>
                    <span className="text-lightBlue">{businessLogoDetails?.name}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={loading}
                    onClick={handlePrevious}
                    className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8">
                    Back
                  </button>
                  <CustomButton
                    padding="15px"
                    type="submit"
                    children={loading ? 'Uploading...' : 'Next'}
                    className="hover:cursor-pointer flex justify-center items-center !text-lightBlue text-lg !border-none !bg-yellow font-extrabold duration-300 w-4/5 mx-auto my-8"
                    disabled={loading}
                  />
                </div>
              </div>
              {apiError && <div className="text-red-500 text-center">{apiError}</div>}
            </Form>
          )}
        </Formik>
      </div>
      <style>{selectArrow}</style>
    </div>
  );
};
