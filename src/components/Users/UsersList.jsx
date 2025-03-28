import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUsers } from '../../services/api';
import UserCard from './UserCard';
import Pagination from '../Shared/Pagination';

const UsersList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAllPages, setSearchAllPages] = useState(false);

  // Fetch all users when component mounts or searchAllPages changes
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const page1 = await getUsers(1);
        const page2 = await getUsers(2);
        const combinedUsers = [...page1.data, ...page2.data];
        setAllUsers(combinedUsers);
        setTotalPages(page1.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch current page users when pagination changes
  useEffect(() => {
    if (!searchAllPages) {
      const fetchPageUsers = async () => {
        try {
          setLoading(true);
          const data = await getUsers(currentPage);
          setCurrentPageUsers(data.data);
          setError('');
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchPageUsers();
    }
  }, [currentPage, searchAllPages]);

  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  const handleUserUpdated = (updatedUser) => {
    setAllUsers(allUsers.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setCurrentPageUsers(currentPageUsers.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleUserDeleted = (userId) => {
    setAllUsers(allUsers.filter(user => user.id !== userId));
    setCurrentPageUsers(currentPageUsers.filter(user => user.id !== userId));
  };

  // Determine which users to display based on search mode
  const getDisplayUsers = () => {
    const usersToFilter = searchAllPages ? allUsers : currentPageUsers;
    
    if (searchTerm.trim() === '') {
      return usersToFilter;
    }

    return usersToFilter.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const displayUsers = getDisplayUsers();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Users List</h1>
      
      <div className="flex items-center mb-6 gap-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder={searchAllPages ? "Search across all pages..." : "Search current page..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="searchAllPages" className="flex items-center cursor-pointer">
    <div className="relative">
      <input
        id="searchAllPages"
        type="checkbox"
        checked={searchAllPages}
        onChange={(e) => setSearchAllPages(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`block w-14 h-8 rounded-full ${
          searchAllPages ? "bg-blue-600" : "bg-gray-300"
        }`}
      ></div>
      <div
        className={`dot absolute left-1 top-1 w-6 h-6 rounded-full bg-white transition-transform ${
          searchAllPages ? "transform translate-x-6" : ""
        }`}
      ></div>
    </div>
    <span className="ml-3 text-gray-700">Search All Pages</span>
  </label>
      </div>
      
      {error && (
        <div className="bg-red-200 text-red-800 p-4 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center mt-8">
          <div className="animate-spin h-10 w-10 border-4 border-t-4 border-gray-200 rounded-full"></div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-lg">
            {searchAllPages ? (
              `Showing ${displayUsers.length} matching users from all pages`
            ) : (
              `Page ${currentPage} (${displayUsers.length} of ${currentPageUsers.length} users shown)`
            )}
          </p>
          
          {displayUsers.length === 0 ? (
            <p className="mt-6">
              {searchTerm.trim() === '' ? (
                "No users found"
              ) : (
                searchAllPages ? (
                  "No matching users found across all pages"
                ) : (
                  "No matching users found on this page"
                )
              )}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onUserUpdated={handleUserUpdated}
                  onUserDeleted={handleUserDeleted}
                />
              ))}
            </div>
          )}
          
          {!searchAllPages && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UsersList;
