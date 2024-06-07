import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const HostelContext = createContext();

// Create the provider component
export const HostelProvider = ({ children }) => {
  const [hostels, setHostels] = useState(() => {
    // Load hostels from local storage if available
    const savedHostels = localStorage.getItem('hostels');
    return savedHostels ? JSON.parse(savedHostels) : [];
  });

  useEffect(() => {
    // Save hostels to local storage whenever the hostels state changes
    localStorage.setItem('hostels', JSON.stringify(hostels));
  }, [hostels]);

  const addHostel = (hostel) => {
    setHostels([...hostels, hostel]);
  };

  const deleteHostel = (index) => {
    setHostels(hostels.filter((_, i) => i !== index));
  };

  return (
    <HostelContext.Provider value={{ hostels, addHostel, deleteHostel }}>
      {children}
    </HostelContext.Provider>
  );
};

// Custom hook to use the HostelContext
export const useHostels = () => {
  return useContext(HostelContext);
};
