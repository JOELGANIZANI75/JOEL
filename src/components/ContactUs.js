import React from 'react';
//import './About.css'; // Import custom CSS for font
import LandlordNavbar from './LandloadNavbar';

function ContactUs() {
  return (
    <div>
      <LandlordNavbar/>
      
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact us</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">For more infomation contact us on</h2>
          <p className="text-gray-800 leading-relaxed">
             phone no : 0998002436 or
                        089940746
          </p>
        </div>

        <div className="mb-6">
          
          <p className="text-gray-800 leading-relaxed">
           Email: offcampusaccomodation@gmail.com
          </p>
        </div>
        <div className="mb-6">
          
          <p className="text-gray-800 leading-relaxed">
           Whastsapp: 098139811
          </p>
        </div>

        <div className="mb-6">
          
          <p className="text-gray-800 leading-relaxed">
           Tel no: 01820298
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

export default ContactUs;