import { Link } from 'react-router-dom';
import { images } from '../../../../../constants';

const QuickAction = () => {
  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3">
      <div className="opacity-70 font-bold text-lightBlue py-4">Quick Actions</div>
      <div className="flex flex-col md:flex-row md:gap-0 gap-3 md:space-x-4 w-auto">
        <div className="flex font-bold bg-[#F3F3F3] flex-1 h-[88px] p-8 rounded-[10px]">
          <div className="flex justify-start items-center gap-8 xl:gap-16">
            <div className="bg-primary rounded-full">
              <img src={images.SendMoney} className="w-[49px] p-2  bg-center" alt="" />
            </div>
            <Link className="hover:text-lightBlue transition-colors text-center opacity-75">Send Money</Link>
          </div>
        </div>
        <div className="flex font-bold bg-[#F3F3F3] flex-1  h-[88px] p-8 rounded-[10px]">
          <div className="flex justify-start items-center gap-8 xl:gap-16">
            <div className="bg-primary rounded-full">
              <img src={images.AddMoney} className="w-[49px] p-2  bg-center" alt="" />
            </div>
            <Link className="hover:text-lightBlue transition-colors text-center opacity-75">Add Money</Link>
          </div>
        </div>
        <div className="flex font-bold bg-[#F3F3F3] w-full flex-nowrap flex-1 h-[88px] p-8 rounded-[10px]">
          <div className="flex justify-start items-center gap-8 xl:gap-16">
            <div className="bg-primary rounded-full">
              <img src={images.Invoice} className="w-[49px] p-2  bg-center" alt="" />
            </div>
            <Link className="hover:text-lightBlue transition-colors text-center opacity-75">Create New Invoice</Link>
          </div>
        </div>
        <div className="flex font-bold bg-[#F3F3F3] flex-1  h-[88px] p-8 rounded-[10px]">
          <div className="flex justify-start items-center gap-8 xl:gap-16">
            <div className="bg-primary rounded-full">
              <img src={images.Bills} className="w-[49px] p-2  bg-center" alt="" />
            </div>
            <Link className="hover:text-lightBlue transition-colors text-center opacity-75">Pay Bills</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
