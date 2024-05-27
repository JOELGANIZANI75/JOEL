import React from 'react';
import { useParams } from 'react-router-dom';
import { Link} from 'react-router-dom';
const HostelDetails = ({ hostels }) => {
  const { id } = useParams();
  const hostel = hostels.find(h => h.name === id);

  if (!hostel) {
    return <div>Hostel not found</div>;
  }

  return (
    <div className="hostel-details container mx-auto py-8">
      <img src={hostel.image} alt={hostel.name} className="w-full h-96 object-cover rounded-md mb-4" />
      <h2 className="text-3xl font-bold mb-2">{hostel.name}</h2>
      <p>Rent: {hostel.rent}</p>
      <p>Date Uploaded: {hostel.dateUploaded}</p>
      <p>Distance: {hostel.distance} km</p>
      <p>Rooms Available: {hostel.roomsAvailable}</p>
      <p>Gender: {hostel.gender}</p>
      <div className="rooms mt-4">
        <h3 className="text-xl font-bold mb-2">Rooms</h3>
        {hostel.rooms.map(room => (
          <div key={room.number} className="room border p-2 mb-2">
            <img src={room.imageUrl} alt={`Room ${room.number}`} className="w-full h-32 object-cover rounded-md mb-2" />
            <p>Room Number: {room.number}</p>
            <p>Status: {room.isBooked ? 'Booked' : 'Available'}</p>
          </div>
        ))}
      </div>
      <Link to={`/booking/${hostel.name}`} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 inline-block">
        Book Now
      </Link>
    </div>
  );
};

export default HostelDetails;