import { useEffect } from 'react';
import { Navbar, Sidebar } from '../_components';
import AccountSetting from './_components/AccountSetting';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoorperateCustomerDetails } from '../../../Redux/CoorperateCustomerSlice';

const Settings = () => {
  //getting the customerId from the redux store
  const customerId = useSelector((state) => state.user.user.customerId);
  const success = useSelector((state) => state.coporateCustomerProfile.success);
  const loading = useSelector((state) => state.coporateCustomerProfile.loading);
  const error = useSelector((state) => state.coporateCustomerProfile.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      return; //do not dispatch the function once it is successful
    }
    dispatch(fetchCoorperateCustomerDetails(customerId));
  }, []);
  return (
    <div className="bg-primary">
      {loading ? (
        <h2 className="text-center mt-11 font-bold">Loading...</h2>
      ) : !loading && error ? (
        <h2 className="text-center mt-11 font-bold">
          Something went wrong, check internet connection
        </h2>
      ) : (
        <>
          <Navbar />
          <AccountSetting />
          <Sidebar />
        </>
      )}
    </div>
  );
};

export default Settings;
