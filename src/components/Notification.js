import React, { useEffect, useState } from 'react';
import { useNotifications } from './Alert';
import { useUser } from './user';
import { Navigate } from 'react-router-dom';
import com from './com.png';

const Notification = () => {
  const { notifications } = useNotifications();
  const { currentUser } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update time every minute
    return () => clearInterval(timer);
  }, []);

  // Redirect to login page if the user is not logged in
  if (!currentUser) {
    return <Navigate to="/Login" />;
  }

  const timeAgo = (time) => {
    const diff = Math.floor((currentTime - new Date(time)) / 1000);
    if (diff < 60) {
      return `${diff} second${diff !== 1 ? 's' : ''} ago`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) !== 1 ? 's' : ''} ago`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) !== 1 ? 's' : ''} ago`;
    } else {
      return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Notifications</h1>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <article key={notification.id} className="bg-white shadow-md rounded-lg mb-4 p-4 border-b w-5/6 flex flex-row">
            <img src={com} alt='mine' className='h-20 flex-col flex w-20 rounded-full'/>
            <section className='flex-row ml-3'>
              <h2 className="text-2xl font-bold mb-2">{notification.title}</h2>
              <p className="text-gray-700 mb-1">{notification.message}</p>
              <span className="text-gray-500 text-sm">{timeAgo(notification.time)}</span>
            </section>
          </article>
        ))
      ) : (
        <p className="text-gray-600">No notifications available.</p>
      )}
    </div>
  );
};

export default Notification;