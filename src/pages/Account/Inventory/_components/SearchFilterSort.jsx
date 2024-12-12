import React, { useState } from 'react';
import InventoryTable from './InventoryTable';

const SearchFilterSort = () => {
  // States for search, filter, and sort
  const [search, setSearch] = useState('');
  //   const [filter, setFilter] = useState('');
  //   const [sort, setSort] = useState('');

  const handleSearchChange = (e) => setSearch(e.target.value);
  //   const handleFilterChange = (e) => setFilter(e.target.value);
  //   const handleSortChange = (e) => setSort(e.target.value);

  return (
    <>
      <div className="max-w-full mx-auto bg-white p-4 rounded-lg shadow-md">
        {/* Container for Search, Filter, and Sort */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center mb-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <svg
              className="absolute top-[35px] left-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.3333 9.33332H9.80665L9.61998 9.15332C10.0366 8.66929 10.3411 8.09917 10.5117 7.48373C10.6823 6.86829 10.7147 6.22275 10.6067 5.59332C10.2933 3.73998 8.74665 2.25998 6.87998 2.03332C6.22373 1.95029 5.55718 2.0185 4.93133 2.23271C4.30549 2.44692 3.73695 2.80146 3.2692 3.2692C2.80146 3.73695 2.44692 4.30549 2.23271 4.93133C2.0185 5.55718 1.95029 6.22373 2.03332 6.87998C2.25998 8.74665 3.73998 10.2933 5.59332 10.6067C6.22275 10.7147 6.86829 10.6823 7.48373 10.5117C8.09917 10.3411 8.66929 10.0366 9.15332 9.61998L9.33332 9.80665V10.3333L12.1667 13.1667C12.44 13.44 12.8867 13.44 13.16 13.1667C13.4333 12.8933 13.4333 12.4467 13.16 12.1733L10.3333 9.33332ZM6.33332 9.33332C4.67332 9.33332 3.33332 7.99332 3.33332 6.33332C3.33332 4.67332 4.67332 3.33332 6.33332 3.33332C7.99332 3.33332 9.33332 4.67332 9.33332 6.33332C9.33332 7.99332 7.99332 9.33332 6.33332 9.33332Z"
                fill="#777777"
              />
            </svg>
            <input
              type="text"
              id="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full border px-6 border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-full md:w-[30%] flex gap-1">
            {/* Filter */}
            {/* <div className="flex-1">
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center">
                  Filter
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.66667 2H13.3333C13.5101 2 13.6797 2.07024 13.8047 2.19526C13.9298 2.32029 14 2.48986 14 2.66667V3.724C14 3.9008 13.9297 4.07034 13.8047 4.19533L9.52867 8.47133C9.40363 8.59633 9.33337 8.76587 9.33333 8.94267V13.146C9.33333 13.2473 9.31023 13.3473 9.26578 13.4384C9.22133 13.5295 9.1567 13.6092 9.07681 13.6716C8.99692 13.7339 8.90387 13.7772 8.80473 13.7982C8.70559 13.8192 8.60297 13.8173 8.50467 13.7927L7.17133 13.4593C7.02717 13.4232 6.89921 13.34 6.80777 13.2228C6.71634 13.1056 6.66667 12.9613 6.66667 12.8127V8.94267C6.66663 8.76587 6.59637 8.59633 6.47133 8.47133L2.19533 4.19533C2.0703 4.07034 2.00004 3.9008 2 3.724V2.66667C2 2.48986 2.07024 2.32029 2.19526 2.19526C2.32029 2.07024 2.48986 2 2.66667 2Z"
                      stroke="#777777"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </label>
              <select
                id="filter"
                value={filter}
                onChange={handleFilterChange}
                className="w-[100%] border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Categories</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </div> */}

            {/* Sort */}
            {/* <div className="flex-1">
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center">
                  Sort
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.33317 9.66634H0.666504L4.6665 13.6663V0.333008H3.33317V9.66634ZM7.33317 2.33301V13.6663H8.6665V4.33301H11.3332L7.33317 0.333008V2.33301Z"
                      fill="#777777"
                    />
                  </svg>
                </span>
              </label>
              <select
                id="sort"
                value={sort}
                onChange={handleSortChange}
                className="w-[100%] border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div> */}
          </div>
        </div>
      </div>
      <InventoryTable searchTerm={search} />
    </>
  );
};

export default SearchFilterSort;
