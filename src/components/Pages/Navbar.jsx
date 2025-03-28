
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">User Management</h1>
        {token && (
          <div className="flex space-x-4">
            <button
              className="text-white hover:bg-blue-500 px-4 py-2 rounded"
              onClick={() => navigate('/')}
            >
              Home
            </button>
            <button
              className="text-white hover:bg-blue-500 px-4 py-2 rounded"
              onClick={() => navigate('/users')}
            >
              Users
            </button>
            <button
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
