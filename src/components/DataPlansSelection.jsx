import React from 'react';

const DataPlansSelection = ({ plans, selectedPlan, onPlanChange, error }) => {
  return (
    <div className="flex flex-col gap-4">
      <select
        id="dataPlans"
        value={selectedPlan ? selectedPlan.slug : ''}
        onChange={(e) => {
          const selected = plans.find((plan) => plan.slug === e.target.value);
          onPlanChange(selected);
        }}
        className="bg-white text-black rounded border border-black p-2 flex flex-col w-[64%] mb-4"
      >
        <option value="">Select a plan</option>
        {plans.map((plan) => {
          // Add ₦100 service charge if plan.amount >= 1000 FOR TESTING ONLY
          const totalAmount = plan.amount >= 1000 ? plan.amount + 100 : plan.amount;

          return (
            <option key={plan.id} value={plan.slug}>
              {plan.name} - {plan.amount ? `${totalAmount} NGN` : 'Variable Amount'}
            </option>
          );
        })}
      </select>


      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default DataPlansSelection;
