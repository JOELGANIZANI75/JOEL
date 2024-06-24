import React from 'react';

const FilterDropdown = ({ onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="filter-dropdown relative">
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
        <select onChange={handleChange} className="bg-gray-200 px-3 py-1 rounded-lg w-full">
          <option>Filter by</option>
          <option value="cheapest">Rent</option>
          <option value="mostRated">Most Rated</option>
          <option value="mostBooked">Most Booked</option>
          <option value="male">boys</option>
          <option value="female">girls</option>
        </select>
      </div>
    </div>
  );
};

export default FilterDropdown;