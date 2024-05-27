import React from 'react';
import Hostel from './Hostel';

const HostelList = ({ hostels, onViewDetails }) => {
  return (
    <div className="hostel-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {hostels.map((hostel, index) => (
        <Hostel key={index} hostel={hostel} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default HostelList;