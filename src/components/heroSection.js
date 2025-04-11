import React from 'react';
import { useUser } from './user';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { currentUser } = useUser();

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-100">
      {/* Background Image */}
      <img
        src="/images/IMG_20230209_123354_017.jpg"
        alt="A beautiful scenery representing off-campus accommodation"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-white text-center max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Find Your Perfect Off-Campus Accommodation Easily
        </h1>
        <p className="mt-6 text-lg md:text-xl">
          Browse and book the best student hostels and apartments near the campus.
        </p>

        {!currentUser && (
          <div className="mt-10">
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-full transition duration-300">
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
