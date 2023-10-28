import React from 'react';
import './ReviewsUser.css';

export default function ReviewCard({ rating, comment }) {
  return (
    <div className="card-container">
      <div className="review-item">
        <div className="details">
          <p className="rating">⭐{rating}</p>
          <p className="comment">{comment}</p>
        </div>
      </div>
    </div>
  );
}