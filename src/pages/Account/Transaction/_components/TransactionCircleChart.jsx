import React, { useState } from 'react';

const TransactionCircleChart = ({ debitPercentage, creditPercentage, totalDebit, totalCredit }) => {
  const [showDebitTooltip, setShowDebitTooltip] = useState(false);
  const [showCreditTooltip, setShowCreditTooltip] = useState(false);

  const size = 200;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 80;
  const strokeWidth = 30;

  const circumference = 2 * Math.PI * radius;

  const debitArcLength = (debitPercentage / 100) * circumference;
  const creditArcLength = (creditPercentage / 100) * circumference;

  const debitDashArray = `${debitArcLength} ${circumference}`;
  const debitDashOffset = 0;

  const creditDashArray = `${creditArcLength} ${circumference}`;
  const creditDashOffset = -debitArcLength;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(0);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(num);
  };

  const debitLabelPos = {
    x: centerX - radius * Math.cos(Math.PI / 4),
    y: centerY + radius * Math.sin(Math.PI / 4),
  };

  const creditLabelPos = {
    x: centerX + radius * Math.cos(Math.PI / 4),
    y: centerY + radius * Math.sin(Math.PI / 4),
  };

  return (
    <div className="transaction-circle-chart relative">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
        />

        {/* Debit segment (red) - starts from top */}
        {debitPercentage > 0 && (
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#FF3B30"
            strokeWidth={strokeWidth}
            strokeDasharray={debitDashArray}
            strokeDashoffset={debitDashOffset}
            transform={`rotate(90 ${centerX} ${centerY})`}
            strokeLinecap="round"
          />
        )}

        {/* Credit segment (green) - starts where debit ends */}
        {creditPercentage > 0 && (
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#4CD964"
            strokeWidth={strokeWidth}
            strokeDasharray={creditDashArray}
            strokeDashoffset={creditDashOffset}
            transform={`rotate(90 ${centerX} ${centerY})`}
            strokeLinecap="round"
          />
        )}

        {debitPercentage > 0 && (
          <g
            onMouseEnter={() => setShowDebitTooltip(true)}
            onMouseLeave={() => setShowDebitTooltip(false)}
            style={{ cursor: 'pointer' }}>
            <rect
              x={debitLabelPos.x - 30}
              y={debitLabelPos.y - 15}
              width="60"
              height="30"
              rx="15"
              fill="#FF3B30"
            />
            <text
              x={debitLabelPos.x}
              y={debitLabelPos.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold">
              {formatNumber(totalDebit)}
            </text>

            {showDebitTooltip && (
              <foreignObject
                x={debitLabelPos.x - 50}
                y={debitLabelPos.y - 50}
                width="100"
                height="40"
                style={{ overflow: 'visible', zIndex: 100 }}>
                <div
                  className="tooltip"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1000,
                  }}>
                  Sent: {formatCurrency(totalDebit)}
                </div>
              </foreignObject>
            )}
          </g>
        )}

        {creditPercentage > 0 && (
          <g
            onMouseEnter={() => setShowCreditTooltip(true)}
            onMouseLeave={() => setShowCreditTooltip(false)}
            style={{ cursor: 'pointer' }}>
            {/* Green credit label */}
            <rect
              x={creditLabelPos.x - 30}
              y={creditLabelPos.y - 15}
              width="60"
              height="30"
              rx="15"
              fill="#4CD964"
            />
            <text
              x={creditLabelPos.x}
              y={creditLabelPos.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold">
              {formatNumber(totalCredit)}
            </text>

            {/* Credit Tooltip */}
            {showCreditTooltip && (
              <foreignObject
                x={creditLabelPos.x - 50}
                y={creditLabelPos.y - 50}
                width="100"
                height="40"
                style={{ overflow: 'visible', zIndex: 100 }}>
                <div
                  className="tooltip"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1000,
                  }}>
                  Received: {formatCurrency(totalCredit)}
                </div>
              </foreignObject>
            )}
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <p className="text-sm">Sent {debitPercentage.toFixed(1)}%</p>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <p className="text-sm">Received {creditPercentage.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCircleChart;
