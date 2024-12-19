import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';

// Validation schema for the  form
const InventorySchema = Yup.object().shape({
  // firstName: Yup.string().required('required'),
  // lastName: Yup.string().required('required'),
  // email: Yup.string().email('Invalid email').required('Email is required'),
  // phoneNumber: Yup.string().required('required'),
  // idNumber: Yup.string().required('required'),
  country: Yup.string().required('required'),
  residentialAddress: Yup.string().required('required'),
  city: Yup.string().required('required'),
  // businessAddress: Yup.string().required('required'),
  // businessName: Yup.string().required('required'),
  businessEmail: Yup.string().email('Invalid email').required('Email is required'),
  contactNumber: Yup.string().required('required'),
  // cacNumber: Yup.string().required('required'),
  // taxIdNumber: Yup.string().required('required'),
  socialMedia: Yup.string().required('required'),
  businessCountry: Yup.string().required('required'),
});
import DocumentUploader from './DocumentUploader';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { fetchDataSuccess } from '../../../../Redux/UserSlice';

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadDocuments, setUploadDocuments] = useState(false);
  const [files, setFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');

  //getting the userProfile from the redux store
  const profilePic = useSelector((state) => state.user.user.passportUrl);
  const userEmail = useSelector((state) => state.user.user.email);
  const userDetails = useSelector((state) => state.user.user);
  const userBusinessDetails = useSelector((state) => state.coporateCustomerProfile.customerDetails);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };
  const handleProfileUpload = async () => {
    if (!files || files.length === 0) {
      alert('Please select a picture to upload.');
      return;
    }

    setUploading(true);
    setUploadStatus('');

    try {
      const formData = new FormData();
      formData.append('passport', files[0]);
      formData.append('email', userEmail);
      const response = await fetch(import.meta.env.VITE_UPLOAD_IMAGE_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Files uploaded successfully!');
        setSuccess(true);
        // Fetch the updated user details
        const response = await fetch(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        const data = await response.json();

        //storing the user details in the userSlice using the redux store
        dispatch(fetchDataSuccess(data));
      } else {
        const error = await response.json();
        setUploadStatus(`Upload failed: ${error.message || 'Unknown error'}`);
      }
    } catch (err) {
      setUploadStatus(`Error:Something went wrong`);
      console.log(err);
    } finally {
      setUploading(false);
    }
  };
  const initialValues = {
    // firstName: '',
    // lastName: '',
    // phoneNumber: '',
    // email: '',
    // idNumber: '',
    country: 'Nigeria',
    residentialAddress: `${userBusinessDetails?.houseNumber}, ${userBusinessDetails?.street},  ${userBusinessDetails?.state} State,  ${userBusinessDetails?.lga} LGA  `,
    city: userBusinessDetails?.businessState,
    // businessName: '',
    businessAddress: '',
    businessEmail: userDetails.email,
    contactNumber: userDetails.phoneNumber,
    // cacNumber: '',
    // taxIdNumber: '',
    socialMedia: '',
    businessCountry: 'Nigeria',
  };

  const handleSubmit = async (values, actions) => {
    const { resetForm } = actions;
    resetForm();
    console.log(values);
  };
  return (
    <div className="h-full">
      {uploadDocuments && (
        <>
          <div className=" z-50 fixed top-[25%] right-[5%] w-[80%]">
            <DocumentUploader />
            <button
              onClick={() => {
                setUploadDocuments(false);
              }}
              className="bg-red-600 text-white z-50 absolute p-2 rounded-md bottom-[5%] right-[35%]">
              Close
            </button>
          </div>
          <div
            onClick={() => {
              setUploadDocuments(false);
            }}
            className="text-black fixed top-0 left-0 right-0 w-full h-[150%] mt-[-1rem] z-20 backdrop-blur-[2px] transition-all duration-150 animate-slideLeft "></div>
        </>
      )}
      <section className="w-[95%] m-auto h-full  mt-5">
        <div className="w-full flex justify-between">
          <h2 className="font-bold mb-4"> Personal Details</h2>
          {/* Upload documents button */}
          <button
            className="p-3 bg-secondary text-white font-bold rounded-md text-sm"
            onClick={() => {
              setUploadDocuments(true);
            }}>
            Upload Company Documents
          </button>
        </div>
        <div className="w-full md:w-[80%] lg:w-[80%] flex-col flex md:flex-row items-center gap-8">
          <div className="rounded-full">
            <img className="h-[100px] w-[100px] rounded-full" src={profilePic} alt="profilePic" />
          </div>
          <div className="space-x-2 flex w-[100%] text-center md:w-[80%] justify-around  ">
            <div className="space-x-2 space-y-2  ">
              <input
                className="w-[80%] m-auto  text-center"
                id="passportUrl"
                name="passportUrl"
                type="file"
                onChange={(event) => {
                  handleFileChange(event);
                }}
              />
              {/* upload profilPic button */}
              <button
                onClick={handleProfileUpload}
                disabled={uploading}
                className={`bg-secondary text-white px-4 py-2 rounded-md transition ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                {uploading ? 'Uploading..' : 'Upload'}
              </button>
              {/* <button className=" border px-5 py-2 border-[#006181] rounded-md">Delete</button> */}
              {/* Upload Status */}
              {uploadStatus && (
                <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'}`}>
                  {uploadStatus}
                </p>
              )}
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={InventorySchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="py-5 w-[100%]  m-auto bg-primary   rounded-xl mt-[10px] mb-[50px]">
              {/* personal details section */}
              <div className="md:flex gap-2">
                <div className="w-[80%] md:w-[60%] m-auto">
                  <div className="py-0">
                    <label className="font-semibold block md:text-md" htmlFor="firstName">
                      First Name
                    </label>
                    <Field
                      className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                      type="text"
                      name="firstName"
                      value={userDetails.firstName}
                      readOnly
                    />
                    {/* <ErrorMessage className="text-red-500" name="firstName" component="div" /> */}
                  </div>
                </div>
                <div className="w-[80%] md:w-[60%] m-auto">
                  <div className="py-0">
                    <label className="font-semibold block md:text-md" htmlFor="lastName">
                      Last Name
                    </label>
                    <Field
                      className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                      type="text"
                      name="lastName"
                      value={userDetails.lastName}
                      readOnly
                    />
                    {/* <ErrorMessage className="text-red-500" name="lastName" component="div" /> */}
                  </div>
                </div>
              </div>
              <div className="md:flex gap-2">
                <div className="w-[80%] md:w-[60%] m-auto">
                  <div className="py-0">
                    <label className="font-semibold block md:text-md" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <Field
                      className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                      type="text"
                      name="phoneNumber"
                      value={userDetails.phoneNumber}
                      readOnly
                    />
                    {/* <ErrorMessage className="text-red-500" name="phoneNumber" component="div" /> */}
                  </div>
                </div>

                <div className="w-[80%] md:w-[60%] m-auto">
                  <div className="py-0">
                    <label className="font-semibold block md:text-md" htmlFor="email">
                      Email Address
                    </label>
                    <Field
                      className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                      type="email"
                      name="email"
                      value={userDetails.email}
                      readOnly
                    />
                    {/* <ErrorMessage className="text-red-500" name="email" component="div" /> */}
                  </div>
                </div>
              </div>
              <div className="md:flex gap-2">
                <div className="w-[80%] md:w-[60%] m-auto">
                  <div className="py-0">
                    <label className="font-semibold block md:text-md" htmlFor="idNumber">
                      ID Number
                    </label>
                    <Field
                      className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                      type="text"
                      name="idNumber"
                      value={userDetails.customerId}
                      readOnly
                    />
                    {/* <ErrorMessage className="text-red-500" name="idNumber" component="div" /> */}
                  </div>
                </div>
                <div className="w-[80%] md:w-[60%] m-auto">
                  <div className="py-0">
                    <label className="font-semibold block md:text-md" htmlFor="country">
                      Country
                    </label>
                    <Field
                      className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                      type="text"
                      name="country"
                    />
                    <ErrorMessage className="text-red-500" name="country" component="div" />
                  </div>
                </div>
              </div>
              <div className="md:flex gap-2">
                <div className="w-[80%] md:w-[60%] m-auto">
                  <div className="py-0">
                    <label className="font-semibold block md:text-md" htmlFor="city">
                      City
                    </label>
                    <Field
                      className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                      type="text"
                      name="city"
                    />
                    <ErrorMessage className="text-red-500" name="city" component="div" />
                  </div>
                </div>
                <div className="w-[80%] md:w-[60%] m-auto">
                  <div className="py-0">
                    <label className="font-semibold block md:text-md" htmlFor="residentialAddress">
                      Residential Address
                    </label>
                    <Field
                      className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                      type="text"
                      name="residentialAddress"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      name="residentialAddress"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              {/* business section */}
              <section className="w-[100%] m-auto  mt-5">
                <h2 className="font-bold mb-4 text-center md:text-justify"> Business Details</h2>
                <div className="md:flex gap-2">
                  <div className="w-[80%] md:w-[60%] m-auto">
                    <div className="py-0">
                      <label className="font-semibold block md:text-md" htmlFor="businessName">
                        Business Name
                      </label>
                      <Field
                        className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                        type="text"
                        name="businessName"
                        value={userBusinessDetails?.businessName}
                        readOnly
                      />

                      {/* <ErrorMessage className="text-red-500" name="businessName" component="div" /> */}
                    </div>
                  </div>
                  <div className="w-[80%] md:w-[60%] m-auto">
                    <div className="py-0">
                      <label className="font-semibold block md:text-md" htmlFor="businessAddress">
                        Business Address
                      </label>
                      <Field
                        className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                        type="text"
                        name="businessAddress"
                        value={`${userBusinessDetails?.businessHouseNumber}, ${userBusinessDetails?.businessStreetName},  ${userBusinessDetails?.businessState} State,  ${userBusinessDetails?.businessLGA} LGA  `}
                      />
                      {/* <ErrorMessage
                        className="text-red-500"
                        name="businessAddress"
                        component="div"
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="md:flex gap-2">
                  <div className="w-[80%] md:w-[60%] m-auto">
                    <div className="py-0">
                      <label className="font-semibold block md:text-md" htmlFor="contactNumber">
                        Contact Number
                      </label>
                      <Field
                        className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                        type="text"
                        name="contactNumber"
                      />
                      <ErrorMessage className="text-red-500" name="contactNumber" component="div" />
                    </div>
                  </div>

                  <div className="w-[80%] md:w-[60%] m-auto">
                    <div className="py-0">
                      <label className="font-semibold block md:text-md" htmlFor="businessEmail">
                        Email Address
                      </label>
                      <Field
                        className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                        type="email"
                        name="businessEmail"
                        value={userDetails.email}
                      />
                      <ErrorMessage className="text-red-500" name="businessEmail" component="div" />
                    </div>
                  </div>
                </div>
                <div className="md:flex gap-2">
                  <div className="w-[80%] md:w-[60%] m-auto">
                    <div className="py-0">
                      <label className="font-semibold block md:text-md" htmlFor="cacNumber">
                        CAC Number
                      </label>
                      <Field
                        className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                        type="number"
                        name="cacNumber"
                        value={userBusinessDetails?.businessRegNumber}
                        readOnly
                      />

                      {/* <ErrorMessage className="text-red-500" name="cacNumber" component="div" /> */}
                    </div>
                  </div>
                  <div className="w-[80%] md:w-[60%] m-auto">
                    <div className="py-0">
                      <label className="font-semibold block md:text-md" htmlFor="taxIdNumber">
                        Tax Identification Number
                      </label>
                      <Field
                        className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                        type="text"
                        name="taxIdNumber"
                        value={userBusinessDetails?.tin_No}
                        readOnly
                      />
                      {/* <ErrorMessage className="text-red-500" name="taxIdNumber" component="div" /> */}
                    </div>
                  </div>
                </div>
                <div className="md:flex gap-2">
                  <div className="w-[80%] md:w-[60%] m-auto">
                    <div className="py-0">
                      <label className="font-semibold block md:text-md" htmlFor="socialMedia">
                        Social Media
                      </label>
                      <Field
                        className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                        type="text"
                        name="socialMedia"
                      />
                      <ErrorMessage className="text-red-500" name="socialMedia" component="div" />
                    </div>
                  </div>
                  <div className="w-[80%] md:w-[60%] m-auto">
                    <div className="py-0">
                      <label className="font-semibold block md:text-md" htmlFor="businessCountry">
                        Country
                      </label>
                      <Field
                        className="w-full text-gray h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                        type="text"
                        name="businessCountry"
                      />
                      <ErrorMessage
                        className="text-red-500"
                        name="businessCountry"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[80%] md:w-[60%] py-2 bg-secondary rounded-md m-auto mt-2 mb-4">
                  <button
                    className="text-center w-full  text-primary font-semibold"
                    type="submit"
                    disabled={isSubmitting}>
                    {loading ? 'Loading...' : 'Save Changes'}
                  </button>
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default ProfileSetting;
