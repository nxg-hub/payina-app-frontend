import React from 'react';

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4">
          {children}
        </div>
        <div className="flex justify-end p-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
