import React, { useEffect, useState } from 'react';
import { GrFormViewHide } from 'react-icons/gr';
import { HiOutlineCash } from 'react-icons/hi';
import { images } from '../../../constants';
import useLocalStorage from '../../../hooks/useLocalStorage.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoan, fetchLoanSchedule, getLoanId } from '../../../Redux/loanSlice.jsx';
import { hideLoading, showLoading } from '../../../Redux/loadingSlice.jsx';
import { useNavigate } from 'react-router-dom';
import { Navbar, Sidebar } from '../../Account/_components/index.js';
import RepayLoan from './RepayLoan.jsx';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { loadAgeGenderModel } from 'face-api.js';

const LoanBalanceCard = () => {
  const loan = useSelector((state) => state.loan.loan);
  const [modal, setModal] = useState(false);
  const loading = useSelector((state) => state.loan.loading);
  const scheduleLoading = useSelector((state) => state.loan.scheduleLoading);
  const loanSchedule = useSelector((state) => state.loan.loanSchedule);
  const success = useSelector((state) => state.loan.success);
  const [action, setAction] = useState(false);
  const [viewMore, setViewMore] = useState(null);
  const [hideIcon, setHideIcon] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');
  const approvedLoan = loan?.filter((loan) => loan.status === 'APPROVED');

  const onlyRepaidOrRejected = loan?.every(
    (loan) =>
      loan.status === 'REPAID' ||
      loan.status === 'REJECTED' ||
      loan.status === 'USER_REJECTED_OFFER'
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      return;
    }
    dispatch(fetchLoan({ newAuthToken }));
  }, []);

  const handleViewMore = (id) => {
    dispatch(fetchLoanSchedule({ newAuthToken, id }));
    setAction(!action);
    setViewMore(id);
  };

  const handleIconClick = () => {
    setHideIcon(!hideIcon);
  };
  const handleGetLoan = () => {
    navigate('/applyLoan');
  };

  const openRepayModal = (id, loanName) => {
    setModal(true);
    dispatch(getLoanId({ id, loanName }));
  };

  const handleLoanHistory = (id, loanName) => {
    navigate('/loanHistory');
    dispatch(getLoanId({ id, loanName }));
  };
  if (loading) {
    dispatch(showLoading());
  } else {
    dispatch(hideLoading());
  }
  return (
    <div className="">
      <Navbar />
      <Sidebar />
      <div className="mx-auto p-6 px-4 py-4  w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right rounded">
        <div className="w-auto p-4 py-6 h-fit xl:h-[134x] md:h-fit mx-auto text-start bg-lightBlue shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] text-primary rounded-[10px]">
          <div className="flex gap-4 md:gap-0 md:pt-0 justify-between md:text-sm xl:text-base">
            <div className="px-4 py-4 md:py-8 space-y-2">
              <div className="md:text-[20.372px] text-sm font-medium flex gap-[1.5rem] md:gap-10 items-center">
                You owe
                {hideIcon ? (
                  <img
                    onClick={handleIconClick}
                    className={`hover:cursor-pointer ${hideIcon ? 'block' : 'hidden'}`}
                    src={images.BalanceIcon}
                    alt="balance_shown"
                  />
                ) : (
                  <span className="flex" onClick={handleIconClick}>
                    <GrFormViewHide
                      className={`hover:cursor-pointer ${hideIcon ? 'hidden' : 'block'}`}
                      color="#000000"
                    />
                    <GrFormViewHide
                      onClick={handleIconClick}
                      className={`hover:cursor-pointer ${hideIcon ? 'hidden' : 'block'}`}
                      color="#000000"
                    />
                  </span>
                )}
              </div>
              {hideIcon && (
                <div className="md:text-[32px] text-2xl font-bold">
                  <span className="uppercase text-sm md:text-[23.282px] ">₦</span>
                  {approvedLoan[0]?.balance ? approvedLoan[0]?.balance : '00.00'}
                </div>
              )}
            </div>
            <div className="mr-[-1rem] mb-[-1.5rem] mt-[-1.4rem] md:block hidden">
              <img src={images.BalanceSpiral} alt="" />
            </div>
          </div>
        </div>
        {loan?.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl  shadow-md p-4 my-4  hover:shadow-lg transition">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                ₦{item.loanAmount?.toLocaleString()} Loan
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded-full font-semibold ${
                  item.status === 'PENDING_ADMIN_APPROVAL' || item.status === 'PENDING_USER_ACTION'
                    ? 'bg-yellow text-yellow-700'
                    : item.status === 'APPROVED'
                      ? 'bg-green-100 text-green-700'
                      : item.status === 'REPAID'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-100 text-red-600'
                }`}>
                {item.status}
              </span>
            </div>

            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>
                <strong>Purpose:</strong> {item.loanPurpose}
              </p>
              <p>
                <strong>balance:</strong> {item.balance}
              </p>
              <p>
                <strong>Duration:</strong> {item.loanDuration}{' '}
                {item.loanDuration > 1 ? 'months' : 'month'}
              </p>
              <div
                onClick={() => {
                  handleLoanHistory(item.id, item.loanPurpose);
                }}
                className="flex justify-between pt-2 cursor-pointer">
                <p className="flex flex-col text-stone-400 text-xs font-bold"> History</p>
                <p className="flex flex-col text-stone-400 text-xs text-end ">
                  <IoChevronForwardSharp size={20} />
                </p>
              </div>
            </div>
            {item.status === 'APPROVED' && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => {
                    handleViewMore(item.id);
                  }}
                  className="px-4 py-2 text-[#006181] rounded-md shadow-sm text-sm font-semibold">
                  {action ? ' View Less' : 'View More'}
                </button>
              </div>
            )}
            {/* Show more details only if approved */}
            {action &&
              viewMore === item.id &&
              (scheduleLoading ? (
                <p className="text-sm text-stone-500 text-center">Loading..</p>
              ) : (
                <>
                  <div className="flex flex-col justify-between border-t border-t-stone-300">
                    <div className="mt-3  pt-3 text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>Monthly Repayment :</strong>
                        {item.monthlyRepayment}
                      </p>
                      <p>
                        <strong>Loan Amount:</strong> ₦{item.loanAmount?.toLocaleString()}
                      </p>
                      <p>
                        <strong> Interest Rate:</strong>
                        {item.interestRate}%
                      </p>
                      <p>
                        <strong>Interest Amount:</strong> ₦{item.interestAmount.toLocaleString()}
                      </p>
                      <p>
                        <strong>Total Repayable Amount:</strong> ₦
                        {item.totalRepayable.toLocaleString()}
                      </p>
                    </div>
                    <div className="overflow-x-auto mt-6">
                      <p className="text-center md:text-lg font-bold">Repayment Schedule</p>
                      <table className="min-w-full border border-gray-200 text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700">
                          <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">Due Date</th>
                            <th className="px-4 py-2 border">Amount Due (₦)</th>
                            <th className="px-4 py-2 border">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loanSchedule.map((item) => (
                            <tr key={item.installmentNumber} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border">{item.installmentNumber}</td>
                              <td className="px-4 py-2 border">{item.dueDate}</td>
                              <td className="px-4 py-2 border">₦{item.amountDue.toFixed(2)}</td>
                              <td className="px-4 py-2 border">
                                {item.paid ? (
                                  <span className="text-green-600 font-semibold">Paid</span>
                                ) : (
                                  <span className="text-red-500 font-semibold">Unpaid</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mt-4 text-end">
                    <button
                      onClick={() => {
                        openRepayModal(item.id, item.loanPurpose);
                      }}
                      className="px-4 py-2 bg-[#006181] hover:bg-[#004e65] text-white rounded-md shadow-sm text-sm font-semibold">
                      Repay Loan
                    </button>
                  </div>
                </>
              ))}
          </div>
        ))}
        {approvedLoan.length === 0 && onlyRepaidOrRejected && (
          <>
            <article className="max-w-[500px] m-auto mt-5 text-center px-4">
              <h2 className="font-bold text-xl md:text-2xl text-[#0F172A] flex items-center justify-center gap-2">
                Get a Loan
                <HiOutlineCash size={40} className="text-green-400 text-2xl animate-bounce" />
              </h2>
              <p className="text-sm text-gray-700 mt-2 font-semibold">
                Life happens and anyone can get low on cash. Get an overdraft, a personal loan, or a
                salary loan quickly if you qualify.
              </p>
            </article>
            <div className="max-w-[200px] m-auto mt-6">
              <button
                onClick={handleGetLoan}
                className=" w-full p-4 bg-[#00678F] hover:bg-[#005978] text-white rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 ">
                Get a Loan
              </button>
            </div>
          </>
        )}
      </div>
      {modal && <RepayLoan setModal={setModal} setAction={setAction} />}
    </div>
  );
};

export default LoanBalanceCard;
