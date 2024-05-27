import React from 'react';

const SortDropdown = ({ onSortChange }) => {
  const handleChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-dropdown">
      <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
        <select onChange={handleChange} className="bg-gray-200 px-3 py-1 rounded-lg w-full">
          <option>Sort by</option>
          <option value="name">Name</option>
          <option value="date">Date Uploaded</option>
          <option value="distance">Distance</option>
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;