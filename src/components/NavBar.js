import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './user';
import { useNotifications } from './Alert'; // Import useNotifications hook

const Navbar = () => {
  const { currentUser, logoutUser } = useUser();
  const { notifications } = useNotifications(); // Get notifications
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    // Handle resizing logic here
  };

  // Handle resizing of the window to show/hide button
  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const [hostelName, setHostelName] = useState('');

  const handleSearch = () => {
    navigate(`/hostels?search=${hostelName}`);
    setHostelName('');
    closeMobileMenu();
  };

  const isLoggedIn = !!currentUser;
  

  return (
    <nav className='bg-gradient-to-r from-gray-900 to-gray-800 h-20 flex justify-center items-center text-lg sticky top-0 z-50'>
      <div className='flex justify-between items-center h-20 max-w-screen-xl mx-auto w-full px-0'>
        <Link to='/' className='text-white text-2xl font-bold cursor-pointer' onClick={closeMobileMenu}>
          OCA <i className='fab fa-typo3 ml-2 text-xl' />
        </Link>
        <div className='flex items-center'>
          <input
            type="text"
            placeholder="Search for a hostel"
            value={hostelName}
            onChange={(e) => setHostelName(e.target.value)}
            className='border p-2 rounded'
          />
          <button onClick={handleSearch} className='bg-blue-500 text-white p-2 rounded ml-2'>
            Search
          </button>
          <Link to='/Notification' className='ml-4 relative'>
            {/* Display the notification count on the icon */}
            <i className='fas fa-bell text-white text-xl cursor-pointer'></i>
            {notifications.length > 0 && (
              <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2'>{notifications.length}</span>
            )}
          </Link>
        </div>
        <div className='lg:hidden' onClick={handleClick}>
          <i className={`${click ? 'fas fa-times' : 'fas fa-bars'} text-white text-2xl cursor-pointer`} />
        </div>
        <ul className={`lg:flex lg:items-center lg:space-x-6 ${click ? 'flex flex-col items-center justify-start absolute top-20 left-0 bg-gray-800 w-full h-[90vh]' : 'hidden lg:flex'}`}>
          <li className='h-20'>
            <Link to='/' className='text-white flex items-center px-4 py-2 h-full hover:border-b-4 hover:border-white' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className='relative' ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className='text-white flex items-center px-4 py-2 h-full hover:border-b-4 hover:border-white'>
              Accounts
            </button>
            {isOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                {isLoggedIn ? (
                  <>
                    <Link to='/Mybookings' className='block px-4 py-2 text-gray-800 hover:bg-gray-100' onClick={closeMobileMenu}>
                      MyBookings
                    </Link>
                    <Link to='/Profile' className='block px-4 py-2 text-gray-800 hover:bg-gray-100' onClick={closeMobileMenu}>
                      My Profile
                    </Link>
                    <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'>
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link to='/login' className='block px-4 py-2 text-gray-800 hover:bg-gray-100' onClick={closeMobileMenu}>
                    Login
                  </Link>
                )}
              </div>
            )}
          </li>
          <li className='h-20'>
            <Link to='/hostels' className='text-white flex items-center px-4 py-2 h-full hover:border-b-4 hover:border-white' onClick={closeMobileMenu}>
              Hostels
            </Link>
          </li>
          {!isLoggedIn && (
            <li className='h-20'>
              <Link to='/login' className='text-white flex items-center px-4 py-2 h-full hover:border-b-4 hover:border-white' onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
