// ContactUs.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';

const ContactUs = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center text-primary">Contact Us</h1>

      {/* Contact Information Section */}
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700">
          If you prefer not to use the form, feel free to reach out to us via the following contact
          details:
        </p>
        <p className="mt-4 text-lg font-semibold">
          Email:{' '}
          <a href="mailto:support@payina.com.ng" className="text-primary">
            support@payina.com
          </a>
        </p>
        <p className="mt-2 text-lg font-semibold">
          Phone:{' '}
          <a href="tel:+2349037394146" className="text-primary">
            +234 903 739 4146
          </a>
        </p>
        {/*<p className="mt-2 text-lg font-semibold">Address: 123 Brough Street, Lux City, USA</p>*/}
      </div>

      {/* Contact Form Section */}
      <form className="mt-8 max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" className="border rounded w-full p-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" className="border rounded w-full p-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea className="border rounded w-full p-2" rows="4" required></textarea>
        </div>
        <button type="submit" className="bg-primary text-white rounded p-2">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
