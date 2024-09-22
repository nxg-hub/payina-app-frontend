import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoValidSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-8 bg-yellow"></div>
      <p className="text-red-500 text-center">No valid plan selected. Please go back and select a plan.</p>
      <button
        className="text-primary mb-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
        onClick={() => navigate('/data')}
      >
        Go Back to Plan Selection
      </button>
    </div>
  );
};

export default NoValidSelection;