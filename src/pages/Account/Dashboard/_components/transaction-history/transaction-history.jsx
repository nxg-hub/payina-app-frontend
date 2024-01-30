import { LiaGreaterThanSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { images } from '../../../../../constants';
const TransactionHistory = () => {
  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      <div className="opacity-70 font-bold text-lightBlue py-2 text-sm md:text-base">
        Transaction History
      </div>
      <div className="flex flex-col border-b border-[#D9D9D9]">
        <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
          <img src={images.GreenArrow} className="md:w-[40px] w-[20px]" alt="" />
          <span className="font-medium text-xs md:text-base">Salary For August</span>
          <span className="text-xs xl:text-base">IITA</span>
          <span className="border border-[#24FF00] text-xs md:text-base p-2 md:p-4">
            Successful
          </span>
          <span className="text-xs md:text-base">20,000</span>
        </div>
      </div>
      <div className="flex flex-col border-b border-[#D9D9D9]">
        <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
          <img src={images.RedArrow} className="md:w-[40px] w-[20px]" alt="" />
          <span className="font-medium text-xs md:text-base">Salary For August</span>
          <span className="text-xs xl:text-base">IITA</span>
          <span className="border border-[#24FF00] text-xs md:text-base p-2 md:p-4">
            Successful
          </span>
          <span className="text-xs md:text-base">20,000</span>
        </div>
      </div>
      <div className="flex flex-col border-b border-[#D9D9D9]">
        <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
          <img src={images.RedArrow} className="md:w-[40px] w-[20px]" alt="" />
          <span className="font-medium text-xs md:text-base">Salary For August</span>
          <span className="text-xs xl:text-base">IITA</span>
          <span className="border border-[#24FF00] text-xs md:text-base p-2 md:p-4">
            Successful
          </span>
          <span className="text-xs md:text-base">20,000</span>
        </div>
      </div>
      <div className="flex flex-col border-b border-[#D9D9D9] ">
        <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-2">
          <img src={images.RedArrow} className="md:w-[40px] w-[20px]" alt="" />
          <span className="font-medium text-xs md:text-base">Salary For August</span>
          <span className="text-xs xl:text-base">IITA</span>
          <span className="border border-[#24FF00] p-2 md:p-4 text-xs xl:text-base">
            Successful
          </span>
          <span className="text-xs md:text-base">20,000</span>
        </div>
      </div>
      <Link
        to="/account/transaction"
        className="float-right pr-0 p-4 text-lightBlue flex items-center gap-2 font-medium text-xs md:text-base">
        See All Transactions <LiaGreaterThanSolid color="#006181" />
      </Link>
    </div>
  );
};

export default TransactionHistory;
