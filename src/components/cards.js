import React from 'react';
import './cards.css';
import CardItem from './carditem';

function Cards() {
  return (
    <div className='cards'>
      <h1>OFF CAMPUS ACCOMODATION</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/picture.jpg'
              text='Explore hostels of your choice'
              label='Appreciate'
              path='/services'
            />
            <CardItem
              src='images/room.webp'
              text='Book hostels of your choice'
              label='Enjoy the luxury'
              path='/services'
            />
          </ul>
           
        </div>
      </div>
    </div>
  );
}

export default Cards;