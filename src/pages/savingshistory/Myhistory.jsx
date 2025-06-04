import React from 'react';
import backArrow from '../../assets/images/Group-backArrow.png';
import { useNavigate } from 'react-router-dom';
const transactions = [
  {
    id: 0,
    refNo: 'MS0000077827',
    amount: 950000,
    status: 'SUCCESSFUL',
    balance: 190000,
    transferMethod: 'Via PAYINA ACCOUNT',
    date: '2024-05-05',
    type: 'CREDIT',
  },
  {
    id: 1,
    refNo: 'MS0000077827',
    amount: 950000,
    status: 'SUCCESSFUL',
    balance: 190000,
    transferMethod: 'Via PAYINA ACCOUNT',
    date: '2024-05-05',
    type: 'CREDIT',
  },
  {
    id: 2,
    refNo: 'MS0000077827',
    amount: 950000,
    status: 'SUCCESSFUL',
    balance: 190000,
    transferMethod: 'Via PAYINA ACCOUNT',
    date: '2024-05-05',
    type: 'CREDIT',
  },
  {
    id: 3,
    refNo: 'MS0000077827',
    amount: 950000,
    status: 'SUCCESSFUL',
    balance: 190000,
    transferMethod: 'Via PAYINA ACCOUNT',
    date: '2024-05-05',
    type: 'CREDIT',
  },
  {
    id: 4,
    refNo: 'MS0000077827',
    amount: 950000,
    status: 'SUCCESSFUL',
    balance: 190000,
    transferMethod: 'Via PAYINA ACCOUNT',
    date: '2024-05-05',
    type: 'CREDIT',
  },
  {
    id: 5,
    refNo: 'MS0000077827',
    amount: 950000,
    status: 'SUCCESSFUL',
    balance: 190000,
    transferMethod: 'Via PAYINA ACCOUNT',
    date: '2024-05-05',
    type: 'CREDIT',
  },
  {
    id: 6,
    refNo: 'MS0000077827',
    amount: 950000,
    status: 'SUCCESSFUL',
    balance: 190000,
    transferMethod: 'Via PAYINA ACCOUNT',
    date: '2024-05-05',
    type: 'CREDIT',
  },
  {
    id: 7,
    refNo: 'MS0000077827',
    amount: 950000,
    status: 'SUCCESSFUL',
    balance: 190000,
    transferMethod: 'Via PAYINA ACCOUNT',
    date: '2024-05-05',
    type: 'CREDIT',
  },
];
const Myhistory = () => {
  const navigate = useNavigate();
  const backButtonClick = () => {
    navigate(-1);
  };
  return (
    <div className="px-4 py-4 mx-auto w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right">
      <div
        className={`${'flex flex-row gap-2 items-center cancelAction-img cursor-pointer'}`}
        onClick={backButtonClick}>
        <img src={backArrow} alt="cancelAction"></img>
        <p>Back</p>
        <h2 className="text-md md:text-2xl font-semibold ml-5">Savings History</h2>
      </div>
      <div className=" bg-gradient-to-br from-white via-blue-50 to-blue-100  max-w-[600px] px-3 m-auto shadow-xl p max-h-[600px] rounded-xl overflow-y-scroll relative">
        <div className="border-b border-[#006181] pb-2 sticky top-0 z-30 bg-white bg-gradient-to-br from-white via-blue-50 to-blue-50 ">
          <h2 className="text-[#006181] font-semibold">TRANSACTIONS</h2>
        </div>

        {transactions.map((data) => (
          <div key={data.refNo} className="py-3 border-b border-stone-300">
            <div className="flex justify-between">
              <h3 className="font-bold">{data.refNo}</h3>
              <div className="py-1 px-2 rounded-2xl text-[#006181] text-xs font-semibold border">
                {data.status}
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p>
                  Amt:<span className="text-[#006181]">₦{data.amount.toLocaleString()}</span>
                </p>
                <p>Bal:₦{data.balance.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">{data.transferMethod}</p>
                <p>{data.date}</p>
              </div>
            </div>
            <p className="text-green-600 text-end text-xs">{data.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myhistory;
