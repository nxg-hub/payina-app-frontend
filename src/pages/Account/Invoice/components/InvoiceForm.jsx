
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaPlus } from 'react-icons/fa'

const InvoiceForm = () => {
  return (
    <div className="md:px-[.5rem] pb-4 w-auto md:clear-right ml-3 md:ml-2 xl:ml-[19.5rem] mr-3 md:mr-2">
      <div className="pt-2 md:pt-[9%] text-sm md:text-base pb-6 " >
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">Invoice Form</h1>
      <Formik
        initialValues={{
          customer: {
            name: '',
            email: '',
            companyName: '',
            contact: ''
          },
          invoice: {
            invoiceNumber: '',
            dateOfIssue: '',
            dateOfDue: '',
            itemName: '',
            quantity: '',
            amount: '',
            vat: '',
            total: '',
            itemDescription: ''
          }
        }}
        validationSchema={Yup.object().shape({
          customer: Yup.object().shape({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            companyName: Yup.string().required('Required'),
            contact: Yup.string().required('Required')
          }),
          invoice: Yup.object().shape({
            invoiceNumber: Yup.string().required('Required'),
            dateOfIssue: Yup.string().required('Required'),
            dateOfDue: Yup.string().required('Required'),
            itemName: Yup.string().required('Required'),
            quantity: Yup.number().required('Required'),
            amount: Yup.number().required('Required'),
            vat: Yup.number().required('Required'),
            total: Yup.number().required('Required'),
            itemDescription: Yup.string().required('Required')
          })
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {formik => (
          <Form className="bg-white  rounded px-4 pt-0 pb-8 mb-4 ">
            <fieldset className="mb-6 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6  pt-0 px-4 rounded-md   ">
              <legend className="text-xl font-semibold mb-4 pt-11">Customer Information</legend>
              <div className="mb-4">
                <div className='flex'>
                <label htmlFor="customer.name" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2 w-[10rem] ">Name</label>
                <Field type="text" name="customer.name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <ErrorMessage name="customer.name" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <div className='flex'>
                <label htmlFor="customer.email" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2 w-[10rem] ">Email Address</label>
                <Field type="email" name="customer.email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <ErrorMessage name="customer.email" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <div className='flex'>
                <label htmlFor="customer.companyName" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2  w-[10rem]">Company Name</label>
                <Field type="text" name="customer.companyName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <ErrorMessage name="customer.companyName" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-6">
                <div className='flex'>
                <label htmlFor="customer.contact" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2  w-[10rem]">Contact</label>
                <Field type="text" name="customer.contact" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <ErrorMessage name="customer.contact" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>
              <div className='grid place-content-end pb-6'>
              <button type="button" className="flex items-center text-[10px] sm:text-[13px] md:text-base border border-secondary text-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <FaPlus className='mr-2'/>
                Add Customer
              </button>
              </div>
            </fieldset>

            <fieldset className="mb-6 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6   pt-0 px-4 rounded-md  ">
              <legend className=" text-[16px] md:text-[21px] font-semibold mb-4 pt-11 ">Invoice Details</legend>
              <div className="mb-4">
                <label htmlFor="invoice.invoiceNumber" className="block text-[10px] sm:text-[13px] md:text-base  font-bold mb-2">Invoice Number</label>
                <Field type="text" name="invoice.invoiceNumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.invoiceNumber" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className='grid grid-cols-2 gap-4'>
              <div className="mb-4">
                <label htmlFor="invoice.dateOfIssue" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Date of Issue</label>
                <Field type="date" name="invoice.dateOfIssue" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.dateOfIssue" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="invoice.dateOfDue" className="block text-[10px] sm:text-[13px] md:text-base mb-2">Date of Due</label>
                <Field type="date" name="invoice.dateOfDue" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.dateOfDue" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>
              </div>

              <div className="mb-4">
                <label htmlFor="invoice.itemName" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Item Name</label>
                <Field type="text" name="invoice.itemName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.itemName" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className='grid grid-cols-4 gap-4 '> 
              <div className="mb-4 ">
                <label htmlFor="invoice.quantity" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Quantity</label>
                <Field type="number" name="invoice.quantity" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.quantity" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="invoice.amount" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Amount</label>
                <Field type="number" name="invoice.amount" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.amount" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="invoice.vat" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">VAT</label>
                <Field type="number" name="invoice.vat" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.vat" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>
 
              <div className="mb-4">
                <label htmlFor="invoice.total" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Total</label>
                <Field type="number" name="invoice.total" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.total" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1" />
              </div>
              </div>

              <div className="mb-6">
                <label htmlFor="invoice.itemDescription" className="block text-[10px] sm:text-[13px] md:text-base font-bold mb-2">Item Description</label>
                <Field type="text" name="invoice.itemDescription" className="shadow appearance-none border rounded w-full h-[8rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="invoice.itemDescription" component="div" className="text-[#db3a3a] text-[10px] sm:text-[13px] md:text-base  mt-1 " />
              </div>
              <div className='grid place-content-end pb-4'>
                <div className='pb-6'>
              <button type="button" className=" flex items-center   text-secondary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-5 border border-secondary rounded focus:outline-none focus:shadow-outline mr-2 ">
                
                <FaPlus className='mr-2'/>
                Add Item
              
              </button>
              </div>
              </div>
              <div className='flex justify-center'>
                <div className='pb-6'>
              <button type="button" className="text-secondary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline mr-2">
                Cancel
              </button>
              </div>
              <div className='pb-6'>
              <button type="submit" className="bg-secondary text-primary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline mr-2">
                Create Invoice
              </button>
              </div>
              <div className='pb-6'>
              <button type="button" className="bg-secondary text-primary text-[10px] sm:text-[13px] md:text-base font-bold py-2 px-4 border border-secondary  rounded focus:outline-none focus:shadow-outline">
                Preview
              </button>
              </div>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
    </div>
    </div>
  );
};

export default InvoiceForm;