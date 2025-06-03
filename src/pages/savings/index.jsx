import React from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import Save from './Save';

const Savings = () => {
  return (
    <div>
      <div className="">
        <Navbar />
        <Sidebar />
        <Save />
      </div>
    </div>
  );
};

export default Savings;
