import React from 'react';
import { FiFilter } from 'react-icons/fi';

const SortBar = ({ sort, setSort, totalCount, setShowFilters }) => {
  return (
    <div className='flex items-center md:items-center rounded-lg shadow-sm justify-between gap-1 mb-6'>
      <div className="md:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 px-4 py-2 bg-mainclr text-white rounded-md"
        >
          <FiFilter />
        </button>
      </div>

      <div className="bg-white pb-2 w-full flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div className='hidden md:block'>
          <p className="text-gray-600">
            Showing <span className="font-medium">{totalCount}</span> results
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-600 whitespace-nowrap">Sort by:</label>
          <select
            value={sort || ""}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm min-w-[180px]"
          >
            <option value="">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="latest">Latest Products</option>
            <option value="offers">Special Offers</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortBar;