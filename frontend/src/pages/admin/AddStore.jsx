import React, { useState } from 'react';
import api from '../../services/api';

export default function AdminAddStore() {
  const [form, setForm] = useState({ name: '', address: '', description: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await api.post('/stores', form);
      setSuccess('Store added successfully!');
      setForm({ name: '', address: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add store');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Store</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input className="w-full mb-3 p-2 border rounded" name="name" placeholder="Store Name" value={form.name} onChange={handleChange} required />
        <input className="w-full mb-3 p-2 border rounded" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <textarea className="w-full mb-3 p-2 border rounded" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Store</button>
      </form>
    </div>
  );
} 