import React, { useState } from 'react';
import api from '../../services/api';

export default function AdminAddUser() {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/users', form);
      setSuccess('User added successfully!');
      setForm({ name: '', email: '', password: '', address: '', role: 'user' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input className="w-full mb-3 p-2 border rounded" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="w-full mb-3 p-2 border rounded" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="w-full mb-3 p-2 border rounded" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input className="w-full mb-3 p-2 border rounded" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <select className="w-full mb-3 p-2 border rounded" name="role" value={form.role} onChange={handleChange} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="store_owner">Store Owner</option>
        </select>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add User</button>
      </form>
    </div>
  );
} 