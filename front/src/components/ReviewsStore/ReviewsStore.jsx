import React, { useState } from 'react';
import './ReviewsStore.css'

const ReviewsStore = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
  // backend
  };

  return (
    <div className="ReviewsContainer">
      <h1>¡Califica Nuestras Pizzerías!</h1>
      <button onClick={handleSubmit}>Añadir Reseña</button>
      <div className='ratingSelect'>
        <label htmlFor="rating" className='text'>Selecciona la calificación:</label>
        {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleStarClick(value)}
          style={{ cursor: 'pointer', marginRight: '8px' }}
          className='star'
        >
          {value <= rating ? '★' : '☆'}
        </span>
      ))}
      <span>{rating}</span>
      </div>
      <div className="commentContainer">
        <label htmlFor="comment" className='text'>Añade un comentario:</label>
        <textarea id="comment" value={comment} onChange={handleCommentChange}></textarea>
      </div>
    </div>
  );
};

export default ReviewsStore;