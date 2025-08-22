import React from 'react';
import AdminSidebar from './Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100">
        {children}
      </div>
    </div>
  );
} 