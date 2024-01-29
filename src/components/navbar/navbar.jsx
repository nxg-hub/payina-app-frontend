import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { LuX, LuMoveRight } from 'react-icons/lu';

import Button from '../../components/button/button';
import Logo from './_components/logo';
import ActionButtons from './_components/action-buttons';
import { Link, useLocation } from 'react-router-dom';
import CustomButton from '../../components/button/button';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState();
  const location = useLocation();
  const route = location.pathname;

  return (
    <div
      className={`flex items-center justify-between pr-10 lg:px-20 h-24 bg-[#000] text-primary ${
        route === '/business' ? 'bg-primary' : route === '/' ? 'bg-[#000]' : ''
      }`}>
      <div className="px-6 xl:px-4 flex space-x-8 items-center">
        <div className="w-40">
          <Logo />
        </div>
        <div className="md:space-x-6 hidden xl:flex">
          <Link to="/">
            <Button
              children="Personal"
              className='hover:scale-95 font-extrabold duration-300 center gap-2'
              backgroundColor={route === '/' ? '#00678F' : 'transparent'}
              textColor={route === '/business' ? '#000' : ''}
              border="none"
            />
          </Link>
          <Link to="/business">
            <Button
              children="Business"
              className='hover:scale-95 font-extrabold duration-300 center gap-2'
              backgroundColor={route === '/business' ? '#00678F' : 'transparent'}
              border="none"
            />
          </Link>
        </div>
      </div>

      <div className="items-center hidden xl:flex">
        <ActionButtons />
      </div>

      <div className="xl:hidden block cursor-pointer">
        <GiHamburgerMenu
          color={route === '/' ? '#fff' : route === '/business' ? '#000' : ''}
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
      </div>
      {toggleMenu && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#000] transition-all duration-150 flex flex-col z-10 justify-center items-center animate-slideBottom">
          <LuX
            className="text-2xl absolute top-5 right-6 cursor-pointer hover:text-lightBlue"
            fontSize={27}
            onClick={() => setToggleMenu(false)}
          />
          <ul className="list-none w-full px-4">
            <Logo />
            <hr className="z-20- h-6 my-8 text-yellow w-[70%] mx-auto" />
            <li className="m-6 mt-12 cursor-pointer text-primary text-xl">
              <div className="flex justify-between items-center">
                <Link to="/" className="hover:text-lightBlue font-semibold">
                  Personal
                </Link>
                <LuMoveRight />
              </div>
            </li>
            <li className="m-6 mt-12 cursor-pointer text-primary text-xl">
              <div className="flex justify-between items-center">
                <Link to="/business" className="hover:text-lightBlue font-semibold">
                  Business
                </Link>
                <LuMoveRight />
              </div>
            </li>
            <li className="m-6 mt-12 cursor-pointer text-primary text-xl">
              <div className="flex justify-between items-center">
                <Link to="#" className="hover:text-lightBlue font-semibold">
                  Features
                </Link>
                <LuMoveRight />
              </div>
            </li>
            
          </ul>
          <div className="flex space-x-10 absolute bottom-0 my-8">
            <Link to='/signup'>
            <Button className='hover:bg-lightBlue hover:scale-95 font-extrabold duration-300 center' children='Sign Up' />
            </Link>
            <Link to='/login'>
           <Button backgroundColor='transparent' className='hover:scale-95 font-extrabold duration-300 center gap-2' children='Login' />
           </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
