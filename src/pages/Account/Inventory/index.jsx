import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Sidebar } from '../_components';
import InventoryManagement from './_components/InventoryManagement';
import { useEffect } from 'react';
import { fetchInventory } from '../../../Redux/InventorySlice';

const Inventory = () => {
  const loading = useSelector((state) => state.inventory.loading);
  const success = useSelector((state) => state.inventory.success);
  const error = useSelector((state) => state.inventory.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      return; //return if endpoint is already successful
    }
    dispatch(fetchInventory());
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
          <InventoryManagement />
          <Sidebar />
        </>
      )}
    </div>
  );
};

export default Inventory;
