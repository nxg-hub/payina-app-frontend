import React from 'react';
import Invite from './components/Invite';
import { Navbar, Sidebar } from '../_components';

const Freinds = () => {
  return (
    <div className="bg-primary">
      <>
        <Navbar />
        <Invite />
        <Sidebar />
      </>
    </div>
  );
};

export default Freinds;
