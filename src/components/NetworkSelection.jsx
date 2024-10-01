import React from 'react';
import { useNetworkSelection } from '../hooks/useNetworkSelection';

// eslint-disable-next-line react/prop-types
export const NetworkSelection = ({ selectedNetwork, onNetworkChange }) => {
  const { networks, isLoading, error } = useNetworkSelection();

  if (isLoading) return <p>Loading networks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <label htmlFor="network-select" className="block text-white mb-2">
        Network
      </label>
      <select
        id="network-select"
        value={selectedNetwork}
        onChange={(e) => onNetworkChange(e.target.value)}
        className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-full">
        <option value="">Select Network</option>
        {networks.map((network) => (
          <option key={network} value={network}>
            {network}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NetworkSelection;
