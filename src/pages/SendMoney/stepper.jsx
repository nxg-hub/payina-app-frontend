import React from 'react';

const stepper = ({ currentStep, numberOfSteps }) => {
  const activeColor = (index) => (currentStep >= index ? 'bg-blue-500' : 'bg-customGray');
  const isFinalStep = (index) => index === numberOfSteps - 1;

  return (
    <div className="flex items-center">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className={`w-6 h-6 rounded-full drop-shadow-md ${activeColor(index)}`}></div>
          {isFinalStep(index) ? null : (
            <div className={`w-[150px] h-1 ${activeColor(index)}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default stepper;
