import React from 'react';


import Landlord from './Landlord'
import Footer from './Lfooter';
import LandlordNavbar from './LandloadNavbar';
//import Cards from './cards';
function LandlordDashboard() {
  return (
    <>
      <LandlordNavbar />
      <Landlord />
      
      <Footer />
    </>
  );
}

export default LandlordDashboard;