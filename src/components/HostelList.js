import React from 'react';
import { useHostels } from './HostelContext';

const HostelList = ({ onViewDetails }) => {
  const { hostels, isLoading } = useHostels();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hostels.length === 0) {
    return <div>No hostels available</div>;
  }

  return (
    <div className="hostel-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {hostels.map((hostel) => (
        <Hostel key={hostel.id} hostel={hostel} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default HostelList;
