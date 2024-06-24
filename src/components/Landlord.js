import React from 'react';



const Landlord = () => {


  return (
    <div className="relative bg-white-900 h-screen flex flex-col justify-center items-center">
      {/* Background Image */}
      <img
        src="/images/IMG_20230209_123354_017.jpg"
        alt="A beautiful scenery representing off-campus accommodation"
        className="absolute inset-0 object-cover w-full h-full"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-6xl">
         Welcome back to our site.
        </h1>
        <p className="text-white text-lg md:text-2xl mt-4 md:mt-6 lg:mt-8">
          Browse and appreciate our site and also you can add your hostels by clicking add hostel .
        </p>
        
      </div>
    </div>
  );
}

export default Landlord;