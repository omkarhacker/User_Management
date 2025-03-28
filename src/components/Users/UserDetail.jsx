import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/api';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // Note: The reqres.in API doesn't have a direct endpoint for single user
        // So we fetch all users and filter by ID
        const response = await getUsers(1); // Get first page
        const allUsers = response.data;
        
        // Also check page 2 since the API has 6 users per page
        const response2 = await getUsers(2);
        const allUsers2 = response2.data;
        
        const combinedUsers = [...allUsers, ...allUsers2];
        const foundUser = combinedUsers.find(u => u.id === parseInt(id));
        
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mx-2">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <h6 className="text-lg font-semibold mt-4 mx-2">
        User not found
      </h6>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-center mb-6">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="rounded-full w-36 h-36"
        />
      </div>
      <h4 className="text-3xl font-semibold text-center mb-6">
        {user.first_name} {user.last_name}
      </h4>
      <div className="mt-6">
        <h6 className="text-xl font-medium mb-2">User Information</h6>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-6 w-full"
        onClick={() => navigate('/users')}
      >
        Back to Users List
      </button>
    </div>
  );
};

export default UserDetail;
