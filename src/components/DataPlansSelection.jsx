// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const DataPlansSelection = ({ plans, selectedPlan, onPlanChange, error }) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="dataPlans" className="text-sm">
        Select Data Plan
      </label>
      <select
        id="dataPlans"
        value={selectedPlan ? selectedPlan.slug : ''}
        onChange={(e) => {
          // eslint-disable-next-line react/prop-types
          const selected = plans.find((plan) => plan.slug === e.target.value);
          onPlanChange(selected);
        }}
        className="bg-white text-black rounded p-2" // Retained the dropdown styling.
      >
        <option value="">Select a plan</option>
        {/* eslint-disable-next-line react/prop-types */}
        {plans.map((plan) => (
          <option key={plan.id} value={plan.slug}>
            {plan.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default DataPlansSelection;
