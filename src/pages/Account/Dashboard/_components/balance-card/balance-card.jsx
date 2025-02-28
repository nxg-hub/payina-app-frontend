import React, { useEffect, useState } from 'react';
import { GrFormViewHide } from 'react-icons/gr';
import { images } from '../../../../../constants';
import useLocalStorage from '../../../../../hooks/useLocalStorage.js';
import { set } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { setWalletBalance } from '../../../../../Redux/WalletSlice.jsx';

const BalanceCard = () => {
  const [hideIcon, setHideIcon] = useState(false);
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentBalance = useSelector((state) => state.wallet?.wallet?.data?.balance?.amount);

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      try {
        if (!newAuthToken) {
          console.error('No authentication token found');
          return;
        }

        const response = await fetch(import.meta.env.VITE_GET_WALLET_ENDPOINT, {
          headers: {
            accept: '*/*',
            // apiKey: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${newAuthToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Error fetching balance:', response.status);
          return;
        }

        const data = await response.json();
        const balance = data.data.balance.amount;
        if (balance !== currentBalance) {
          dispatch(setWalletBalance(data));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [newAuthToken, currentBalance]); // Dependency array includes newAuthToken to refetch if it changes

  const handleIconClick = () => {
    setHideIcon(!hideIcon);
  };

  return (
    <div className="px-4 mx-auto w-auto ml-0 xl:ml-[19rem] clear-none xl:clear-right mt-4">
      <div className="w-auto p-4 py-6 h-fit xl:h-[134x] md:h-fit mx-auto text-start bg-lightBlue shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] text-primary rounded-[10px]">
        <div className="flex gap-4 md:gap-0 md:pt-0 justify-between md:text-sm xl:text-base">
          <div className="px-4 py-4 md:py-8 space-y-2">
            <div className="md:text-[20.372px] text-sm font-medium flex gap-[1.5rem] md:gap-10 items-center">
              Balance in Wallet
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
                {loading
                  ? '....'
                  : currentBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </div>
            )}
          </div>
          <div className="mr-[-1rem] mb-[-1.5rem] mt-[-1.4rem] md:block hidden">
            <img src={images.BalanceSpiral} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
