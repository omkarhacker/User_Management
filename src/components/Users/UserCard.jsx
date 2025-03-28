import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../services/api';
import UserForm from './UserForm';

const UserCard = ({ user, onUserUpdated, onUserDeleted }) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      onUserDeleted(user.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = (updatedUser) => {
    onUserUpdated(updatedUser);
    setEditMode(false);
  };

  const handleViewDetails = () => {
    navigate(`/users/${user.id}`);
  };

  if (editMode) {
    return (
      <UserForm
        user={user}
        onSave={handleUpdate}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleViewDetails}
    >
      <div className="flex flex-col items-center mb-4">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="rounded-full w-24 h-24 mb-4"
        />
        <h5 className="text-lg font-bold text-center">
          {user.first_name} {user.last_name}
        </h5>
        <p className="text-gray-500 text-center">{user.email}</p>
        {error && (
          <div className="mt-2 text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          title="Edit"
          onClick={(e) => {
            e.stopPropagation();
            setEditMode(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12H3m12 0l4.293-4.293a1 1 0 011.414 0l2.293 2.293a1 1 0 010 1.414L12 21l-4 1 1-4L20.293 7.707a1 1 0 00-1.414-1.414L15 12z"
            />
          </svg>
          Edit
        </button>
        <button
          className="flex items-center text-red-500 hover:text-red-700 transition-colors"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
