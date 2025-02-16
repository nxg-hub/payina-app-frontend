import React from 'react';
import { Sidebar, Navbar } from '../../_components';
import AccountStatementForm from './AccountStatementForm';

const AccountStatement = () => {
  return (
    <div className="bg-primary ">
      <Navbar />
      <div className="px-4 py-4 mx-auto w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right">
        <h2 className="md:text-3xl text-center mb-3 font-bold">Account statement</h2>
        <AccountStatementForm />
      </div>
      <Sidebar />
    </div>
  );
};

export default AccountStatement;
