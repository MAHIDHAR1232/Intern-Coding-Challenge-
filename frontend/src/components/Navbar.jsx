import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="font-bold text-lg">
        <Link to="/stores">Store Rating</Link>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.name} ({user.role})</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
} 