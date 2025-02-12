import { useEffect, useState } from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { TbChecklist, TbUserDollar, TbSettings, TbCards } from 'react-icons/tb';
import { LuFileClock } from 'react-icons/lu';
import { VscSignOut } from 'react-icons/vsc';
import { MdVerified } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import images from '../../../../constants/images';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../../../Redux/Store.jsx';
import { reSetUserDetails } from '../../../../Redux/UserSlice.jsx';
import { RiFileSettingsLine, RiBillLine } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import { resetCorporate } from '../../../../Redux/CoorperateCustomerSlice.jsx';
import { resetInventory } from '../../../../Redux/InventorySlice.jsx';
import { resetState, resetToken } from '../../../../Redux/BusinessSignUpSlice.jsx';
import { clearState } from '../../../../Redux/ForgotPasswordSlice.jsx';
import { reSetClientsDetails } from '../../../../Redux/GetClientsSlice.jsx';
import { reSetWalletDetails } from '../../../../Redux/WalletSlice.jsx';
import { resetTransactions } from '../../../../Redux/transactionsSlice.jsx';

export const MobileSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentRoute = location.pathname;
  const [toggle, setToggle] = useState(false);

  // Get user details from Redux store
  const userDetails = useSelector((state) => state.user.user);
  const profilePic = userDetails?.passportUrl;
  const userName = userDetails?.firstName;
  const bvn = userDetails?.bvn;
  const userType = userDetails?.userType;

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    localStorage.removeItem('userEmail');
    persistor.purge();
    dispatch(reSetUserDetails());
    dispatch(resetCorporate());
    dispatch(resetInventory());
    dispatch(resetState());
    dispatch(resetToken());
    dispatch(clearState());
    dispatch(reSetClientsDetails());
    dispatch(reSetWalletDetails());
    dispatch(resetTransactions());
  };

  const renderSidebarContent = () => {
    if (userType === 'PERSONAL') {
      return (
        <>
          <Link
            to="/account/dashboard"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/dashboard' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <AiOutlineAppstore size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Dashboard</span>
          </Link>
          <Link
            to="/account/billers"
            className={`flex items-center space-x-6 ${
              currentRoute === '/personal/bills' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <RiBillLine size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Bills</span>
          </Link>
          <Link
            to="/personal/cards"
            className={`flex items-center space-x-6 ${
              currentRoute === '/personal/cards' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <TbCards size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Cards</span>
          </Link>
          <Link
            to="/account/transaction"
            className={`flex items-center space-x-6 ${
              currentRoute === '/personal/history' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <LuFileClock size={22} />
            <span className="hover:text-lightBlue ease transition-colors">History</span>
          </Link>
          <Link
            to="/account/more"
            className={`flex items-center space-x-6 ${
              currentRoute === '/personal/more' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <BsThreeDots size={22} />
            <span className="hover:text-lightBlue ease transition-colors">More</span>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link
            to="/account/dashboard"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/dashboard' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <AiOutlineAppstore size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Dashboard</span>
          </Link>
          <Link
            to="/account/invoice"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/invoice' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <TbChecklist size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Invoice</span>
          </Link>
          <Link
            to="/account/payroll"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/payroll' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <TbUserDollar size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Payroll</span>
          </Link>
          <Link
            to="/account/transaction"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/transaction' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <LuFileClock size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Transaction History</span>
          </Link>
          <>
            <div onClick={handleToggle} className={`cursor-pointer`}>
              <div
                className={`flex items-center space-x-6  ${
                  currentRoute === '/account/inventory' ? '!ml-3 font-bold text-lightBlue' : ''
                }`}>
                <RiFileSettingsLine size={22} />
                <span className="hover:text-lightBlue ease transition-colors text-nowrap">
                  Inventory Management
                </span>
              </div>
            </div>
            <div
              className={`${
                toggle ? 'h-[50px] overflow-visible' : 'h-0 overflow-hidden'
              } transition-all duration-300 flex-col space-y-3 !mt-[15px] `}>
              <Link to="/account/inventory" className="flex">
                <RiFileSettingsLine size={22} />
                <span className="hover:text-lightBlue ease transition-colors text-nowrap ">
                  View/Update
                </span>
              </Link>
              <Link to="/account/inventoryAdd" className="flex">
                <RiFileSettingsLine size={22} />
                <span className="hover:text-lightBlue ease transition-colors text-nowrap ">
                  Add
                </span>
              </Link>
            </div>
          </>
        </>
      );
    }
  };

  return (
    <div className="bg-[#CCDFE6] fixed left-0 top-[5.5rem] w-[312px] h-[calc(100vh-5.5rem)] overflow-y-auto rounded-[10px] px-4 py-4 xl:hidden block scrollbar">
      <div className="space-y-[52px] flex flex-col w-full pb-20">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-20">
            {profilePic ? (
              <img
                src={profilePic}
                alt="profile image"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <img src={images.Profile} alt="profile image" className="w-24 h-24 rounded-full" />
            )}
            <div className="font-semibold text-xl mt-2">{`Hi, ${userName}`}</div>
            {(!bvn || bvn === '') && (
              <Link
                to="/verify"
                className="flex items-center space-x-1 text-red-500 mt-2 justify-center">
                <MdVerified size={16} />
                <span className="text-sm">Verify Now</span>
              </Link>
            )}
          </div>
          <div className="space-y-[52px] flex flex-col w-full">
            {renderSidebarContent()}
            <Link
              to="/account/settings"
              className={`flex items-center space-x-6 ${
                currentRoute === '/account/settings' ? '!ml-3 font-bold text-lightBlue' : ''
              }`}>
              <TbSettings size={22} />
              <span className="hover:text-lightBlue ease transition-colors">Account Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className={`!mt-[10rem] flex items-center space-x-6 ${
                currentRoute === '/' ? '!ml-3 font-bold text-lightBlue' : ''
              }`}>
              <VscSignOut size={22} />
              <span className="hover:text-lightBlue ease transition-colors">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
