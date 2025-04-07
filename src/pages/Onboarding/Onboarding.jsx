import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer.jsx';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <section className="bg-black">
      <Navbar />
      <hr className="border-none bg-yellow h-1 w-[87%] mx-auto my-10 xl:my-0" />
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Choose account type</h1>
          <p className="text-gray-500">Kindly choose your preferred business account type.</p>
        </div>

        <div className="space-y-4">
          <Link to="/personal/signup">
            <div
              className="bg-white border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex items-center justify-between shadow-sm mb-10"
              role="button"
              tabIndex={0}>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  {/* User Icon */}
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M20 21a8 8 0 1 0-16 0" />
                  </svg>
                </div>

                <div>
                  <h2 className="font-medium">Personal account</h2>
                  <p className="text-sm text-gray-500">Open a Payina personal account</p>
                </div>
              </div>
              {/* Chevron Right Icon */}
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>

          <Link to="/signup">
            <div
              className="bg-white border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex items-center justify-between shadow-sm"
              role="button"
              tabIndex={0}>
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  {/* Building Icon */}
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4v18" />
                    <path d="M19 21V11l-6-4" />
                    <path d="M9 9h1" />
                    <path d="M9 13h1" />
                    <path d="M9 17h1" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-medium">Business account</h2>
                  <p className="text-sm text-gray-500">
                    <a href="/signup">For businesses that are CAC-registered</a>
                  </p>
                </div>
              </div>
              {/* Chevron Right Icon */}
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>
        </div>

        <div className="text-center text-white space-y-2 pt-8">
          <p className="text-gray-600 font-medium">Payina Financial Services Limited</p>
          <p className="text-sm text-gray-500">Licensed by the Central Bank of Nigeria (CBN)</p>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Onboarding;
