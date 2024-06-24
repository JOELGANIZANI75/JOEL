import React from 'react';
import { Link } from 'react-router-dom';
import LandlordNavbar from './LandloadNavbar';
function Help_us() {
  return (
<div>
  <LandlordNavbar/>

    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Help</h1>
        <div className="mb-6">
          <p className="text-gray-800 leading-relaxed">
          Off-campus hostel booking can feel overwhelming. Whether you're new to renting or just starting university,
          finding the right place takes some effort. Looking for housing off-campus offers lots of choices. You could find a cozy
          apartment in a quiet area or a busy dorm with lots of people. Think about how close you want to be to school, what things you need, and how much you can spend.
          Booking a hostel isn't just about getting a place to sleep.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-800 font-size-26 leading-relaxed">
          It's about creating a place where you can grow and meet people.
          Whether you like studying alone or being around others, there's something for you.
          There are lots of websites and apps to help you find housing. They let you search for what you want, take virtual tours, and read reviews from other students. You can also ask people who live there or used to live there what it's like.
          Remember, finding the right place isn't just about sleep. It's about finding a place where you can do well in school, make friends, and enjoy yourself. So, be patient and positive as you look for your new home away from home.
          </p>
        </div>
        <div className="mb-6">
        <p className="text-gray-800 leading-relaxed">
          For more information, contact us:
          </p>
          <Link to="/ContactUs">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4">
              Contacts
            </button>
          </Link>
          </div>
        
      </div>
    </div>
    </div>
    
  );
}

export default Help_us;