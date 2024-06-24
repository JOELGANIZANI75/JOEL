import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './user';
import LandlordNavbar from './LandloadNavbar';

const LandlordProfilePage = () => {
  const { currentUser, setCurrentUser, deleteUser, updateUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState(currentUser || {});
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Load currentUser from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [setCurrentUser]);

  // Update local storage whenever currentUser changes
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleSave = () => {
    updateUser(userDetails);
    setEditMode(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone, and you will no longer be able to log in.'
    );
    if (confirmDelete) {
      deleteUser(currentUser);
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
      navigate('/Login');
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails({
          ...userDetails,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <LandlordNavbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 p-8">
      <div className="flex flex-col bg-grey-500 items-center mt-10">
        <div
          onClick={handleProfileImageClick}
          className="cursor-pointer flex items-center justify-center rounded-full w-60 h-60 bg-gray-200"
        >
          {userDetails.profileImage ? (
            <img src={userDetails.profileImage} alt="Profile" className="rounded-full w-full h-full" />
          ) : (
            <span className="text-gray-700">Upload Profile</span>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleProfileImageChange}
          accept="image/*"
        />
        <ul className="mt-4 text-lg text-gray-800">
          {editMode ? (
            <>
               <li className="mb-2">
              <strong>First Name: </strong>
              <input
                type="text"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </li>
            <li className="mb-2">
              <strong>Last Name: </strong>
              <input
                type="text"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </li>
            <li className="mb-2">
              <strong>Email: </strong>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </li>
            <li className="mb-2">
              <strong>Date of Birth: </strong>
              <input
                type="text"
                name="dateOfBirth"
                value={userDetails.dateOfBirth}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </li>
            <li className="mb-2">
              <strong>Account Type: </strong>
              <input
                type="text"
                name="accountType"
                value={userDetails.accountType}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </li>
          </>
          ) : (
            <>
            <li className="mb-2"><strong>First Name:</strong> {userDetails.firstName}</li>
            <li className="mb-2"><strong>Last Name:</strong> {userDetails.lastName}</li>
            <li className="mb-2"><strong>Email:</strong> {userDetails.email}</li>
            <li className="mb-2"><strong>Date of Birth:</strong> {userDetails.dateOfBirth}</li>
            <li className="mb-2"><strong>Account Type:</strong> {userDetails.accountType}</li>
          </>
          )}
        </ul>
        <div className="mt-4 flex">
          {editMode ? (
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Save
            </button>
          ) : (
            <button onClick={() => setEditMode(true)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
              Edit
            </button>
          )}
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete Account
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LandlordProfilePage;
