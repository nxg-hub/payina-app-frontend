import React from 'react';
import { Phone, Wifi, Zap, Sliders } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BillOption = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-4 p-4 bg-blue-100 rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
    <div className="p-2 bg-white rounded-full border-2 border-white">
      <div className="text-blue-500">{icon}</div>
    </div>
    <span className="text-gray-700 font-medium">{label}</span>
  </button>
);

const BillOptions = () => {
  const navigate = useNavigate();
  const handleClick = (label) => {
    console.log(`Clicked on ${label}`);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto ml-[25%] w-3/4">
          <div className="space-y-4 mt-20">
            <BillOption
              icon={<Phone size={24} />}
              label="Airtime"
              onClick={() => navigate('/account/airtime')}
            />
            <BillOption
              icon={<Wifi size={24} />}
              label="Data"
              onClick={() => navigate('/account/data')}
            />
            <BillOption
              icon={<Zap size={24} />}
              label="Electricity"
              onClick={() => navigate('/account/electricity')}
            />
            <BillOption
              icon={<Sliders size={24} />}
              label="Custom Bill"
              onClick={() => navigate('/account/bills')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillOptions;