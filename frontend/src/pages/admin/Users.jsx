import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const params = {};
        if (filters.name) params.search = filters.name;
        if (filters.email) params.email = filters.email;
        if (filters.address) params.address = filters.address;
        if (filters.role) params.role = filters.role;
        const res = await api.get('/users', { params });
        setUsers(res.data.users || []);
      } catch {
        setUsers([]);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [filters]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input className="p-2 border rounded" placeholder="Name" value={filters.name} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} />
        <input className="p-2 border rounded" placeholder="Email" value={filters.email} onChange={e => setFilters(f => ({ ...f, email: e.target.value }))} />
        <input className="p-2 border rounded" placeholder="Address" value={filters.address} onChange={e => setFilters(f => ({ ...f, address: e.target.value }))} />
        <select className="p-2 border rounded" value={filters.role} onChange={e => setFilters(f => ({ ...f, role: e.target.value }))}>
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select>
      </div>
      {loading ? <div>Loading...</div> : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.address || '-'}</td>
                <td className="p-2 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 