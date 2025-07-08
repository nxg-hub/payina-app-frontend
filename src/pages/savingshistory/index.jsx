import React from 'react';
import { Sidebar, Navbar } from '../Account/_components';
import Myhistory from './Myhistory';

const SavingsHistory = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Myhistory />
    </div>
  );
};

export default SavingsHistory;
