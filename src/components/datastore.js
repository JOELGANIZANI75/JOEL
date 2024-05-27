import { useState } from 'react';


export const useDataStore = () => {
  const [hostelNames, setHostelNames] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [amountsOfRooms, setAmountsOfRooms] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [distances, setDistances] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  return {
    hostelNames, setHostelNames,
    roomTypes, setRoomTypes,
    amountsOfRooms, setAmountsOfRooms,
    amounts, setAmounts,
    distances, setDistances,
    imagesList, setImagesList,
  };
};
