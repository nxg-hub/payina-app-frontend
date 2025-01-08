import React, { useState } from 'react';
import { Copy, Eye, EyeOff } from 'lucide-react';

export function CardDetails({ card }) {
  const [showDetails, setShowDetails] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Card Preview */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl text-white mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-medium">{card.title}</h2>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-full opacity-75" />
            <div className="w-8 h-8 bg-yellow-500 rounded-full opacity-75" />
          </div>
        </div>
        <div className="mb-6">
          <div className="font-mono text-xl mb-1">
            {showDetails ? card.number : '•••• •••• •••• ' + card.number.slice(-4)}
          </div>
          <div className="text-sm opacity-75">
            {showDetails ? card.expiry : '••/••'}
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm flex items-center opacity-75 hover:opacity-100"
        >
          {showDetails ? (
            <>
              <EyeOff className="w-4 h-4 mr-1" /> Hide Details
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1" /> Show Details
            </>
          )}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full p-3 flex justify-between items-center bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          View Card Details
          <Copy className="w-4 h-4" />
        </button>
        <button className="w-full p-3 flex justify-between items-center bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Fund Card
        </button>
        <button className="w-full p-3 flex justify-between items-center bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Withdraw
        </button>
        <button className="w-full p-3 flex justify-between items-center bg-red-600 text-white rounded-lg hover:bg-red-700">
          Terminate Card
        </button>
        <button className="w-full p-3 flex justify-between items-center bg-gray-600 text-white rounded-lg hover:bg-gray-700">
          Freeze Card
        </button>
      </div>
    </div>
  );
}

