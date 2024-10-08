import { AiOutlineAppstore } from 'react-icons/ai';
import { TbChecklist, TbUserDollar, TbSettings } from 'react-icons/tb';
import { LuFileClock } from 'react-icons/lu';
import { RiFileSettingsLine } from 'react-icons/ri';
import { VscSignOut } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';
import images from '../../../../constants/images';

export const Sidebar = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  return (
    <div className="bg-[#CCDFE6] float-left rounded-[10px] px-10 py-4 mt-[5.5rem] fixed w-[312px] h-[100vh] xl:block hidden">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-20">
          <img src={images.Profile} alt="profile image" />
          <div className="font-semibold text-xl mt-2">Hi, Jakyyy</div>
        </div>
        <div className="space-y-[52px] flex flex-col w-full">
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
          <Link
            to="/account/inventory"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/inventory' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <RiFileSettingsLine size={22} />
            <span className="hover:text-lightBlue ease transition-colors text-nowrap">
              Inventory Management
            </span>
          </Link>
          <Link
            to="/account/settings"
            className={`flex items-center space-x-6 ${
              currentRoute === '/account/settings' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <TbSettings size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Account Settings</span>
          </Link>
          <Link
            to="/"
            className={`!mt-[10rem] flex items-center space-x-6 ${
              currentRoute === '/' ? '!ml-3 font-bold text-lightBlue' : ''
            }`}>
            <VscSignOut size={22} />
            <span className="hover:text-lightBlue ease transition-colors">Sign Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
