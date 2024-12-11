import React from 'react';
import { Navbar, Sidebar } from '../_components';
import AddInventoryForm from './_components/AddInventoryForm';

const AddInventory = () => {
  return (
    <div className="bg-primary ">
      <Navbar />
      <div className="px-4 py-4 mx-auto w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right">
        <h2 className="md:text-3xl text-center mb-3">Add Inventory</h2>
        <AddInventoryForm />
      </div>
      <Sidebar />
    </div>
  );
};

export default AddInventory;
