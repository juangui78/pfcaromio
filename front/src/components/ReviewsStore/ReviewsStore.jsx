import React, { useState } from 'react';
import './ReviewsStore.css'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import Swal from 'sweetalert2';
const ReviewsStore = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  


  const handleStarClick = (value) => {
    setRating(value);

  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);

  };

  const handleSubmit = (event) => {
    //console.log(inputs.comment);
    //console.log(inputs.rating);
  // backend
  
    event.preventDefault()
        // Se valida que no haya ningun error en el form
      if (comment.length != 0) {
        //console.log("se envia la info")
        //console.log(hasErrors)
        Swal.fire({
          title: 'Enviado.',
          icon: 'success',
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
    <div className="ReviewsContainer">
      <h1>¡Califica Esta Pizzería!</h1>
      <form onSubmit={handleSubmit} action=''>
      <div className='ratingSelect'>
        <label htmlFor="rating" className='text'>Selecciona una calificación:</label>
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
      <span className='rating'>{rating}</span>
      </div>
      <div className="commentContainer">
        <label htmlFor="comment" className='text' >Deja un comentario:</label>
        <textarea id="comment" value={comment} rows="4" onChange={handleCommentChange}></textarea>
      </div>
      <div className='buttonContainer'>
        <button type="submit">Enviar Reseña</button>
      </div>
      </form>
    </div>
    
  );
};

export default ReviewsStore;