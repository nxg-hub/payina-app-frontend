import React from 'react';
import SearchFilterSort from './SearchFilterSort';
import { Link } from 'react-router-dom';

const InventoryManagement = () => {
  return (
    <div className="px-4 py-4 mx-auto w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right">
      <div className="flex w-[95%] justify-between mb-2">
        <h2 className="md:text-3xl">Inventory</h2>
        <Link to="/account/dashboard" className="flex items-center gap-1">
          <svg
            width="25"
            height="25"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" transform="rotate(-180 16 16)" fill="#006181" />
            <path
              d="M19.2491 8.82806C18.9598 8.82806 18.7164 8.93713 18.5169 9.13864C16.4343 11.2468 14.3505 13.3544 12.2745 15.4692C11.825 15.9268 11.8355 16.5692 12.2883 17.0301C14.3721 19.1489 16.4599 21.2644 18.5497 23.3766C19.0064 23.8381 19.6507 23.8375 20.0877 23.3932C20.5253 22.949 20.5253 22.2979 20.0687 21.8337C18.3024 20.0387 16.5341 18.2471 14.7579 16.4621C14.5814 16.2846 14.5782 16.1928 14.7566 16.0132C16.5091 14.2515 18.2531 12.4818 19.9952 10.7101C20.5975 10.0976 20.3587 9.10007 19.5621 8.87462C19.4624 8.84668 19.3541 8.84336 19.2491 8.82806Z"
              fill="white"
            />
          </svg>
          <span className="text-sm">Back</span>
        </Link>
      </div>
      <SearchFilterSort />
    </div>
  );
};

export default InventoryManagement;
