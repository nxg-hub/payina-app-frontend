import React, { useEffect, useState } from 'react';
import { Navbar, Sidebar } from '../Account/_components';
import SavingsPieChart from './_components/SavingsPieChart';
import { IoMdAdd } from 'react-icons/io';
import { IoDownloadOutline } from 'react-icons/io5';
import { IoChevronForwardSharp } from 'react-icons/io5';
import { IoMdAddCircle } from 'react-icons/io';
import backArrow from '../../assets/images/Group-backArrow.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavings, getSavingsId } from '../../Redux/savingsSlice';
import useLocalStorage from '../../hooks/useLocalStorage';
import { hideLoading, showLoading } from '../../Redux/loadingSlice';
import UndueWithdrawal from './_components/UndueWithdrawal';
import SuccessfullWithdrawal from './_components/SuccessfullWithdrawal';
import axios from 'axios';
import { FaHistory } from 'react-icons/fa';
const MySavings = () => {
  const [selectedSavings, setSelecetedSavings] = useState(null);
  const [unDueWithdrawal, setUnDueWithdrawal] = useState(false);
  const [successfulWithdrawal, setSuccessfulWithdrawal] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');
  const mysavings = useSelector((state) => state.savings.savings);
  const loading = useSelector((state) => state.savings.loading);
  const success = useSelector((state) => state.savings.success);
  const [isloading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBack = () => {
    navigate(-1);
  };

  const activeSavings = mysavings?.filter((savings) => {
    return savings.active;
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';

    return date.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    if (success) {
      return;
    }
    dispatch(fetchSavings(newAuthToken));
  }, []);

  const handleShowDetails = (data) => {
    setSelecetedSavings(data);
  };
  const backButtonClick = () => {
    setSelecetedSavings(null);
    setUploadStatus('');
  };
  const handleAddFund = (id, goalName) => {
    dispatch(getSavingsId({ id, goalName }));
    navigate('/fund');
  };

  if (loading) {
    dispatch(showLoading());
  } else {
    dispatch(hideLoading());
  }

  const isMaturityDue = (maturityDateString) => {
    const today = new Date();
    const maturityDate = new Date(maturityDateString);

    // Set both dates to midnight to ignore time differences
    today.setHours(0, 0, 0, 0);
    maturityDate.setHours(0, 0, 0, 0);

    return maturityDate <= today;
  };

  const withdraw = async (id, amount) => {
    const payload = { savingsId: id, amount: amount };
    setIsLoading(true);
    setUploadStatus('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_WITHDRAW_SAVINGS}`,
        payload,

        {
          headers: {
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok || response.status === 200) {
        dispatch(fetchSavings(newAuthToken));
        setSuccessfulWithdrawal(true);
      } else {
        setUploadStatus('Something went wrong. Please try again later');
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message.includes('Savings not yet matured.')) {
        setUnDueWithdrawal(true);
      }
      setUploadStatus(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawer = (date, id, amount) => {
    const due = isMaturityDue(date);
    // if (!due) {
    // setUnDueWithdrawal(true);
    // } else {
    withdraw(id, amount);
    // }
  };

  const handleSavingsHistory = (id, goalName) => {
    navigate('/savingshistory');
    dispatch(getSavingsId({ id, goalName }));
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
        {/* <Link to="#">
          <FaHistory className="text-[#006181] fixed bottom-[80px] md:bottom-[50px] text-[30px] md:text-[50px] left-[1%] md:left-[35%]" />
        </Link> */}

        {!selectedSavings &&
          activeSavings.map((item) => {
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
                      <SavingsPieChart target={item.goalAmount} saved={item.currentBalance} />
                    </div>
                    <div className="flex justify-between">
                      <p className="flex flex-col text-stone-400 text-xs">
                        Savings Goal Name
                        <span className="font-bold text-stone-600 text-sm">{item.goalName}</span>
                      </p>
                      <p className="flex flex-col text-stone-400 text-xs ">
                        Savings Balance
                        <span className="font-bold text-[#006181] text-sm">
                          ₦{item.currentBalance.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <hr className="text-stone-300" />
                  <div className="flex justify-between  ">
                    <div className=" px-2 md:w-[100px] rounded-3xl h-8 border text-center py-1 border-stone-300">
                      {item.active ? <p className="text-[#006181">ACTIVE</p> : <p>Inactive</p>}
                    </div>
                    <button
                      onClick={() => {
                        handleAddFund(item.id, item.goalName);
                      }}
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
              <p className="text-xl">{selectedSavings.goalName}</p>
            </div>
            <div>
              <SavingsPieChart
                target={selectedSavings.goalAmount}
                saved={selectedSavings.currentBalance}
              />
            </div>
            <div className="flex justify-between ">
              <button
                onClick={() => handleAddFund(selectedSavings.id, selectedSavings.goalName)}
                className="px-4 py-2 rounded-md bg-[#006181] text-white flex items-center justify-between">
                <IoMdAdd className="font-bold text-white" />
                Add Funds
              </button>
              <button
                onClick={() => {
                  handleWithdrawer(
                    selectedSavings.maturityDate,
                    selectedSavings.id,
                    selectedSavings.currentBalance
                  );
                }}
                className="px-4 py-2 rounded-md bg-white border-[#006181] border text-[#006181] flex items-center">
                <IoDownloadOutline />
                {isloading ? 'Processing..' : 'Withdraw'}
              </button>
            </div>
            {uploadStatus && <p className="text-red-500">{uploadStatus}</p>}

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
                    ₦ {selectedSavings.currentBalance.toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="flex justify-between border-b pb-2 border-stone-300">
                <p className="flex flex-col text-stone-400 text-xs">
                  Saving Frequency
                  <span className="font-bold text-stone-600 text-sm">
                    {selectedSavings.fundFrequency ? selectedSavings.fundFrequency : 'NONE'}
                  </span>
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
                    {formatDate(selectedSavings.createdAt)}
                  </span>
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-300">
                <p className="flex flex-col text-stone-400 text-xs">
                  Maturity Date
                  <span className="font-bold text-stone-600 text-sm ">
                    {formatDate(selectedSavings.maturityDate)}
                  </span>
                </p>
                <p className="flex flex-col text-stone-400 text-xs text-end ">
                  Interest Rate
                  <span className="font-bold text-[#006181] text-sm text-end">
                    {selectedSavings?.interestRate}%
                  </span>
                </p>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-300">
                <p className="flex flex-col text-stone-400 text-xs">
                  Accrued Interest
                  <span className="font-bold text-stone-600 text-sm ">
                    {selectedSavings?.interestAccrued}
                  </span>
                </p>
                {/* <p className="flex flex-col text-stone-400 text-xs text-end ">
                  Interest
                  <span className="font-bold text-[#006181] text-sm text-end">
                    {selectedSavings?.interestRate}%
                  </span>
                </p> */}
              </div>
              <div
                onClick={() => {
                  handleSavingsHistory(selectedSavings.id, selectedSavings.goalName);
                }}
                className="flex justify-between pt-2 cursor-pointer">
                <p className="flex flex-col text-stone-400 text-xs font-bold">Savings History</p>
                <p className="flex flex-col text-stone-400 text-xs text-end ">
                  <IoChevronForwardSharp size={20} />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {unDueWithdrawal && <UndueWithdrawal close={setUnDueWithdrawal} />}
      {successfulWithdrawal && (
        <SuccessfullWithdrawal close={setSuccessfulWithdrawal} back={backButtonClick} />
      )}
    </div>
  );
};

export default MySavings;
