import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Sidebar } from '../_components';
import AccountCard from './_components/account-card/account-card';
import BalanceCard from './_components/balance-card/balance-card';
import QuickAction from './_components/quick-actions/quick-actions';
import TransactionHistory from './_components/transaction-history/transaction-history';
import { useEffect, useState } from 'react';
import { fetchDataSuccess } from '../../../Redux/UserSlice';
import useLocalStorage from '../../../hooks/useLocalStorage';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [newAuthToken] = useLocalStorage('authToken', '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_GET_LOGIN_USER_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        });
        const data = await response.json();
        setLoading(false);
        //storing the user details in the userSlice using the redux store
        dispatch(fetchDataSuccess(data));
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginUserData();
  }, []);
  return (
    <div>
      {loading ? (
        <h2 className="text-center mt-10 font-bold">Loading...</h2>
      ) : !loading && error ? (
        <h2>Something went wrong, check internet connection</h2>
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
