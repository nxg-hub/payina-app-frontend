// eslint-disable-next-line no-unused-vars
import React from 'react';

import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-5 bg-white">
      {' '}
      <br />
      <Navbar />
      <br />
      {/* Added bg-white for white background */}
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg">
        Welcome to Payina, where we strive to make payments seamless and secure for everyone. Our
        mission is to simplify financial transactions and empower individuals and businesses to
        thrive in the digital economy.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Our Vision</h2>
      <p className="text-lg">
        At Payina, we envision a world where financial transactions and bill payments are
        frictionless, transparent, and accessible to all. We believe that technology can transform
        the way we manage money and connect with one another.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Our Goal</h2>
      <p className="text-lg">
        Payina aims to become a trusted name in the payments industry. Our dedicated team of
        professionals works tirelessly to innovate and improve our services, ensuring the highest
        standards of security and customer satisfaction.
      </p>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default AboutUs;
