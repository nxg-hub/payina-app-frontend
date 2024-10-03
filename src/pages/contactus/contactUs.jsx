// ContactUs.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';

const ContactUs = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center text-primary">Contact Us</h1>
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
