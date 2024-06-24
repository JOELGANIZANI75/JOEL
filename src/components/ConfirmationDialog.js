import React, { useState } from 'react';

const ConfirmationDialog = ({ isOpen,user, onDelete, onCancel  }) => {
    if (!isOpen) return null;
  
    
    const [isDeleted, setIsDeleted] = useState(false);
  
    const handleConfirm = () => {
      onDelete(user); // Call the onDelete function passed from the parent component
      setIsDeleted(true);
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg">
          {isDeleted ? (
            <p>User account has been successfully deleted.</p>
          ) : (
            <>
              <p>Are you sure you want to delete this user </p>
              <div className="flex justify-end mt-4">
                <button onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Cancel</button>
                <button onClick={handleConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
              </div>
            </>
          )}
          
        </div>
      </div>
    );
  };

export default ConfirmationDialog;