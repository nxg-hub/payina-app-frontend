import React from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import Fund from './Fund';
const FundSavings = () => {
  return (
    <div>
      <div>
        <Navbar />
        <Sidebar />
        <Fund />
      </div>
    </div>
  );
};

export default FundSavings;
