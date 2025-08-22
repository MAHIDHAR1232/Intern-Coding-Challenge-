import React, { useState } from 'react';
import RatingStars from './RatingStars';

export default function StoreCard({ store, userRating, onSubmitRating, onUpdateRating }) {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(userRating ? userRating.rating : 0);
  const [comment, setComment] = useState(userRating ? userRating.comment : '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (rating < 1 || rating > 5) {
      setError('Please select a rating between 1 and 5.');
      return;
    }
    if (userRating) {
      onUpdateRating(store.id, rating, comment);
    } else {
      onSubmitRating(store.id, rating, comment);
    }
    setShowForm(false);
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      <h2 className="text-lg font-bold">{store.name}</h2>
      <p className="text-gray-600">{store.address}</p>
      <div className="flex items-center mb-2">
        <span className="mr-2 text-sm text-gray-500">Overall Rating:</span>
        <RatingStars value={store.averageRating || 0} />
        <span className="ml-2 text-xs text-gray-400">({store.ratingCount || 0} ratings)</span>
      </div>
      {userRating ? (
        <div className="mb-2">
          <span className="text-green-600 font-semibold">Your Rating:</span>
          <RatingStars value={userRating.rating} />
          <button
            className="ml-4 text-blue-600 hover:underline text-sm"
            onClick={() => setShowForm((v) => !v)}
          >
            Modify
          </button>
        </div>
      ) : (
        <button
          className="text-blue-600 hover:underline text-sm mb-2"
          onClick={() => setShowForm((v) => !v)}
        >
          Submit Rating
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-2 bg-gray-50 p-2 rounded">
          <div className="flex items-center mb-2">
            {[1,2,3,4,5].map(i => (
              <button
                type="button"
                key={i}
                className={i <= rating ? 'text-yellow-400 text-2xl' : 'text-gray-300 text-2xl'}
                onClick={() => setRating(i)}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Optional comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded mr-2">{userRating ? 'Update' : 'Submit'}</button>
          <button type="button" className="text-gray-500" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
} 