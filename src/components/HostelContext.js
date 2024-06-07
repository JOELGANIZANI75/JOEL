import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const HostelContext = createContext();

// Create the provider component
export const HostelProvider = ({ children }) => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      const savedHostels = localStorage.getItem('hostels');
      const hostelsData = savedHostels ? JSON.parse(savedHostels) : [];
      // Fetch data from API or database here if needed
      setHostels(hostelsData);
      setLoading(false);
    };
    fetchHostels();
  }, []);

  useEffect(() => {
    localStorage.setItem('hostels', JSON.stringify(hostels));
  }, [hostels]);

  const addHostel = (hostel) => {
    const existingHostel = hostels.find(h => h.name === hostel.name);
    if (!existingHostel) {
      setHostels([...hostels, hostel]);
    }
  };

  const deleteHostel = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this hostel?');
    if (confirmDelete) {
      setHostels(hostels.filter((_, i) => i !== index));
    }
  };

  return (
    <HostelContext.Provider value={{ hostels, loading, addHostel, deleteHostel }}>
      {children}
    </HostelContext.Provider>
  );
};

// Custom hook to use the HostelContext
export const useHostels = () => {
  return useContext(HostelContext);
};
