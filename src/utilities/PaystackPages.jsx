import React, { useState } from 'react';

const PaystackPayment = ({
                           amount,
                           email,
                           onSuccess,
                           onError,
                           onClose,
                           metadata = {},
                           isProcessing,
                           buttonText = "Pay Now",
                           buttonClassName = "mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                         }) => {
  const [statusMessage, setStatusMessage] = useState('');

  const initializePayment = () => {
    try {
      setStatusMessage('Initializing payment...');

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: 'VITE_PAYSTACK_PUBLIC_KEY',
        email,
        amount: amount * 100, // Convert to kobo/cents
        currency: 'NGN',
        ref: `ref-${Math.floor(Math.random() * 1000000000 + 1)}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Payment Type",
              variable_name: "payment_type",
              value: metadata.paymentType || "wallet_funding"
            },
            ...Object.entries(metadata).map(([key, value]) => ({
              display_name: key,
              variable_name: key,
              value: value
            }))
          ]
        },
        onSuccess: (transaction) => {
          setStatusMessage('Payment successful!');
          onSuccess(transaction);
        },
        onCancel: () => {
          setStatusMessage('');
          onClose?.();
        },
      });
    } catch (error) {
      setStatusMessage('');
      onError(error);
    }
  };

  return (
    <div className="inline-payment-container">
      {statusMessage && (
        <p className="text-blue-500 mb-4">{statusMessage}</p>
      )}
      <button
        onClick={initializePayment}
        disabled={isProcessing}
        className={buttonClassName}
      >
        {isProcessing ? 'Processing...' : buttonText}
      </button>
    </div>
  );
};

export default PaystackPayment;