import React from 'react';
import Button from '../../components/button/button';
import Logo from './_components/logo';
import ActionButtons from './_components/action-buttons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between pr-10 lg:px-20 h-24 bg-[#000] text-primary">
      <div className="px-4 flex space-x-8 items-center">
        <div className="w-40">
          <Logo />
        </div>
        <div className="md:space-x-6 flex">
          <Link to="/">
            <Button children="Personal" border="none" />
          </Link>
          <Link to="/business">
            <Button children="Business" backgroundColor="transparent" border="none" />
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
