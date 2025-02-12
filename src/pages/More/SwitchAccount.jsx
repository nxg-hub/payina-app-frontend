import React from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import Footer from '../../components/footer/footer.jsx';

const SwitchAccount = () => {
  return (
    <section className="bg-white">
      <Navbar />
      <Sidebar />
      <hr className="border-none bg-yellow h-1 w-[87%] mx-auto my-10 xl:my-0" />
      <div className="max-w-2xl mx-auto p-6 space-y-8 mt-16">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-neutral">Choose account type</h1>
          <p className="text-gray-500">Kindly choose the preferred account type to access.</p>
        </div>

        <div className="space-y-4">
          <a href="/login">
            <div
              className="bg-lightBlue border border-gray-200 rounded-lg p-4 hover:bg-secondary hover:text-white cursor-pointer transition-colors duration-200 flex items-center justify-between shadow-sm mb-10"
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
                  <h2 className="font-medium text-white">Personal account</h2>
                  <p className="text-sm text-gray-200">Login to your Payina personal account</p>
                </div>
              </div>
              {/* Chevron Right Icon */}
              <svg
                className="w-5 h-5 text-gray-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </a>

          <a href="/login">
            <div
              className="bg-lightBlue border border-gray-200 rounded-lg p-4 hover:bg-secondary hover:text-white cursor-pointer transition-colors duration-200 flex items-center justify-between shadow-sm"
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
                  <h2 className="font-medium text-white">Business account</h2>
                  <p className="text-sm text-gray-200">
                    <a href="/login" className="hover:underline">
                      Login to your business account
                    </a>
                  </p>
                </div>
              </div>
              {/* Chevron Right Icon */}
              <svg
                className="w-5 h-5 text-gray-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </a>
        </div>

        <div className="text-center text-neutral space-y-2 pt-8">
          <p className="text-secondary font-medium">Payina Financial Services Limited</p>
          <p className="text-sm text-gray-500">Licensed by the Central Bank of Nigeria (CBN)</p>
        </div>
      </div>
      {/*<Footer />*/}
    </section>
  );
};

export default SwitchAccount;
