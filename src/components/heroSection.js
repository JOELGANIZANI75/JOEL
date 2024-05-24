import React from 'react';
import { useUser } from './user';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { currentUser } = useUser();

  return (
    <div className="relative bg-white-900 h-screen flex flex-col justify-center items-center">
      {/* Background Image */}
      <img
        src="/images/picture.jpg"
        alt="A beautiful scenery representing off-campus accommodation"
        className="absolute inset-0 object-cover w-full h-full"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-6xl">
          Find Your Perfect Off-Campus Accommodation Easily
        </h1>
        <p className="text-white text-lg md:text-2xl mt-4 md:mt-6 lg:mt-8">
          Browse and book the best student hostels and apartments near the campus.
        </p>
        {!currentUser && (
          <div className="mt-8 md:mt-12 lg:mt-16">
            <Link to="/login">
              <button
                className="bg-blue-600 text-white text-lg md:text-xl px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
                aria-label="Get Started"
              >
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;