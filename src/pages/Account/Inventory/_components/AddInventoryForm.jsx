import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
// Validation schema for the  form
const InventorySchema = Yup.object().shape({
  productName: Yup.string().required('required'),
  pricePerProduct: Yup.string().required('required'),
  totalQuantitySold: Yup.string().required('required'),
  totalQuantityStocked: Yup.string().required('required'),
  stockLeft: Yup.string().required('required'),
  totalSalesPerProduct: Yup.string().required('required'),
});

const AddInventoryForm = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    productName: '',
    pricePerProduct: '',
    totalQuantityStocked: '',
    totalQuantitySold: '',
    stockLeft: '',
    totalSalesPerProduct: '',
  };

  const handleSubmit = async (values, actions) => {
    const { resetForm } = actions;
    resetForm();
    console.log(values);
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
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-5">
                <label className="font-bold block md:text-md" htmlFor="stockLeft">
                  Stock Left
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="number"
                  name="stockLeft"
                />
                <ErrorMessage className="text-red-500" name="stockLeft" component="div" />
              </div>
            </div>
            <div className="w-[80%] md:w-[60%] m-auto">
              <div className="py-5">
                <label className="font-bold block md:text-md" htmlFor="totalSalesPerProduct">
                  Total Sales Per Product
                </label>
                <Field
                  className="w-full h-[50px] px-2 rounded-md border border-[#ddd] focus:outline-none"
                  type="number"
                  name="totalSalesPerProduct"
                />
                <ErrorMessage
                  className="text-red-500"
                  name="totalSalesPerProduct"
                  component="div"
                />
              </div>
            </div>
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
