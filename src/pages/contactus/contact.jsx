import React, { useState } from 'react';
import { images } from '../../constants';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { FormSchemas } from './FormSchemas';

const ContactForm = ({ goBack }) => {
  const [screenshot_url, setScreenshot] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  });

  const encode = (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === 'screenshot_url' && data[key]) {
        formData.append(key, data[key]);
      } else if (data[key] !== null && key !== 'screenshot_url') {
        formData.append(key, data[key]);
      }
    }

    return formData;
  };

  const uploadScreenshot = async (file, values) => {
  const formData = new FormData();
  formData.append('file', file);
  const email = encodeURIComponent(values.customerEmail);


  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/upload-to-cloudinary?email=${email}`, {
    method: 'POST',
    body: formData,
  });

 const url = await response.text();

if (!response.ok) {
  throw new Error('Screenshot upload failed');
}

return url;
  }

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
  setSubmissionStatus({
    isSubmitting: true,
    isSuccess: false,
    isError: false,
    message: 'Submitting your form...',
  });

  try {
    let screenshotUrl = null;

    // Upload the screenshot to your backend Cloudinary endpoint
    if (values.screenshot_url) {
      screenshotUrl = await uploadScreenshot(values.screenshot_url, values);
    }

    const requestData = {
      customerId: 'string',
      category: 'user-logged',
      priority: 'low-risk',
      subject: 'user-logged',
      ...values,
      screenshot_url: screenshotUrl, // replace file with URL
    };

    // delete requestData.screenshotFile; // clean up if necessary

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/support/tickets/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) throw new Error('Form submission failed');

    setSubmissionStatus({
      isSubmitting: false,
      isSuccess: true,
      isError: false,
      message: 'Thank you! Your form has been submitted successfully.'
    });

    resetForm();
  } catch (error) {
    setSubmissionStatus({
      isSubmitting: false,
      isSuccess: false,
      isError: true,
      message: error.message || 'Something went wrong',
    });
  } finally {
    setSubmitting(false);
  }
};


  const closeSuccessModal = () => {
    setSubmissionStatus(prev => ({...prev, isSuccess: false, message: ''}));
  };

  return (
    <div className="flex flex-col justify-between items-center lg:ml-50 pt-5 ml-0 lg:mx-auto">
      <div className="flex flex-row justify-between items-left gap-[5rem] lg:gap-[55rem] pb-7">
        <div className="text-xl md:text-3xl font-medium">Contact Us</div>
        <div className="cancelAction-img" onClick={goBack}>
          <img src={images.BackIcon} alt="cancelAction"></img>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center gap-3 w-full text-wrap lg:w-[630px] text-center">
        <h1 className="text-[30px] font-bold text-black">Customer Care</h1>
        <h1 className="text-[30px] font-bold text-black">We&apos;re Here to Help</h1>
        <p className="text-[17px] font-medium text-black leading-6 lg:w-full w-[70vw]">
          {' '}
          Whether it&apos;s a question about our services, a request for technical assistance, or
          suggestions for improvement, our team is eager to hear from you.
        </p>
      </div>

      {/* Form Status Messages */}
      {submissionStatus.isSuccess && (
        <div className="w-full max-w-[630px] mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          {submissionStatus.message}
        </div>
      )}

      {submissionStatus.isError && (
        <div className="w-full max-w-[630px] mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {submissionStatus.message}
        </div>
      )}

      <div className="flex lg:flex-row flex-col gap-5 justify-between items-center py-4 px-7 lg:px-10 mt-5 bg-lightBlue shadow-md rounded-xl">
        <div className="flex flex-col lg:w-1/3 w-full lg:sticky lg:top-28 lg:p-5 lg:h-screen lg:overflow-auto">
          <hr className="w-[60px] h-5 text-white"></hr>
          <h1 className="text-[30px] font-bold text-white">Contact</h1>
          <p className="text-[17px] font-medium mt-2 text-white">Tel: +234 903 739 4146</p>
          <p className="text-[17px] font-medium mt-2 text-white">Email: support@payina.com.ng</p>
        </div>

        <div className="flex flex-col gap-3 justify-between p-3 lg:p-5 items-base">
          <Formik
            initialValues={{
              customerName: '',
              customerEmail: '',
              phoneNumber: '',
              description: '',
              screenshot_url: null,
              hiddenField: '', // for honeypot (spam protection)
            }}
            validationSchema={FormSchemas}
            onSubmit={handleSubmit}>
            {({ setFieldValue, isSubmitting }) => (
              <Form name="contact" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="customerName" className="text-left font-md text-md text-white">
                    Full Name
                  </label>
                  <Field
                    name="customerName"
                    type="text"
                    placeholder="Your full name"
                    className="lg:w-[500px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="customerName"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>

                <div className="flex flex-col w-full gap-2 py-2">
                  <label htmlFor="customerEmail" className="text-left font-md text-md text-white">
                    Email Address
                  </label>
                  <Field
                    name="customerEmail"
                    type="email"
                    placeholder="Your Email Address"
                    className="lg:w-[500px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="customerEmail"
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
                    type="tel"
                    placeholder="Enter your phone number"
                    className="lg:w-[500px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>

                <div className="flex flex-col w-full gap-2 py-2">
                  <label htmlFor="screenshot_url" className="text-left font-md text-md text-white">
                    Upload Complaint Reference (Screenshot), if applicable
                  </label>
                  <input
                    type="file"
                    id="screenshot_url"
                    name="screenshot_url"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        setFieldValue('screenshot_url', file);
                        setScreenshot(URL.createObjectURL(file));
                      }
                    }}
                    className="lg:w-[500px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm bg-white"
                  />
                  {screenshot_url && (
                    <img
                      src={screenshot_url}
                      alt="Complaint Screenshot"
                      className="mt-2 rounded-md w-[100px] h-[100px] object-cover"
                    />
                  )}
                  <ErrorMessage
                    name="screenshot_url"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>

                <div className="flex flex-col w-full gap-2 py-2">
                  <label htmlFor="description" className="text-left font-md text-md text-white">
                    Write Your Complaint Here
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows={10}
                    placeholder="Write your complaint here"
                    className="lg:w-[500px] w-[250px] border border-yellow outline-none rounded-[5px] p-2 font-light opacity-70 text-xs md:text-sm"
                  />
                  <ErrorMessage
                    name="description"
                    component="span"
                    className="text-[#db3a3a] text-xs !mt-[2px] md:text-base"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`rounded-full text-xs md:text-base py-[10px] px-[30px] border border-lightBlue 
                      ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow hover:bg-[#FFb950] hover:bg-yellow-400 transform hover:scale-105 hover:animate-bounce'} 
                      text-black transition-all`}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Success Message Modal - Using submissionStatus instead of isSubmitted */}
        {submissionStatus.isSuccess && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-bold text-green-600">Success!</h2>
              <p>{submissionStatus.message}</p>
              <button
                onClick={closeSuccessModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;