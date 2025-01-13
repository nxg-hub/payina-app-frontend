import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { storeUpdatedInventory } from '../../../../Redux/InventorySlice';
import { useNavigate } from 'react-router-dom';

// Validation schema for the  form
const InventorySchema = Yup.object().shape({
  productName: Yup.string().required('required'),
  pricePerProduct: Yup.string().required('required'),
  totalQuantitySold: Yup.string().required('required'),
  totalQuantityStocked: Yup.string().required('required'),
});

const AddInventoryForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');
  const navigate = useNavigate();
  //getting the customerId state from the store
  const id = useSelector((state) => state.user.user.customerId);

  const initialValues = {
    productName: '',
    pricePerProduct: '',
    totalQuantityStocked: '',
    totalQuantitySold: '',
  };

  const handleSubmit = async (values, actions) => {
    const { resetForm } = actions;
    setLoading(true);
    setUploadStatus('');
    try {
      // Example of an API call to authenticate the user
      const response = await fetch(import.meta.env.VITE_ADD_INVENTORY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAuthToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setUploadStatus('Something went wrong!');
        throw new Error('Error: Something went wrong'); // Handle unsuccessful login
      }

      if (response.ok) {
        setSuccess(true);
        setUploadStatus('Inventory added successfully!');
        setLoading(false);
        // Fetch the updated inventory
        const res = await fetch(
          import.meta.env.VITE_GET_INVENTORY_BY_CUSTOMER_ID.replace('{customerId}', id),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await res.json();

        //storing the updated inventory in the inventorySlice using the redux store
        dispatch(storeUpdatedInventory(data));
      }

      resetForm();
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setUploadStatus('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  const viewInventory = () => {
    navigate('/account/inventory');
  };
  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={InventorySchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="py-5 w-[90%] md:w-[60%] m-auto bg-primary border-2 border-[#a0a0a0] shadow-2xl rounded-xl mt-[10px] mb-[50px]">
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-5">
                <label className="font-bold block md:text-md" htmlFor="productName">
                  Product Name
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="text"
                  name="productName"
                />
                <ErrorMessage className="text-red-500" name="productName" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-5">
                <label className="font-bold block md:text-md" htmlFor="pricePerProduct">
                  Price Per Product
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="number"
                  name="pricePerProduct"
                />
                <ErrorMessage className="text-red-500" name="pricePerProduct" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-5">
                <label className="font-bold block md:text-md" htmlFor="totalQuantityStocked">
                  Total Quantity Stocked
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="number"
                  name="totalQuantityStocked"
                />
                <ErrorMessage
                  className="text-red-500"
                  name="totalQuantityStocked"
                  component="div"
                />
              </div>
            </div>

            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-5">
                <label className="font-bold block md:text-md" htmlFor="totalQuantitySold">
                  Total Quantity Sold
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="number"
                  name="totalQuantitySold"
                />
                <ErrorMessage className="text-red-500" name="totalQuantitySold" component="div" />
              </div>
            </div>
            {uploadStatus && (
              <>
                <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'} text-center`}>
                  {uploadStatus}
                </p>
                <div className="w-[50%] md:w-[35%] m-auto bg-red-300 mt-5">
                  <button
                    onClick={viewInventory}
                    className="w-full bg-blue-100 font-bold px-4 py-2 rounded-lg  hover:bg-stone-400 border shadow-md">
                    View Inventory
                  </button>
                </div>
              </>
            )}
            <div className="w-[80%] md:w-[60%] py-2 bg-secondary rounded-md m-auto mt-2 mb-4">
              <button
                className="text-center w-full text-primary font-bold"
                type="submit"
                disabled={isSubmitting}>
                {loading ? 'Loading...' : 'Add'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddInventoryForm;
