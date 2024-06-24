import React from 'react';
//import './About.css'; // Import custom CSS for font
import LandlordNavbar from './LandloadNavbar';

function AboutUs() {
  return (
    <div>
      <LandlordNavbar/>
   
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-8">
      
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Off-Campus Hostel Booking!</h2>
          <p className="text-gray-800 leading-relaxed">
            We are dedicated to providing students with a convenient and reliable platform for finding accommodation near their universities. Our mission is to simplify the process of finding and booking off-campus housing, making the transition to university life smoother for students.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-800 leading-relaxed">
            With our user-friendly interface and extensive database of available hostels, we aim to connect students with affordable and comfortable living spaces. Whether you're a first-year student or a seasoned university-goer, Off-Campus Hostel Booking is here to help you find your ideal accommodation.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Thank You</h2>
          <p className="text-gray-800 leading-relaxed">
            Thank you for choosing Off-Campus Hostel Booking for your housing needs. We look forward to serving you and making your university experience unforgettable!
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AboutUs;