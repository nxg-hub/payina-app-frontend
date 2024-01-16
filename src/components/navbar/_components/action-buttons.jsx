import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../button/button';

const ActionButtons = () => {
  const location = useLocation();
  const route = location.pathname;
  return (
    <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
      <div className="flex xl:space-x-6">
        <Link href={'/pricing'} className="xl:flex items-center hidden">
          <div className={`hover:scale-95 font-extrabold duration-300 flex ${route === '/business' ? 'text-[#000]' : ''}`}>
            Features
          </div>
        </Link>
      </div>

      <div className="flex lg-space-x-4 gap-4 items-center">
        <Link to={'/signup'}>
          <Button
            children="Sign Up"
            className='hover:bg-lightBlue hover:scale-95 font-extrabold duration-300 center gap-2'
            backgroundColor={ route === '/signup' ? '#00678F' : route === '/business' ? '#00678f' : ''}
          />
        </Link>
        <Link to={'/login'}>
          <Button
            children="Login"
            className='hover:!bg-lightBlue hover:!text-primary hover:scale-95 font-extrabold duration-300 center gap-2'
            backgroundColor={
              route === '/login' ? '#00678F' : route === '/business' ? 'transparent' : ''
            }
            textColor={route === '/business' ? '#000' : ''}
          />
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;
