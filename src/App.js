import React from 'react';
import Navbar from './components/NavBar';
import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingPage from './components/BookingPage';
import Hostels from './components/Hostels';
import Login from './components/Login';
import Accounts from './components/Accounts';
import About from './components/About'; 
import Contacts from './components/contacts'; 
import Privacy from './components/PrivacyAndPolicy'; 
import Help from './components/Help';
import NotificationPage from './components/Notification';
import ProfilePage from './components/Profile';
import Mybookings from './components/Mybookings';
//import AdminDashboard from './components/AdminDashboard';
import LandlordDashboard from './components/LandlordDashboard';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Mybookings" element={<Mybookings />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path='/Hostels' element={<Hostels />} />
          <Route path='/Accounts' element={<Accounts />} />
          <Route path='/Login' element={<Login />} />
          <Route path="/About" element={<About />} />
          <Route path="/PrivacyAndPolicy" element={<Privacy />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Notification" element={<NotificationPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/LandlordDashboard" element={<LandlordDashboard />} />
          {/*<Route path="/AdminDashboard" element={<AdminDashboard />} />*/}
        </Routes>
      </Router>
    </>
  );
}

export default App;