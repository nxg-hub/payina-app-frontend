import { images } from '../../../../constants';

const SetupPayroll = ({ onSetupClick, onViewClick }) => {
  return (
    <div className="flex">
      <span className="text-right mt-4 xl:pt-20 md:pt-0 ml-4 xl:ml-80 font-bold text-xl md:text-3xl">
        Payroll
      </span>
      <div className="flex flex-col center absolute top-[50%] gap-8 left-[50%] xl:translate-x-[36%] md:translate-x-[-50%] translate-x-[-50%] translate-y-[-50%]">
        <img src={images.PayrollIcon} alt="" />
        <button className="border-2 border-[#044B84] rounded-[4px] py-2 px-3" onClick={onViewClick}>
          <span className="text-lightBlue font-bold text-xl">View Payroll</span>
        </button>
        <h3 className="text-black font-bold text-md">No Payroll yet? <span className="text-lightBlue cursor-pointer" onClick={onSetupClick}>Set up Payroll</span></h3>
      </div>
    </div>
  );
};

export default SetupPayroll;