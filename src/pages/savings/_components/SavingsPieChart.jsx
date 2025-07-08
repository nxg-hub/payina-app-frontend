import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#006181', '#e0e0e0']; // green = saved, gray = remaining

const SavingsPieChart = ({ target, saved }) => {
  const remaining = target - saved;

  const data = [
    { name: 'Saved', value: saved },
    { name: 'Remaining', value: remaining > 0 ? remaining : 0 },
  ];

  const percentage = Math.floor((saved / target) * 100);

  return (
    <div className="w-full max-w-xs mx-auto text-center relative left-[20%] md:left-[15%]">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          innerRadius={45}
          outerRadius={65}
          paddingAngle={2}
          dataKey="value"
          startAngle={90}
          endAngle={-270}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-base font-bold text-gray-800">{percentage}%</div>
        {/* <div className="text-xs text-gray-500">of ₦{target.toLocaleString()} saved</div> */}
      </div>
    </div>
  );
};

export default SavingsPieChart;
