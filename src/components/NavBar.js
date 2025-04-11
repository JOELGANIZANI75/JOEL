import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from './user';
import { useNotifications } from './Alert'; // Import useNotifications hook

const Navbar = () => {
  const { currentUser, logoutUser } = useUser();
  const { notifications } = useNotifications();
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
  const isLandlordDashboard = location.pathname === '/LandlordDashboard';

  if (isLandlordDashboard) {
    return null; // Return null to hide the navbar on the landlord dashboard
  }
  const isAdminDashboard = location.pathname === '/Admin';

  if (isAdminDashboard) {
    return null; // Return null to hide the navbar on the landlord dashboard
  }
  const isLandlordProfilePage = location.pathname === '/LandlordProfile';

  if (isLandlordProfilePage) {
    return null; // Return null to hide the navbar on the landlord dashboard
  }
  const isAdminProfilePage = location.pathname === '/AdminProfile';

  if (isAdminProfilePage) {
    return null; // Return null to hide the navbar on the landlord dashboard
  }
  return (
   <nav className="bg-white shadow-md sticky top-0 z-50">
  <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center h-20">
    <Link to="/" className="text-blue-600 text-2xl font-bold">
      OCA
    </Link>

    {/* Mobile Menu Icon */}
    <div className="lg:hidden" onClick={handleClick}>
      <i className={`${click ? 'fas fa-times' : 'fas fa-bars'} text-gray-800 text-2xl`} />
    </div>

    {/* Menu Items */}
    <ul className={`lg:flex lg:space-x-6 items-center ${click ? 'block absolute top-20 left-0 w-full bg-white border-t border-gray-200 py-4' : 'hidden lg:flex'}`}>
      <li><Link to="/" className="text-gray-800 hover:text-blue-600 px-4 py-2 block">Home</Link></li>
      <li className="relative" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-blue-600 px-4 py-2 block">
          Accounts
        </button>
        {isOpen && (
          <div className="absolute mt-2 w-48 bg-white shadow-lg border rounded z-50 right-0">
            {isLoggedIn ? (
              <>
                <Link to="/Mybookings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">MyBookings</Link>
                <Link to="/Profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Log Out</button>
              </>
            ) : (
              <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>
            )}
          </div>
        )}
      </li>
      <li><Link to="/hostels" className="text-gray-800 hover:text-blue-600 px-4 py-2 block">Hostels</Link></li>
      {!isLoggedIn && (
        <li><Link to="/login" className="text-gray-800 hover:text-blue-600 px-4 py-2 block">Login</Link></li>
      )}
    </ul>

    {/* Right side icons */}
    <div className="hidden lg:flex items-center space-x-4">
      <Link to="/Notification" className="relative">
        <i className="fas fa-bell text-xl text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
            {notifications.length}
          </span>
        )}
      </Link>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search hostels"
          value={hostelName}
          onChange={(e) => setHostelName(e.target.value)}
          className="border rounded-l px-3 py-2 w-40"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition">
          Search
        </button>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
