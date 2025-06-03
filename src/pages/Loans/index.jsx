import React from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import Loan from './Loan';

const Loans = () => {
  return (
    <div>
      <div className="">
        <Navbar />
        <Sidebar />
        <Loan />
      </div>
    </div>
  );
};

export default Loans;
