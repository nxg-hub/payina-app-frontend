import React from 'react';

const PlanItem = ({ plan, selectedPlan, onClick }) => (
  <div
    className={`flex-col flex-1 min-w-[calc(33.333%-16px)] cursor-pointer ${selectedPlan === plan.id ? 'bg-lightBlue text-white' : ''}`}
    onClick={onClick}
  >
    <p className="text-sm text-lightBlue">{plan.name}</p>
    <p className="text-xs">
      NGN<span className="text-sm">{plan.amount || 'N/A'}</span>
    </p>
  </div>
);

export default PlanItem;
