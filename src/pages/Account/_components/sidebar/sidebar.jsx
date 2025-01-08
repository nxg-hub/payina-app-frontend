/* eslint-disable prettier/prettier */
// import { useEffect, useState } from 'react';
// import { AiOutlineAppstore, AiOutlineHome } from 'react-icons/ai';
// import { TbChecklist, TbUserDollar, TbSettings, TbCards } from 'react-icons/tb';
// import { LuFileClock } from 'react-icons/lu';
// import { RiFileSettingsLine, RiBillLine } from 'react-icons/ri';
// import { VscSignOut } from 'react-icons/vsc';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import images from '../../../../constants/images';
// import useLocalStorage from '../../../../hooks/useLocalStorage.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { persistor } from '../../../../Redux/Store.jsx';
// import { reSetUserDetails } from '../../../../Redux/UserSlice.jsx';
// import { BsThreeDots } from 'react-icons/bs';
// import Signout from '../../../signout.jsx';
//
// export const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const currentRoute = location.pathname;
//   // const [userName, setUserName] = useState('');
//   const [userImage, setUserImage] = useState('');
//   const [error, setError] = useState('');
//   const [newAuthToken] = useLocalStorage('authToken', '');
//   const [toggle, setToggle] = useState(false);
//
//   //getting the passportPic from the redux store
//   const userDetails = useSelector((state) => state.user.user);
//   const profilePic = userDetails.passportUrl;
//   const userName = userDetails.firstName;
//   const handleToggle = () => {
//     setToggle(!toggle);
//   };
//
//   // const handleLogout = () => {
//   //   localStorage.removeItem('userEmail');
//   //   persistor.purge(); // Clears all persisted state
//   //   dispatch(reSetUserDetails());
//   //   navigate('/');
//   // };
//   // useEffect(() => {
//   //   const fetchUserDetails = async () => {
//   //     if (!newAuthToken) {
//   //       setError('No auth token found');
//   //       return;
//   //     }
//
//   //     try {
//   //       const response = await fetch(import.meta.env.VITE_GET_USER, {
//   //         method: 'GET',
//   //         headers: {
//   //           Authorization: `Bearer ${newAuthToken}`,
//   //           'Content-Type': 'application/json',
//   //         },
//   //       });
//
//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         console.log('Fetched User Details:', data);
//   //         setUserName(data.payinaUserName || 'User');
//   //         setUserImage(data.passportUrl || '');
//   //         setError('');
//   //       } else {
//   //         setError('Failed to fetch user details');
//   //       }
//   //     } catch (err) {
//   //       setError('Error fetching user details');
//   //       console.error(err);
//   //     }
//   //   };
//
//   //   fetchUserDetails();
//   // }, [newAuthToken]);
//
//   return (
//     <div
//       style={{
//         overflowY: 'auto',
//         scrollbarWidth: 'none',
//         msOverflowStyle: 'none',
//       }}
//       className="bg-[#CCDFE6] fixed left-0 top-[5.5rem] w-[312px] h-[calc(100vh-5.5rem)] overflow-y-auto rounded-[10px] px-4 py-4 xl:block hidden scrollbar">
//       <div className="space-y-[52px] flex flex-col w-full pb-20">
//         <div className="flex flex-col justify-center items-center">
//           <div className="mb-20">
//             {userImage ? (
//               <img
//                 src={profilePic}
//                 // src={userImage}
//                 alt="profile image"
//                 className="w-24 h-24 rounded-full object-cover "
//                 onError={(e) => {
//                   e.target.src = images.Profile;
//                   console.log('Error loading passport image, using fallback');
//                 }}
//               />
//             ) : (
//               <img src={profilePic} alt="profile image" className="w-24 h-24 rounded-full" />
//             )}
//             <div className="font-semibold text-xl mt-2">
//               {error ? `Error: ${error}` : `Hi, ${userName}`}
//             </div>
//           </div>
//           <div className="space-y-[52px] flex flex-col w-full">
//             {isPersonalDashboard ? (
//               // Personal Dashboard Navigation
//               <>
//                 <Link
//                   to="/"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/personal/home' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <AiOutlineHome size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">Home</span>
//                 </Link>
//                 <Link
//                   to="/personal/dashboard"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/account/dashboard' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <AiOutlineAppstore size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">Dashboard</span>
//                 </Link>
//                 <Link
//                   to="/account/billers"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/personal/bills' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <RiBillLine size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">Bills</span>
//                 </Link>
//                 <Link
//                   to="/personal/cards"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/personal/cards' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <TbCards size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">Cards</span>
//                 </Link>
//                 <Link
//                   to="/account/transaction"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/personal/history' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <LuFileClock size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">History</span>
//                 </Link>
//                 <Link
//                   to="/account/more"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/personal/more' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <BsThreeDots size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">More</span>
//                 </Link>
//               </>
//             ) : (
//               // Business Dashboard Navigation
//               <>
//                 <Link
//                   to="/account/dashboard"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/account/dashboard' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <AiOutlineAppstore size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">Dashboard</span>
//                 </Link>
//                 <Link
//                   to="/account/invoice"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/account/invoice' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <TbChecklist size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">Invoice</span>
//                 </Link>
//                 <Link
//                   to="/account/payroll"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/account/payroll' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <TbUserDollar size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">Payroll</span>
//                 </Link>
//                 <Link
//                   to="/account/transaction"
//                   className={`flex items-center space-x-6 ${
//                     currentRoute === '/account/transaction' ? '!ml-3 font-bold text-lightBlue' : ''
//                   }`}>
//                   <LuFileClock size={22} />
//                   <span className="hover:text-lightBlue ease transition-colors">
//                     Transaction History
//                   </span>
//                 </Link>
//                 <>
//                   <div onClick={handleToggle} className={`cursor-pointer`}>
//                     <div
//                       className={`flex items-center space-x-6  ${
//                         currentRoute === '/account/inventory'
//                           ? '!ml-3 font-bold text-lightBlue'
//                           : ''
//                       }`}>
//                       <RiFileSettingsLine size={22} />
//                       <span className="hover:text-lightBlue ease transition-colors text-nowrap">
//                         Inventory Management
//                       </span>
//                     </div>
//                   </div>
//                   <div
//                     className={`${toggle ? 'h-[50px] overflow-visible' : 'h-0 overflow-hidden'} transition-all duration-300 flex-col space-y-3 !mt-[15px] `}>
//                     <Link to="/account/inventory" className="flex">
//                       <RiFileSettingsLine size={22} />
//                       <span className="hover:text-lightBlue ease transition-colors text-nowrap ">
//                         View/Update
//                       </span>
//                     </Link>
//                     <Link to="/account/inventoryAdd" className="flex">
//                       <RiFileSettingsLine size={22} />
//                       <span className="hover:text-lightBlue ease transition-colors text-nowrap ">
//                         Add
//                       </span>
//                     </Link>
//                   </div>
//                 </>
//               </>
//             )}
//
//             <Link
//               to="/account/settings"
//               className={`flex items-center space-x-6 ${
//                 currentRoute === '/account/settings' ? '!ml-3 font-bold text-lightBlue' : ''
//               }`}>
//               <TbSettings size={22} />
//               <span className="hover:text-lightBlue ease transition-colors">Account Settings</span>
//             </Link>
//             {/* <button
//               onClick={handleLogout}
//               className={`!mt-[10rem] flex items-center space-x-6 ${
//                 currentRoute === '/' ? '!ml-3 font-bold text-lightBlue' : ''
//               }`}>
//               <VscSignOut size={22} />
//               <span className="hover:text-lightBlue ease transition-colors">Sign Out</span>
//             </button> */}
//             <Signout />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Sidebar;

import { useState } from 'react';
// import { AiOutlineAppstore, AiOutlineHome } from 'react-icons/ai';
import { TbChecklist, TbUserDollar, TbSettings, TbCards } from 'react-icons/tb';
import { LuFileClock } from 'react-icons/lu';
import { RiFileSettingsLine, RiBillLine } from 'react-icons/ri';
import { VscSignOut } from 'react-icons/vsc';
import { MdVerified } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import images from '../../../../constants/images';
// import useLocalStorage from '../../../../hooks/useLocalStorage.js';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../../../Redux/Store.jsx';
import { reSetUserDetails } from '../../../../Redux/UserSlice.jsx';
import { BsThreeDots } from 'react-icons/bs';
// import Signout from '../../../signout.jsx';
// import Signout from '../../../signout.jsx';
import { resetCorporate } from '../../../../Redux/CoorperateCustomerSlice.jsx';
import { resetInventory } from '../../../../Redux/InventorySlice.jsx';
import { resetState } from '../../../../Redux/BusinessSignUpSlice.jsx';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentRoute = location.pathname;
  const [toggle, setToggle] = useState(false);
  // const [userImage, setUserImage] = useState('');
  // const [error, setError] = useState('');
  // const [newAuthToken] = useLocalStorage('authToken', '');
  // const [userType, setUserType] = useState('');
  // const [bvn, setBvn] = useState('');
  // const [nin, setNin] = useState('');
  // const [apiUserName, setApiUserName] = useState('');

  // Get user details from Redux store
  const userDetails = useSelector((state) => state.user.user);
  const profilePic = userDetails?.passportUrl;
  const userName = userDetails?.firstName;
  const bvn = userDetails?.bvn;
  // const nin = userDetails.nin;
  const userType = userDetails?.userType;
  const isPersonalDashboard = currentRoute === '/personal/dashboard';

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    persistor.purge(); // Clears all persisted state
    dispatch(reSetUserDetails());
    dispatch(resetCorporate());
    dispatch(resetInventory());
    dispatch(resetState());
    localStorage.clear();
    navigate('/login');
  };
  // console.log(profilePic);
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     if (!newAuthToken) {
  //       setError('No auth token found');
  //       return;
  //     }

  //     try {
  //       const response = await fetch(import.meta.env.VITE_GET_USER, {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${newAuthToken}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log('Fetched User Details:', data);
  //         setUserImage(data.passportUrl || '');
  //         setApiUserName(data.firstName || '');
  //         setUserType(data.userType || '');
  //         setBvn(data.bvn || '');
  //         setNin(data.nin || '');
  //         setError('');
  //       } else {
  //         setError('Failed to fetch user details');
  //       }
  //     } catch (err) {
  //       setError('Error fetching user details');
  //       console.error(err);
  //     }
  //   };

  //   fetchUserDetails();
  // }, [newAuthToken]);

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
                // src={userImage}
                alt="profile image"
                className="w-24 h-24 rounded-full object-cover "
                // onError={(e) => {
                //   e.target.src = images.Profile;
                //   console.log('Error loading passport image, using fallback');
                // }}
              />
            ) : (
              <img src={profilePic} alt="profile image" className="w-24 h-24 rounded-full" />
            )}
            <div className="font-semibold text-xl mt-2">{`Hi, ${userName}`}</div>
          </div>
          <div className="space-y-[52px] flex flex-col w-full">
            {isPersonalDashboard ? (
              // Personal Dashboard Navigation
              <>
                <Link
                  to="/"
                  className={`flex items-center space-x-6 ${
                    currentRoute === '/personal/home' ? '!ml-3 font-bold text-lightBlue' : ''
                  }`}>
                  {/* <AiOutlineHome size={22} /> */}
                  <span className="hover:text-lightBlue ease transition-colors">Home</span>
                </Link>
                <Link
                  to="/personal/dashboard"
                  className={`flex items-center space-x-6 ${
                    currentRoute === '/account/dashboard' ? '!ml-3 font-bold text-lightBlue' : ''
                  }`}>
                  {/* <AiOutlineAppstore size={22} /> */}
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
            ) : (
              // Business Dashboard Navigation
              <>
                <Link
                  to="/account/dashboard"
                  className={`flex items-center space-x-6 ${
                    currentRoute === '/account/dashboard' ? '!ml-3 font-bold text-lightBlue' : ''
                  }`}>
                  {/* <AiOutlineAppstore size={22} /> */}
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
                  <span className="hover:text-lightBlue ease transition-colors">
                    Transaction History
                  </span>
                </Link>
                <>
                  <div onClick={handleToggle} className={`cursor-pointer`}>
                    <div
                      className={`flex items-center space-x-6  ${
                        currentRoute === '/account/inventory'
                          ? '!ml-3 font-bold text-lightBlue'
                          : ''
                      }`}>
                      <RiFileSettingsLine size={22} />
                      <span className="hover:text-lightBlue ease transition-colors text-nowrap">
                        Inventory Management
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${toggle ? 'h-[50px] overflow-visible' : 'h-0 overflow-hidden'} transition-all duration-300 flex-col space-y-3 !mt-[15px] `}>
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
            )}

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
            {/* <Signout /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
