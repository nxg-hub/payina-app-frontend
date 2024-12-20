import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventoryById } from '../../../../Redux/InventoryByIdSlice';
import { storeUpdatedInventory } from '../../../../Redux/InventorySlice';

// Validation schema for the  form
const InventorySchema = Yup.object().shape({
  productName: Yup.string().required('required'),
  pricePerProduct: Yup.string().required('required'),
  totalQuantitySold: Yup.string().required('required'),
  totalQuantityStocked: Yup.string().required('required'),
});

const UpdateInventoryForm = ({ id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [success, setSuccess] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');
  const formData = useSelector((state) => state.inventoryById.inventoryById);
  const formLoading = useSelector((state) => state.inventoryById.loading);
  const error = useSelector((state) => state.inventoryById.error);
  //getting the customerId state from the store
  const customerId = useSelector((state) => state.user.user.customerId);

  useEffect(() => {
    dispatch(fetchInventoryById(id));
  }, [id]);
  const handleSubmit = async (values, actions) => {
    const { resetForm } = actions;
    setUploadStatus('');
    setLoading(true);
    try {
      // Example of an API call to authenticate the user
      const response = await fetch(import.meta.env.VITE_UPDATE_INVENTORY.replace('{id}', id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAuthToken}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error: Something went wrong'); // Handle error
      }

      if (response.ok) {
        setSuccess(true);
        setUploadStatus('Inventory Updated successfully!');
        setLoading(false);
        // Fetch the updated inventory
        const response = await fetch(
          import.meta.env.VITE_GET_INVENTORY_BY_CUSTOMER_ID.replace('{customerId}', customerId),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        //storing the updated inventory in the inventorySlice using the redux store
        dispatch(storeUpdatedInventory(data));
      }
    } catch (err) {
      setUploadStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {formLoading ? (
        <div className="h-[400px] bg-transparent">
          <h2 className="text-center mt-5">Loading form data...</h2>
        </div>
      ) : !formLoading && error ? (
        <div className="h-[500px]">
          <h2 className="text-center text-red-500">
            Something went wrong while fetching form data
          </h2>
        </div>
      ) : (
        <Formik
          initialValues={{
            productName: formData.productName,
            pricePerProduct: formData.pricePerProduct,
            totalQuantityStocked: formData.totalQuantityStocked,
            totalQuantitySold: formData.totalQuantitySold,
          }}
          validationSchema={InventorySchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="py-5 w-[90%] md:w-[60%] m-auto bg-primary border-2 border-[#a0a0a0] shadow-2xl rounded-xl mt-[10px] mb-[50px]">
              <>
                {formData && (
                  <>
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
                        <ErrorMessage
                          className="text-red-500"
                          name="pricePerProduct"
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="w-[80%] md:w-[60%] m-auto">
                      <div className="py-5">
                        <label
                          className="font-bold block md:text-md"
                          htmlFor="totalQuantityStocked">
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
                        <ErrorMessage
                          className="text-red-500"
                          name="totalQuantitySold"
                          component="div"
                        />
                      </div>
                    </div>
                  </>
                )}
                {uploadStatus && (
                  <p className={`mt-4 ${success ? 'text-green-500' : 'text-red-500'} text-center`}>
                    {uploadStatus}
                  </p>
                )}
                <div className="w-[80%] md:w-[60%] py-2 bg-secondary rounded-md m-auto mt-2 mb-4">
                  <button
                    className="text-center w-full text-primary font-bold"
                    type="submit"
                    disabled={isSubmitting}>
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateInventoryForm;
