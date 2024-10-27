import React from 'react';
import { Navbar, Sidebar } from '../_components';
import BillPaymentContent from './_components/billPayment';

const BillPayment = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <BillPaymentContent />
      </div>
    </div>
  );
};

export default BillPayment;
