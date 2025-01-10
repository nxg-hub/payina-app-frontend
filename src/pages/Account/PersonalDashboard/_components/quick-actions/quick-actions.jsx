// import { Link } from 'react-router-dom';
// import { images } from '../../../../../constants';
//
// const QuickAction = () => {
//   return (
//     <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
//       <div className="opacity-70 font-bold text-lightBlue py-4 text-sm md:text-base">
//         Quick Actions
//       </div>
//       <div className="flex flex-col md:flex-row md:gap-0 gap-3 md:space-x-4 w-auto sm:flex-row sm:space-x-3">
//         <div
//           className="flex font-bold bg-[#F3F3F3] flex-1 h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
//           <div className="flex justify-start items-center gap-8 xl:gap-16">
//             <div className="bg-primary rounded-full">
//               <img src={images.SendMoney} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
//             </div>
//             <Link
//               to="/sendMoney"
//               className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
//               Send Money
//             </Link>
//           </div>
//         </div>
//         <div
//           className="flex font-bold bg-[#F3F3F3] flex-1  h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
//           <div className="flex justify-start items-center gap-8 xl:gap-16">
//             <div className="bg-primary rounded-full">
//               <img src={images.AddMoney} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
//             </div>
//             <Link
//               to="/addmoney"
//               className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
//               Add Money
//             </Link>
//           </div>
//         </div>
//         <div
//           className="flex font-bold bg-[#F3F3F3] w-full flex-nowrap flex-1 h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
//           <div className="flex justify-start items-center gap-8 xl:gap-16">
//             <div className="bg-primary rounded-full">
//               <img src={images.Invoice} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
//             </div>
//             <Link
//               to="/account/invoice"
//               className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
//               Consumer Loans
//             </Link>
//           </div>
//         </div>
//         <div
//           className="flex font-bold bg-[#F3F3F3] w-full flex-nowrap flex-1 h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
//           <div className="flex justify-start items-center gap-8 xl:gap-16">
//             <div className="bg-primary rounded-full">
//               <img src={images.Scan} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
//             </div>
//             <Link
//               to="/"
//               className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
//               Scan to Pay
//             </Link>
//           </div>
//         </div>
//         <div
//           className="flex font-bold bg-[#F3F3F3] w-full flex-nowrap flex-1 h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
//           <div className="flex justify-start items-center gap-8 xl:gap-16">
//             <div className="bg-primary rounded-full">
//               <img src={images.Code} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
//             </div>
//             <Link
//               to="/"
//               className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
//               Pay Code
//             </Link>
//           </div>
//         </div>
//         <div
//           className="flex font-bold bg-[#F3F3F3] flex-1  h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
//           <div className="flex justify-start items-center gap-8 xl:gap-16">
//             <div className="bg-primary rounded-full">
//               <img src={images.Bills} className="md:w-[49px] w-[39px] p-2  bg-center" alt="" />
//             </div>
//             <Link
//               to="/account/billers"
//               className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
//               Pay Bills
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default QuickAction;


import { Link } from 'react-router-dom';
import { images } from '../../../../../constants';

const QuickAction = () => {
  return (
    <div className="px-4 md:px-6 pb-4 w-80% ml-0 xl:ml-[19.5rem]">
      <div className="opacity-70 font-bold text-lightBlue py-4 text-sm md:text-base">
        Quick Actions
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex font-bold bg-[#F3F3F3] h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-primary rounded-full">
              <img src={images.SendMoney} className="w-[39px] md:w-[49px] p-2 bg-center" alt="" />
            </div>
            <Link
              to="/sendMoney"
              className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
              Send Money
            </Link>
          </div>
        </div>

        <div className="flex font-bold bg-[#F3F3F3] h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-primary rounded-full">
              <img src={images.AddMoney} className="w-[39px] md:w-[49px] p-2 bg-center" alt="" />
            </div>
            <Link
              to="/addmoney"
              className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">
              Add Money
            </Link>
          </div>
        </div>

        {/*<div className="flex font-bold bg-[#F3F3F3] h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">*/}
        {/*  <div className="flex justify-start items-center gap-4">*/}
        {/*    <div className="bg-primary rounded-full">*/}
        {/*      <img src={images.Invoice} className="w-[39px] md:w-[49px] p-2 bg-center" alt="" />*/}
        {/*    </div>*/}
        {/*    <Link*/}
        {/*      to="/account/invoice"*/}
        {/*      className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">*/}
        {/*      Consumer Loans*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="flex font-bold bg-[#F3F3F3] h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">*/}
        {/*  <div className="flex justify-start items-center gap-4">*/}
        {/*    <div className="bg-primary rounded-full">*/}
        {/*      <img src={images.Scan} className="w-[39px] md:w-[49px] p-2 bg-center" alt="" />*/}
        {/*    </div>*/}
        {/*    <Link*/}
        {/*      to="/"*/}
        {/*      className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">*/}
        {/*      Scan to Pay*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="flex font-bold bg-[#F3F3F3] h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">*/}
        {/*  <div className="flex justify-start items-center gap-4">*/}
        {/*    <div className="bg-primary rounded-full">*/}
        {/*      <img src={images.Code} className="w-[39px] md:w-[49px] p-2 bg-center" alt="" />*/}
        {/*    </div>*/}
        {/*    <Link*/}
        {/*      to="/"*/}
        {/*      className="hover:text-lightBlue transition-colors text-center opacity-75 text-sm md:text-base">*/}
        {/*      Pay Code*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="flex font-bold bg-[#F3F3F3] h-[88px] p-8 rounded-[10px] shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] hover:scale-105 transition-transform hover:cursor-pointer">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-primary rounded-full">
              <img src={images.Bills} className="w-[39px] md:w-[49px] p-2 bg-center" alt="" />
            </div>
            <Link
              to="/account/billers"
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