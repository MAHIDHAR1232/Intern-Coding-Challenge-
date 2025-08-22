import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ userCount: 0, storeCount: 0, ratingCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await api.get('/users/dashboard');
        setStats(res.data);
      } catch {
        setStats({ userCount: 0, storeCount: 0, ratingCount: 0 });
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.userCount}</div>
            <div className="text-gray-600 mt-2">Total Users</div>
          </div>
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.storeCount}</div>
            <div className="text-gray-600 mt-2">Total Stores</div>
          </div>
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600">{stats.ratingCount}</div>
            <div className="text-gray-600 mt-2">Total Ratings</div>
          </div>
        </div>
      )}
    </div>
  );
} 