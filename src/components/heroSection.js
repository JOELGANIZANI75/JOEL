// HeroSection.jsx
import React from 'react';
import { useUser } from './user';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { currentUser } = useUser();

  return (
    <div className="relative h-screen bg-white">
      {/* Background Image */}
      <img
        src="/images/IMG_20230209_123354_017.jpg"
        alt="Off-campus accommodation"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-left px-6 py-32">
        <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
          Find Your Perfect Off-Campus Accommodation
        </h1>
        <p className="text-white text-xl md:text-2xl mt-6 max-w-2xl">
          Browse and book the best student hostels and apartments near the campus.
        </p>
        {!currentUser && (
          <div className="mt-10">
            <Link to="/login">
              <button className="bg-blue-600 text-white text-lg px-6 py-3 rounded-full hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
