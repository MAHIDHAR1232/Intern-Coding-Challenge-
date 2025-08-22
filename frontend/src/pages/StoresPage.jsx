import React, { useEffect, useState } from 'react';
import StoreCard from '../components/StoreCard';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStoresAndRatings = async () => {
      setLoading(true);
      try {
        const storesRes = await api.get('/stores');
        setStores(storesRes.data.stores || []);
        if (token) {
          const ratingsRes = await api.get('/ratings/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserRatings(ratingsRes.data.ratings || []);
        } else {
          setUserRatings([]);
        }
      } catch (err) {
        setStores([]);
        setUserRatings([]);
      }
      setLoading(false);
    };
    fetchStoresAndRatings();
  }, [token]);

  const handleSubmitRating = async (storeId, rating, comment) => {
    try {
      await api.post('/ratings', { storeId, rating, comment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh ratings
      const ratingsRes = await api.get('/ratings/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserRatings(ratingsRes.data.ratings || []);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit rating');
    }
  };

  const handleUpdateRating = async (storeId, rating, comment) => {
    try {
      const userRating = userRatings.find(r => r.storeId === storeId);
      if (!userRating) return;
      await api.put(`/ratings/${userRating.id}`, { rating, comment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh ratings
      const ratingsRes = await api.get('/ratings/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserRatings(ratingsRes.data.ratings || []);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update rating');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stores</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : stores.length === 0 ? (
        <div className="text-center text-gray-500">No stores found.</div>
      ) : (
        stores.map(store => {
          const userRating = userRatings.find(r => r.storeId === store.id);
          return (
            <StoreCard
              key={store.id}
              store={store}
              userRating={userRating}
              onSubmitRating={handleSubmitRating}
              onUpdateRating={handleUpdateRating}
            />
          );
        })
      )}
    </div>
  );
} 