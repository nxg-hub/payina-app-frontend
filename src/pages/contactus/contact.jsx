import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { Textarea } from '@headlessui/react';
import { FormSchemas } from '../More/contactUs/FormSchemas';

const Contact = () => {
  const [screenshot, setScreenshot] = useState(null);
  return (
    <div className="flex flex-col justify-center items-center gap-5 lg:py-10 lg:px-5 p-5 lg:mx-auto">
      <div className="flex flex-col justify-between items-center gap-3 w-full lg:w-[630px] text-center">
        <h1 className="text-[30px] font-bold text-white">Customer Care</h1>
        <h1 className="text-[30px] font-bold text-white">We&apos;re Here to Help</h1>
        <p className="text-[17px] font-medium text-white leading-6">
          {' '}
          Whether it&apos;s a question about our services, a request for technical assistance, or
          suggestions for improvement, our team is eager to hear from you.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 justify-between items-center py-4 px-7 lg:px-10 mt-5 bg-lightBlue shadow-md rounded-xl">
        <div className="flex flex-col lg:w-1/3 w-full lg:sticky lg:top-28 lg:p-5 lg:h-screen lg:overflow-auto">
          <hr className="w-[60px] h-5 text-white"></hr>
          <h1 className="text-[30px] font-bold text-white">Contact</h1>
          <p className="text-[17px] font-medium mt-2 text-white">Tel: +234 903 739 4146</p>
          <p className="text-[17px] font-medium mt-2 text-white">Email: support@payina.com.ng</p>
        </div>

        <div className="flex flex-col gap-3 justify-between p-5 items-base">
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '',
              message: '',
              screenshot: null,
            }}
            validationSchema={FormSchemas}
            onSubmit={(values, { setSubmitting }) => {
              const formData = new FormData();
              formData.append('form-name', 'contact');
              Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
              });

              fetch('/', {
                method: 'POST',
                body: formData,
              })
                .then(() => {
                  alert('Form successfully submitted');
                  setSubmitting(false);
                })
                .catch((error) => {
                  console.error('Form submission error:', error);
                  setSubmitting(false);
                });
            }}>
            {({ setFieldValue }) => (
              <Form name="contact" method="POST" data-netlify="true">
              <div className="flex flex-col w-full gap-2">
                  <label htmlFor="firstName" className="text-left font-md text-md text-white">
                    Full Name
                  </label>
                  <Field
                    name="payinaTag"
                    type="text"
                    placeholder="first name"
                    className="lg:w-[700px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>

                <div className="flex flex-col w-full gap-2 py-2">
                  <label htmlFor="email" className="text-left font-md text-md text-white">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Your Email Address"
                    className="lg:w-[700px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>

                <div className="flex flex-col w-full gap-2 py-2">
                  <label htmlFor="phoneNumber" className="text-left font-md text-md text-white">
                    Phone Number
                  </label>
                  <Field
                    name="phoneNumber"
                    type="number"
                    placeholder="Enter your phone number"
                    className="lg:w-[700px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>

                <div className="flex flex-col w-full gap-2 py-2">
                  <label htmlFor="screenshot" className="text-left font-md text-md text-white">
                    Upload Complaint Reference (Screenshot)
                  </label>
                  <input
                    type="file"
                    name="screenshot"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue('screenshot', event.currentTarget.files[0]);
                      setScreenshot(URL.createObjectURL(event.currentTarget.files[0]));
                    }}
                    className="lg:w-[500px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm bg-white"
                  />
                  {screenshot && (
                    <img
                      src={screenshot}
                      alt="Complaint Screenshot"
                      className="mt-2 rounded-md w-[100px] h-[100px] object-cover"
                    />
                  )}
                  <ErrorMessage
                    name="screenshot"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>

                <div className="flex flex-col w-full gap-2 py-2">
                  <label htmlFor="message" className="text-left font-md text-md text-white">
                    Write Your Complaint here
                  </label>
                  <Textarea
                    name="message"
                    type="text"
                    cols={8}
                    rows={10}
                    placeholder="Write your complaint here"
                    className="lg:w-[700px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="message"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="rounded-full text-xs md:text-base py-[10px] px-[50px] border border-lightBlue bg-yellow hover:bg-[#FFb950] text-black hover:bg-yellow-400 transition-all transform hover:scale-105 hover:animate-bounce">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Contact;
