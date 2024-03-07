import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Addcustomer = () => {
  return (
    <div>
       <div>
      <h1>Invoice Form</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          companyName: '',
          contact: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          companyName: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
          contact: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="companyName">Company Name</label>
            <Field type="text" name="companyName" />
            <ErrorMessage name="companyName" component="div" />
          </div>

          <div>
            <label htmlFor="contact">Contact</label>
            <Field type="text" name="contact" />
            <ErrorMessage name="contact" component="div" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <button>Add Customer</button>
    </div>
    </div>
  )
}

export default Addcustomer
