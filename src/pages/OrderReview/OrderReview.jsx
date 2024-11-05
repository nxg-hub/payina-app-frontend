import React from 'react';

const OrderReview = ({ planName, network, phoneNumber, planPrice, email }) => {
  return (
    <div className="container">
      <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-8 bg-yellow"></div>
      <button className="text-primary mt-[25] text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
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
  <div className="flex px-5 gap-4">
    <p className="pt-8 pr-5 text-sm">{label}</p>
    <div className="w-[42%] mt-24 h-1 ml-5 border-none bg-yellow"></div>
    <p className="pt-8 pl-5 text-sm">{value}</p>
  </div>
);

export default OrderReview;
