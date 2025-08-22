import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminSidebar() {
  return (
    <div className="h-full w-56 bg-gray-800 text-white flex flex-col py-6 px-2">
      <div className="font-bold text-xl mb-8 text-center">Admin Panel</div>
      <NavLink to="/dashboard" className={({isActive}) => isActive ? 'bg-gray-700 px-4 py-2 rounded mb-2' : 'px-4 py-2 mb-2 rounded hover:bg-gray-700'}>Dashboard</NavLink>
      <NavLink to="/admin/users" className={({isActive}) => isActive ? 'bg-gray-700 px-4 py-2 rounded mb-2' : 'px-4 py-2 mb-2 rounded hover:bg-gray-700'}>Manage Users</NavLink>
      <NavLink to="/admin/stores" className={({isActive}) => isActive ? 'bg-gray-700 px-4 py-2 rounded mb-2' : 'px-4 py-2 mb-2 rounded hover:bg-gray-700'}>Manage Stores</NavLink>
      <NavLink to="/admin/add-user" className={({isActive}) => isActive ? 'bg-gray-700 px-4 py-2 rounded mb-2' : 'px-4 py-2 mb-2 rounded hover:bg-gray-700'}>Add User</NavLink>
      <NavLink to="/admin/add-store" className={({isActive}) => isActive ? 'bg-gray-700 px-4 py-2 rounded mb-2' : 'px-4 py-2 mb-2 rounded hover:bg-gray-700'}>Add Store</NavLink>
      <NavLink to="/login" className="mt-auto px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-center">Logout</NavLink>
    </div>
  );
} 