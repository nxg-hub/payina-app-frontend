import { useState, useEffect } from 'react';
import { TbChecklist, TbUserDollar, TbSettings, TbCards } from 'react-icons/tb';
import { LuFileClock } from 'react-icons/lu';
import { RiFileSettingsLine, RiBillLine } from 'react-icons/ri';
import { VscSignOut } from 'react-icons/vsc';
import { MdVerified } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../../../Redux/Store.jsx';
import { reSetUserDetails } from '../../../../Redux/UserSlice.jsx';
import { BsThreeDots } from 'react-icons/bs';
import { resetCorporate } from '../../../../Redux/CoorperateCustomerSlice.jsx';
import { resetInventory } from '../../../../Redux/InventorySlice.jsx';
import { AiOutlineAppstore } from 'react-icons/ai';
import { resetState, resetToken } from '../../../../Redux/BusinessSignUpSlice.jsx';
import { clearState } from '../../../../Redux/ForgotPasswordSlice.jsx';
import { reSetClientsDetails } from '../../../../Redux/GetClientsSlice.jsx';
import { reSetWalletDetails } from '../../../../Redux/WalletSlice.jsx';
import avatar from '../../../../assets/images/avatar.png';
import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import { resetTransactions } from '../../../../Redux/transactionsSlice.jsx';
import { resetPayroll } from '../../../../Redux/payrollSlice.jsx';
import { resetsavings } from '../../../../Redux/savingsSlice.jsx';
import { resetSavingStatement } from '../../../../Redux/savingsStatementSlice.jsx';
import { resetLoan } from '../../../../Redux/loanSlice.jsx';

export const Sidebar = ({ openModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentRoute = location.pathname;
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newAuthToken] = useLocalStorage('authToken', '');

  // Get user details from Redux store
  const userDetails = useSelector((state) => state.user.user);
  const profilePic = userDetails?.passportUrl;
  const userName = userDetails?.firstName;
  const userType = userDetails?.userType;

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    persistor.purge();
    dispatch(reSetUserDetails());
    dispatch(resetCorporate());
    dispatch(resetInventory());
    dispatch(resetToken());
    dispatch(resetState());
    dispatch(clearState());
    dispatch(reSetClientsDetails());
    dispatch(reSetWalletDetails());
    dispatch(resetTransactions());
    dispatch(resetPayroll());
    dispatch(resetsavings());
    dispatch(resetSavingStatement());
    dispatch(resetLoan());
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
          {/*<Link*/}
          {/*  to="/personal/cards"*/}
          {/*  className={`flex items-center space-x-6 ${*/}
          {/*    currentRoute === '/personal/cards' ? '!ml-3 font-bold text-lightBlue' : ''*/}
          {/*  }`}>*/}
          {/*  <TbCards size={22} />*/}
          {/*  <span className="hover:text-lightBlue ease transition-colors">Cards</span>*/}
          {/*</Link>*/}
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
            <div onClick={handleToggle} className="cursor-pointer">
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
              } transition-all duration-300 flex-col space-y-3 !mt-[15px] ml -auto`}>
              <Link to="/account/inventory" className="flex items-center space-x-7">
                <RiFileSettingsLine size={22} />
                <span className="hover:text-lightBlue ease transition-colors text-nowrap ">
                  View/Update
                </span>
              </Link>
              <Link to="/account/inventoryAdd" className="flex  items-center space-x-7">
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
    <div
      style={{
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      className="bg-[#CCDFE6] fixed left-0 top-[5.5rem] w-[312px] h-[calc(100vh-5.5rem)] overflow-y-auto rounded-[10px] px-4 py-4 xl:block hidden scrollbar">
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
              <img src={avatar} alt="profile image" className="w-24 h-24 rounded-full" />
            )}
            <div className="font-semibold text-xl mt-2">{`Hi, ${userName ? userName : ''}`}</div>
            {(!userDetails?.bvn || userDetails?.bvn === '') && (
              <div
                onClick={openModal}
                // to="/verify"
                className="flex items-center space-x-1 text-red-500 mt-2 justify-center cursor-pointer">
                <MdVerified size={16} />
                <span className="text-sm">Verify Now</span>
              </div>
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
            <Link
              to="/account/freinds"
              className={`flex items-center space-x-6 ${
                currentRoute === '/account/freinds' ? '!ml-3 font-bold text-lightBlue' : ''
              }`}>
              <TbUserDollar size={22} />
              <span className="hover:text-lightBlue ease transition-colors">Friends</span>
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

export default Sidebar;
