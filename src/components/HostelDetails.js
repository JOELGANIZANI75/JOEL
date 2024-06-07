import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HostelDetails = ({ hostels }) => {
  const { id } = useParams();
  const hostel = hostels.find((h) => h.name === id);
  const [loading, setLoading] = useState(false);

  if (!hostel) {
    return <div>Hostel not found</div>;
  }

  return (
    <div className="hostel-details container mx-auto py-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <img
            src={hostel.image || '/fallback-image.jpg'}
            alt={hostel.name}
            className="w-full h-96 object-cover rounded-md mb-4"
          />
          <h2 className="text-3xl font-bold mb-2">{hostel.name}</h2>
          <p>Room type: {hostel.roomType}</p>
          <p>Date Uploaded: {hostel.dateUploaded}</p>
          <p>Distance: {hostel.distance} km</p>
          <p>Rooms Available: {hostel.amountofrooms}</p>
          <p>Gender: {hostel.gender}</p>
          <p>Amount: {hostel.amount}</p>
          <div className="rooms mt-4">
            <h3 className="text-xl font-bold mb-2">Rooms</h3>
            {hostel.rooms.length > 0 ? (
              hostel.rooms.map((room) => (
                <div key={room.number} className="room border p-2 mb-2">
                  <img
                    src={room.imageUrl || '/fallback-image.jpg'}
                    alt={`Room ${room.number}`}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <p>Room Number: {room.number}</p>
                  <p>Status: {room.isBooked ? 'Booked' : 'Available'}</p>
                </div>
              ))
            ) : (
              <p>No rooms available</p>
            )}
          </div>
          <Link
            to={`/booking/${hostel.name}`}
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          >
            Book Now
          </Link>
        </>
      )}
    </div>
  );
};

export default HostelDetails;
