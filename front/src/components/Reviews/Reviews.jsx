import React, { useState } from 'react';
import './Reviews.css'
import { Form } from 'react-router-dom';
import Swal from 'sweetalert2';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';
const { userId } = useAuth();
const { storeId } = useParams();

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    // backend
    event.preventDefault()
    console.log(comment);
    const { userId } = useAuth();
    if (comment.length != 0) {
      Swal.fire({
        title: 'Enviado.',
        icon: 'success'
        
    })
      setComment("");
      setRating(0);
    } else {
        Swal.fire({
            title: 'Error. Se debe llenar los campos para enviar la reseña',
            icon: 'error',
        })
    }
  };

  return (
    <div className="ReviewsContainerProduct">

      <form onSubmit={handleSubmit} action=''>
      <div className='ratingSelect'>
        <label htmlFor="rating" className='text'>¿Que calificación le pondrías a esta pizza?</label>
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
        <label htmlFor="comment" className='text'>Deja un comentario:</label>
        <textarea id="comment" value={comment} onChange={handleCommentChange}></textarea>
      </div>
      <div className='buttonContainer'>
        <button type="submit">Enviar Reseña</button>
      </div>
      </form>
    </div>
  );
};

export default Reviews;