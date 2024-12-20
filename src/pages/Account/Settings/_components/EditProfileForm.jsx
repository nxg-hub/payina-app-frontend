import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { storeUpdatedProfile } from '../../../../Redux/CoorperateCustomerSlice';

// Validation schema for the edit profile form
const validationSchema = Yup.object().shape({
  houseNumber: Yup.string().required('required'),
  lga: Yup.string().required('required'),
  state: Yup.string().required('required'),
  street: Yup.string().required('required'),
  businessHouseNumber: Yup.string().required('required'),
  businessLGA: Yup.string().required('required'),
  businessState: Yup.string().required('required'),
  businessStreetName: Yup.string().required('required'),
});
const EditProfileForm = () => {
  const dispatch = useDispatch();
  const userBusinessDetails = useSelector((state) => state.coporateCustomerProfile.customerDetails);

  const customerId = useSelector((state) => state.user.user.customerId);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');
  const handleSubmit = async (values, actions) => {
    const { resetForm } = actions;
    setLoading(true);
    setUploadStatus('');
    try {
      const response = await fetch(
        // import.meta.env.VITE_UPDATE_PROFILE.replace('{customerId}', customerId, '{id}', customerId),
        `https://payina-be-6f08cdfb4414.herokuapp.com/api/corporate-customers/update-profile/${customerId}?customerId=${customerId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        setUploadStatus('Profile Updated Successfully.');
        setSuccess(true);
        // Fetch the updated profile
        const response = await fetch(
          import.meta.env.VITE_GET_CORPORATE_CUSTOMER_DETAILS.replace('{customerId}', customerId),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        //storing the updated profile in the inventorySlice using the redux store
        dispatch(storeUpdatedProfile(data));
      }
      resetForm();
    } catch (err) {
      setUploadStatus(`Error:Something went wrong`);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const initialValues = {
    houseNumber: userBusinessDetails.houseNumber,
    lga: userBusinessDetails.lga,
    state: userBusinessDetails.state,
    street: userBusinessDetails.street,
    businessHouseNumber: userBusinessDetails.businessHouseNumber,
    businessLGA: userBusinessDetails.businessLGA,
    businessState: userBusinessDetails.businessState,
    businessStreetName: userBusinessDetails.businessStreetName,
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="py-5 w-[80%] md:w-[60%] m-auto bg-primary border-2 border-[#a0a0a0] shadow-2xl rounded-xl mt-[100px] mb-[50px]">
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-1 relative">
                <label className="font-bold block md:text-md" htmlFor="houseNumber">
                  House Number
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="houseNumber"
                />
                <ErrorMessage className="text-red-500" name="houseNumber" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-1 relative">
                <label className="font-bold block md:text-md" htmlFor="lga">
                  Local Government Area
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="lga"
                />
                <ErrorMessage className="text-red-500" name="lga" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-1 relative">
                <label className="font-bold block md:text-md" htmlFor="state">
                  State
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="state"
                />
                <ErrorMessage className="text-red-500" name="state" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-1 relative">
                <label className="font-bold block md:text-md" htmlFor="businessHouseNumber">
                  Business House Number
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="businessHouseNumber"
                />
                <ErrorMessage className="text-red-500" name="businessHouseNumber" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-1 relative">
                <label className="font-bold block md:text-md" htmlFor="businessLGA">
                  Business LGA
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="businessLGA"
                />
                <ErrorMessage className="text-red-500" name="businessLGA" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-1 relative">
                <label className="font-bold block md:text-md" htmlFor="businessState">
                  Business State
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="businessState"
                />
                <ErrorMessage className="text-red-500" name="businessState" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-1 relative">
                <label className="font-bold block md:text-md" htmlFor="businessStreetName">
                  Business Street Name
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="businessStreetName"
                />
                <ErrorMessage className="text-red-500" name="businessStreetName" component="div" />
              </div>
            </div>
            {uploadStatus && (
              <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'} text-center`}>
                {uploadStatus}
              </p>
            )}
            <div className="w-[80%] md:w-[60%] py-2 bg-secondary rounded-md m-auto mt-2 mb-4">
              <button
                className={`bg-secondary w-full text-white font-bold px-4 py-2 rounded-md transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                type="submit"
                disabled={isSubmitting}>
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
