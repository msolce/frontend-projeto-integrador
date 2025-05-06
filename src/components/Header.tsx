// src/components/Header.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Meu App</h1>
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/form">Formulário</Link>
        <Link to="/admin">Admin</Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
