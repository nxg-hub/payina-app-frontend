import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';

export const FilterMenu = ({
  filters = {},
  filterOptions = [],
  transactions = [],
  handleFilterChange,
  clearAllFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveFilters = Object.keys(filters).some((key) => filters[key]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.filter-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const applyFilters = (transactions, filters) => {
    return transactions.filter((transaction) =>
      Object.entries(filters).every(([key, value]) =>
        String(transaction[key]).toLowerCase().includes(String(value).toLowerCase())
      )
    );
  };
  return (
    <div className="relative filter-menu">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 hover:bg-gray-100 rounded-full">
        <Filter className={`w-5 h-5 ${hasActiveFilters ? 'text-blue-600' : 'text-gray-600'}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 py-2">
          {filterOptions.map((filter) => (
            <div key={filter.key} className="px-4 py-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{filter.label}</label>
              {filter.options ? (
                <select
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  value={filters[filter.key] || ''}
                  className="w-full p-2 border rounded">
                  <option value="">All</option>
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={filter.type || 'text'}
                  placeholder={`Filter by ${filter.label.toLowerCase()}`}
                  value={filters[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 px-4 mt-4">
            <button
              onClick={() => clearAllFilters()}
              className="w-full p-2 text-sm border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition-colors">
              Reset
            </button>
            <button
              onClick={() => {
                const filtered = applyFilters(transactions, filters);
                console.log(filtered);
              }}
              className="w-full p-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition-colors">
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
