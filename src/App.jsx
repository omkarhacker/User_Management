
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/Pages/LoginPage';
import UsersPage from './components/Pages/UsersPage';
import Home from './components/Pages/Home';
import Layout from './components/Pages/Layout';
import UserDetail from './components/Users/UserDetail';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;