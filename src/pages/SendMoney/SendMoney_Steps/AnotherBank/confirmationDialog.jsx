import React from 'react';

const ConfirmationDialog = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
    <div className="bg-white p-4 rounded shadow-md">
      <h3>Do you want to save this beneficiary?</h3>
      <div className="mt-4">
        <button className="mr-2 text-green-500">Yes</button>
        <button className="text-red-500">No</button>
      </div>
    </div>
  </div>
);
export default ConfirmationDialog;
