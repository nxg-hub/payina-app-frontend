import React from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import SendMoneySteps from './SendMoney_Steps/index';

const SendMoney = () => {
  return (
    <div className="">
      <Navbar />
      <Sidebar />
      <SendMoneySteps />
    </div>
  );
};

export default SendMoney;
