import React from 'react';

const OrderReview = ({ planName, network, phoneNumber, planPrice, email }) => {
  return (
    <div className="w-4/5 mx-auto mb-10">
    {/*<div className="w-4/5 mx-auto mb-10">*/}
      <div className="w-full h-1 bg-yellow mb-32"></div>
      <button className="ml-[15.5%] text-primary text-center p-4 rounded-md w-[62%] bg-neutral mb-6">
        Review your Order
      </button>
      <ReviewItem label="Product" value={planName || 'N/A'} />
      {/*<ReviewItem label="Network" value={network} />*/}
      <ReviewItem label="Phone number" value={phoneNumber} />
      <ReviewItem label="Amount" value={planPrice || 'N/A'} />
      <ReviewItem label="Email" value={email} />
    </div>
  );
};

const ReviewItem = ({ label, value }) => (
  <div className="flex items-center mb-11">
    <p className="text-sm w-1/6">{label}</p>
    <div className="w-3/5 h-1 bg-yellow"></div>
    <p className="text-sm w-1/6 pl-14">{value}</p>
  </div>
);

export default OrderReview;