import React from 'react';

import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingPage from './components/BookingPage';
import Hostels from './components/Hostels';
import Login from './components/Login';
import Accounts from './components/Accounts';
import About from './components/About'; 
import AboutUs from './components/About_us'; 
import Contacts from './components/contacts'; 
import ContactUs from './components/ContactUs'; 
import PrivacyPolicy from './components/Privancy&Policy'; 
import Privacy from './components/PrivacyAndPolicy'; 
import Help from './components/Help';
import Help_us from './components/Help_us';
import NotificationPage from './components/Notification';
import ProfilePage from './components/Profile';
import LandlordProfilePage from './components/LandlordProfile';
import AdminProfilePage from './components/AdminProfile';
import Mybookings from './components/Mybookings';
import AdminDashboard from './components/Admin';
import LandlordDashboard from './components/LandlordDashboard';
import { HostelProvider } from './components/HostelContext';
import AddHostel from './components/AddHostel';
import MyHostels from './components/MyHostels';

function App() {
  return (
    <>
      <HostelProvider>
      <Router>
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Mybookings" element={<Mybookings />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path='/Hostels' element={<Hostels />} />
          <Route path='/Accounts' element={<Accounts />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/MyHostels' element={<MyHostels />} />
          <Route path="/About_us" element={<AboutUs />} />
          <Route path="/About" element={<About />} />
          <Route path="/PrivacyAndPolicy" element={<Privacy />} />
          <Route path="/Privancy&Policy" element={<PrivacyPolicy />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Help_us" element={<Help_us />} />
          <Route path="/Notification" element={<NotificationPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/AddHostel" element={<AddHostel />} />
          <Route path="/LandlordProfile" element={<LandlordProfilePage />} />
          <Route path="/AdminProfile" element={<AdminProfilePage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/LandlordDashboard" element={<LandlordDashboard />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
      </HostelProvider>
    </>
  );
}

export default App;
