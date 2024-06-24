import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='bg-gray-900 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-white text-2xl'>OFF CAMPUS ACCOMMODATION</h1>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-center space-x-8'>
          <Link to="/About_Us" className='text-white hover:text-gray-300'>
            About
          </Link>
          <Link to="/contactUs" className='text-white hover:text-gray-300'>
            Contacts
          </Link>
          <Link to="/Privancy&Policy" className='text-white hover:text-gray-300'>
            Privacy
          </Link>
          <Link to="/Help_us" className='text-white hover:text-gray-300'>
            Help
          </Link>
        </div>
        <div className='mt-10 flex justify-between items-center'>
          <Link className='text-white flex items-center'>
            <span className='text-xl font-semibold mr-2'>OCA</span>
            <i className='fab fa-typo3 text-2xl' />
          </Link>
          <small className='text-gray-300'>OFF CAMPUS ACCOMMODATION © 2024</small>
          <div className='flex space-x-4'>
            <a href='https://www.facebook.com/' className='text-white hover:text-gray-300'>
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href='/' className='text-white hover:text-gray-300'>
              <i className='fab fa-whatsapp'></i>
            </a>
            <a href='https://www.youtube.com/' className='text-white hover:text-gray-300'>
              <i className='fab fa-youtube'></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;