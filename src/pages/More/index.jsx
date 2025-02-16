import React from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import More from './More';

const MoreOverview = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <More></More>
    </div>
  );
};

export default MoreOverview;
