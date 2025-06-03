import { Link } from 'react-router-dom';
import { images } from '../../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// import { BsBank } from 'react-icons/bs';
// import { PiPiggyBankFill } from 'react-icons/pi';
// import { openModal } from '../../../../../Redux/modalSlice';

const QuickAction = () => {
  // const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const userDetails = useSelector((state) => state.user.user);
  const userType = userDetails?.userType;

  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      {isVisible && (
        <div className="p-4 bg-yellow-300 text-center text-lg font-bold shadow-md mt-2">
          🚀 Get Extra Data & Airtime! Use Our Bills Service Now! 🎉
          <span>
            <button
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => setIsVisible(false)}>
              Dismiss
            </button>
            <Link to={'/account/billers'}>
              <button className="ml-4 bg-secondary text-white px-3 py-1 rounded">Pay Bills</button>
            </Link>
          </span>
        </div>
      )}
      <div className="opacity-70 font-bold text-lightBlue py-4 text-sm md:text-base">
        Quick Actions
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-auto">
        <div className="flex font-bold bg-[#F3F3F3] flex-1 h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
          <div className="flex justify-start items-center gap-8 xl:gap-16">
            <div className="bg-primary rounded-full">
              <img src={images.SendMoney} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
            </div>
            <Link
              to={'/sendMoney'}
              className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
              Send Money
            </Link>
          </div>
        </div>

        <div className="flex font-bold bg-[#F3F3F3] flex-1  h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
          <div className="flex justify-start items-center gap-8 xl:gap-16">
            <div className="bg-primary rounded-full">
              <img src={images.AddMoney} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
            </div>
            <Link
              to={'/addMoney'}
              className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
              Add Money
            </Link>
          </div>
        </div>
        {/* <div
          onClick={() => {
            dispatch(openModal());
          }}
          className="flex font-bold bg-[#F3F3F3] flex-1  h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
          <div className="flex justify-start items-center gap-8 xl:gap-16">
            <div className="bg-primary p-2 rounded-full">
              <BsBank size={24} className="text-blue-800" />
            </div>
            <Link
              to={'/loan'}
              className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
              Loan
            </Link>
          </div>
        </div> */}
        {/* <div className="flex font-bold bg-[#F3F3F3] flex-1  h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
          <div className="flex justify-start items-center gap-8 xl:gap-16">
            <div className="bg-primary p-2 rounded-full">
              <PiPiggyBankFill className="text-blue-800" size={24} />
            </div>
            <Link
              to={'/savings'}
              className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
              Savings
            </Link>
          </div>
        </div> */}
        {userType === 'PERSONAL' && (
          <div className="flex font-bold bg-[#F3F3F3] h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
            <div className="flex justify-start items-center gap-4">
              <div className="bg-primary rounded-full">
                <img src={images.Scan} className="w-[39px] md:w-[49px] p-2 bg-center" alt="" />
              </div>
              <Link
                to="/scan"
                className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
                Scan to Pay
              </Link>
            </div>
          </div>
        )}
        {userType === 'CORPORATE' && (
          <div className="flex font-bold bg-[#F3F3F3] w-full flex-nowrap flex-1 h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
            <div className="flex justify-start items-center gap-8 xl:gap-16">
              <div className="bg-primary rounded-full">
                <img src={images.Invoice} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
              </div>
              <Link
                to="/account/invoice"
                className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
                Create New Invoice
              </Link>
            </div>
          </div>
        )}
        <div className="flex font-bold bg-[#F3F3F3] flex-1  h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
          <div className="flex justify-start items-center gap-8 xl:gap-16">
            <div className="bg-primary rounded-full">
              <img src={images.Bills} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
            </div>
            <Link
              to={'/account/billers'}
              className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
              Pay Bills
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
