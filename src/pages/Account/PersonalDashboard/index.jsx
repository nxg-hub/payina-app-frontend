import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../_components';
import { Navbar } from '../_components/personalnavbar/navbar.jsx';
import AccountCard from './_components/account-card/account-card';
import BalanceCard from './_components/balance-card/balance-card';
import QuickAction from './_components/quick-actions/quick-actions';
import TransactionHistory from './_components/transaction-history/transaction-history';
import { fetchDataSuccess } from '../../../Redux/UserSlice.jsx';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { BvnModal } from '../Dashboard/_components/BvnModal.jsx';
import { BvnConfirmModal } from '../Dashboard/_components/BvnConfirmModal.jsx';
import { showLoading, hideLoading } from '../../../Redux/loadingSlice.jsx';

const PersonalDashboard = () => {
  const dispatch = useDispatch();
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isBvnModalOpen, setIsBvnModalOpen] = useState(false);
  const [isBvnConfirmModalOpen, setIsBvnConfirmModalOpen] = useState(false);

  const [data, setData] = useState({
    bvnData: {},
    ninData: {},
  });

  //getting the success state from the store
  const success = useSelector((state) => state.user.success);

  useEffect(() => {
    const fetchLoginUserData = async () => {
      if (success) {
        return; //endpoint wont be called if its already successful
      }
      if (!newAuthToken) {
        console.error('No auth token available');
        throw new Error('Authentication token is required');
      }
      try {
        // setLoading(true);
        dispatch(showLoading()); // Show Loader

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        const data = await response.json();
        setLoading(false);
        // console.log(data);
        //storing the user details in the userSlice using the redux store
        dispatch(fetchDataSuccess(data));
        console.log('BVN Data:', data.bvn);

        // if (data.bvn === null ) {
        //   setIsBvnModalOpen(true);
        // }

        if (!data?.bvn && !data?.nin) {
          setIsBvnModalOpen(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(true);
      } finally {
        // setLoading(false);
        dispatch(hideLoading()); // Hide Loader
      }
    };

    fetchLoginUserData();
  }, []);

  const handleNext = (bvnData, ninData) => {
    setData((prevData) => ({
      ...prevData,
      bvnData: bvnData,
      ninData: ninData,

      // Update state with the BVN response data
    }));

    setIsBvnModalOpen(false); // Close BvnModal
    setIsBvnConfirmModalOpen(true); // Open BvnConfirmModal
  };

  return (
    <div>
      {error ? (
        <h2 className="text-red-500 text-center mt-10 font-bold">
          Something went wrong, check your internet connection
        </h2>
      ) : (
        <>
          <Navbar />
          <Sidebar />
          <AccountCard />
          <BalanceCard />
          <QuickAction />
          <TransactionHistory />
        </>
      )}

      <div>
        {isBvnModalOpen && <BvnModal onClose={() => setIsBvnModalOpen(false)} next={handleNext} />}
        {isBvnConfirmModalOpen && (
          <BvnConfirmModal
            onClose={() => setIsBvnConfirmModalOpen(false)}
            bvnData={data.bvnData}
            ninData={data.ninData}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalDashboard;
