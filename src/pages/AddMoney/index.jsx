import React from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import AddMoneyStep from './AddMoneyStep';

const AddMoney = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <AddMoneyStep></AddMoneyStep>
    </div>
  );
};

export default AddMoney;
