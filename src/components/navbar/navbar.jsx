import React from 'react';
import Button from '../../components/button/button';
import Logo from './_components/logo';
import ActionButtons from './_components/action-buttons';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const route = location.pathname;
  return (
    <div
      className={`flex items-center justify-between pr-10 lg:px-20 h-24 bg-[#000] text-primary ${
        route === '/business' ? 'bg-primary' : route === '/' ? 'bg-[#000]' : ''
      }`}>
      <div className="px-4 flex space-x-8 items-center">
        <div className="w-40">
          <Logo />
        </div>
        <div className="md:space-x-6 flex">
          <Link to="/">
            <Button
              children="Personal"
              backgroundColor={route === '/' ? '#00678F' : 'transparent'}
              textColor={route === '/business' ? '#000' : ''}
              border="none"
            />
          </Link>
          <Link to="/business">
            <Button
              children="Business"
              backgroundColor={route === '/business' ? '#00678F' : 'transparent'}
              border="none"
            />
          </Link>
        </div>
      </div>

      <div className="items-center">
        <ActionButtons />
      </div>
    </div>
  );
};

export default Navbar;
