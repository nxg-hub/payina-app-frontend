import React, { useState } from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import SavingsPieChart from './_components/SavingsPieChart';
import { IoMdAdd } from 'react-icons/io';
import { IoDownloadOutline } from 'react-icons/io5';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { IoMdAddCircle } from 'react-icons/io';
import backArrow from '../../assets/images/Group-backArrow.png';
import { Link, useNavigate } from 'react-router-dom';
const savings = [
  {
    id: 0,
    name: 'future',
    goalAmount: 500000,
    savingsBalance: 250000,
    isActive: true,
    maturityDate: '2024-04-11',
    startDate: '2024-04-11',
  },
  {
    id: 2,
    name: 'Car',
    goalAmount: 500000,
    savingsBalance: 300000,
    isActive: true,
    maturityDate: '2024-04-11',
    startDate: '2024-04-11',
  },
  {
    id: 3,
    name: 'Rent',
    goalAmount: 500000,
    savingsBalance: 200000,
    isActive: true,
    maturityDate: '2024-04-11',
    startDate: '2024-04-11',
  },
];
const MySavings = () => {
  const [selectedSavings, setSelecetedSavings] = useState(null);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/savings');
  };

  const handleShowDetails = (data) => {
    setSelecetedSavings(data);
  };
  const backButtonClick = () => {
    setSelecetedSavings(null);
  };
  const handleAddFund = () => {
    navigate('/fund');
  };
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="px-4 py-4 mx-auto w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right">
        <div
          className={`${'flex flex-row gap-2 items-center justify-between cancelAction-img md:w-[60%] w-[80%] m-auto cursor-pointer'}`}
          onClick={handleBack}>
          <img src={backArrow} alt="cancelAction"></img>
          {/* <p>Back</p> */}
          <h2 className="text-md md:text-xl font-semibold ml-8 text-center">My Savings</h2>
        </div>
        <Link to={'/savings'}>
          <IoMdAddCircle className="text-[#006181] fixed bottom-[80px] md:bottom-[50px] text-[40px] md:text-[60px] right-[1%] md:right-[15%]" />
        </Link>
        {!selectedSavings &&
          savings.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  className=" w-[80%] md:max-w-[500px] bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-md shadow-lg m-auto space-y-3 mb-3 p-4 ">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleShowDetails(item);
                    }}>
                    <div className="">
                      <SavingsPieChart target={item.goalAmount} saved={item.savingsBalance} />
                    </div>
                    <div className="flex justify-between">
                      <p className="flex flex-col text-stone-400 text-xs">
                        Savings Goal Name
                        <span className="font-bold text-stone-600 text-sm">{item.name}</span>
                      </p>
                      <p className="flex flex-col text-stone-400 text-xs ">
                        Savings Balance
                        <span className="font-bold text-[#006181] text-sm">
                          ₦{item.savingsBalance.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr className="text-stone-300" />
                  <div className="flex justify-between  ">
                    <div className=" px-2 md:w-[100px] rounded-3xl h-8 border text-center py-1 border-stone-300">
                      {item.isActive ? <p className="text-[#006181">ACTIVE</p> : <p>Inactive</p>}
                    </div>
                    <button
                      onClick={handleAddFund}
                      className=" px-1 text-sm md:px-4 md:py-2 rounded-md bg-[#006181] text-white flex items-center justify-between">
                      <IoMdAdd className="font-bold text-white" />
                      Add Funds
                    </button>
                    {/* <button className="md:px-4 md:py-2 text-sm rounded-md bg-white border-[#006181] border text-[#006181] flex items-center">
                      <IoDownloadOutline /> Withdraw
                    </button> */}
                  </div>
                </div>
              </>
            );
          })}
        {selectedSavings && (
          <div className="max-w-[500px] bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-md shadow-lg m-auto space-y-3 mb-3 p-4 ">
            <div
              className={`${'flex flex-row gap-2 cancelAction-img cursor-pointer'}`}
              onClick={backButtonClick}>
              <img src={backArrow} alt="cancelAction"></img>
              <p className="text-xl">{selectedSavings.name}</p>
            </div>
            <div>
              <SavingsPieChart
                target={selectedSavings.goalAmount}
                saved={selectedSavings.savingsBalance}
              />
            </div>
            <div className="flex justify-between ">
              <button
                onClick={handleAddFund}
                className="px-4 py-2 rounded-md bg-[#006181] text-white flex items-center justify-between">
                <IoMdAdd className="font-bold text-white" />
                Add Funds
              </button>
              <button className="px-4 py-2 rounded-md bg-white border-[#006181] border text-[#006181] flex items-center">
                <IoDownloadOutline /> Withdraw
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between border-b pb-2 border-stone-300">
                <p className="flex flex-col text-stone-400 text-xs">
                  Target
                  <span className="font-bold text-stone-600 text-sm">
                    ₦ {selectedSavings.goalAmount.toLocaleString()}
                  </span>
                </p>
                <p className="flex flex-col text-stone-400 text-xs text-end ">
                  Balance
                  <span className="font-bold text-[#006181] text-sm text-end">
                    ₦ {selectedSavings.savingsBalance.toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="flex justify-between border-b pb-2 border-stone-300">
                <p className="flex flex-col text-stone-400 text-xs">
                  Saving Frequency
                  <span className="font-bold text-stone-600 text-sm">NONE</span>
                </p>
                <p className="flex flex-col text-stone-400 text-xs text-end ">
                  Saving Plan
                  <span className="font-bold text-[#006181] text-sm text-end">None</span>
                </p>
              </div>
              <div className="flex justify-between pb-2 border-stone-300 border-b">
                <p className="flex flex-col text-stone-400 text-xs">
                  Next Saving Date
                  <span className="font-bold text-stone-600 text-sm">Not Set</span>
                </p>
                <p className="flex flex-col text-stone-400 text-xs text-end">
                  Start Date
                  <span className="font-bold text-[#006181] text-sm text-end">
                    {selectedSavings.startDate}
                  </span>
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-300">
                <p className="flex flex-col text-stone-400 text-xs">
                  Maturity Date
                  <span className="font-bold text-stone-600 text-sm ">
                    {selectedSavings.maturityDate}
                  </span>
                </p>
                <p className="flex flex-col text-stone-400 text-xs text-end ">
                  Withholding Tax
                  <span className="font-bold text-[#006181] text-sm text-end">₦1000</span>
                </p>
              </div>
              <Link to={'/savingshistory'}>
                <div className="flex justify-between pt-2">
                  <p className="flex flex-col text-stone-400 text-xs font-bold">Savings History</p>
                  <p className="flex flex-col text-stone-400 text-xs text-end ">
                    <IoChevronForwardSharp size={20} />
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySavings;
