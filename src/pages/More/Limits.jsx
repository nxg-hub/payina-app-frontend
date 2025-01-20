// AccountLimits.jsx
import React from 'react';
import { Navbar, Sidebar } from '../Account/_components';

const AccountLimits = () => {
  const tiers = [
    {
      name: 'Basic Tier',
      description: 'Suitable for new users with minimal requirements.',
      limits: {
        dailyLimit: '₦50,000',
        monthlyLimit: '₦200,000',
        transactionLimit: '₦20,000 per transaction',
      },
    },
    {
      name: 'Standard Tier',
      description: 'For users with moderate financial needs.',
      limits: {
        dailyLimit: '₦200,000',
        monthlyLimit: '₦1,000,000',
        transactionLimit: '₦100,000 per transaction',
      },
    },
    {
      name: 'Premium Tier',
      description: 'Designed for high-value transactions and business users.',
      limits: {
        dailyLimit: '₦1,000,000',
        monthlyLimit: 'Unlimited',
        transactionLimit: '₦500,000 per transaction',
      },
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Sidebar />
      <br />
      <div className="mt-16 ml-56">
      <h1 className=" text-3xl font-bold text-center text-secondary">Account Limits</h1>
      <p className="text-center text-neutral mt-4">
        Learn more about the limits applied to different account tiers based on financial applications.
      </p>

      <div className="max-w-4xl mx-auto mt-8 space-y-8">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className="bg-lightBlue p-6 rounded-lg shadow-md text-white">
            <h2 className="text-2xl font-semibold text-yellow">{tier.name}</h2>
            <p className="mt-2 text-gray-100">{tier.description}</p>
            <ul className="mt-4 space-y-2 text-gray-200">
              <li>
                <strong>Daily Limit:</strong> {tier.limits.dailyLimit}
              </li>
              <li>
                <strong>Monthly Limit:</strong> {tier.limits.monthlyLimit}
              </li>
              <li>
                <strong>Per Transaction Limit:</strong> {tier.limits.transactionLimit}
              </li>
            </ul>
          </div>
        ))}
      </div>
      </div>
      <br />
      {/*<Footer />*/}
    </div>
  );
};

export default AccountLimits;
