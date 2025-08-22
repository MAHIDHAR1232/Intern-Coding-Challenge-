import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: '', address: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const params = {};
        if (filters.name) params.search = filters.name;
        if (filters.address) params.address = filters.address;
        const res = await api.get('/stores', { params });
        setStores(res.data.stores || []);
      } catch {
        setStores([]);
      }
      setLoading(false);
    };
    fetchStores();
  }, [filters]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Manage Stores</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input className="p-2 border rounded" placeholder="Name" value={filters.name} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} />
        <input className="p-2 border rounded" placeholder="Address" value={filters.address} onChange={e => setFilters(f => ({ ...f, address: e.target.value }))} />
      </div>
      {loading ? <div>Loading...</div> : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Avg Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id} className="border-t">
                <td className="p-2">{store.name}</td>
                <td className="p-2">{store.address}</td>
                <td className="p-2">{store.averageRating || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 