// Support.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Support = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center text-primary">Support</h1>
      <p className="mt-4 text-lg text-justify">
        Welcome to the Payina Support Center. Here, you can find help with your inquiries or issues.
      </p>
      <h2 className="mt-6 text-2xl font-semibold">Frequently Asked Questions (FAQs)</h2>
      <ul className="mt-4 list-disc list-inside">
        <li>How do I reset my password?</li>
        <li>What payment methods do you support?</li>
        <li>How can I contact customer service?</li>
        <li>What should I do if I encounter a problem with my transaction?</li>
      </ul>
    </div>
  );
};

export default Support;
