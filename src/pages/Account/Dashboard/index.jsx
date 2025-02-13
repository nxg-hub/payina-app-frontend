import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Sidebar } from '../_components';
import AccountCard from './_components/account-card/account-card';
import BalanceCard from './_components/balance-card/balance-card';
import QuickAction from './_components/quick-actions/quick-actions';
import TransactionHistory from './_components/transaction-history/transaction-history';
import { useEffect, useState } from 'react';
import { fetchDataSuccess } from '../../../Redux/UserSlice';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../../Redux/loadingSlice';
import Loader from '../../../assets/LoadingSpinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading); // Global loading state
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  //getting the success state from the store
  const success = useSelector((state) => state.user.success);
  useEffect(() => {
    const fetchLoginUserData = async () => {
      if (success) {
        return; //endpoint wont be called if its already successful
      }
      if (!newAuthToken) {
        navigate('/login');
        console.error('No auth token available');
        throw new Error('Authentication token is required');
      }
      try {
        dispatch(showLoading()); // Show Loader

        const response = await fetch(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        const data = await response.json();

        //storing the user details in the userSlice using the redux store
        dispatch(fetchDataSuccess(data));
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(true);
      } finally {
        dispatch(hideLoading()); // Hide Loader
      }
    };

    fetchLoginUserData();
  }, []);
  return (
    <div>
      {isLoading ? null : error ? (
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
    </div>
  );
};

export default Dashboard;
