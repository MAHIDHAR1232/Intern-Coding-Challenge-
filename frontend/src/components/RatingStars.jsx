import React from 'react';
export default function RatingStars({ value }) {
  return (
    <div className="flex">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= value ? 'text-yellow-400' : 'text-gray-300'}>★</span>
      ))}
    </div>
  );
} 