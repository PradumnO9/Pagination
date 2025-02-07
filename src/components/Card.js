import React from 'react';
import './Card.css';

const Card = ({ product }) => {

    const { thumbnail, title, price } = product;

  return (
    <div className='product'>
      <img className='product-img' src={thumbnail} alt={title} />
      <h2>{title}</h2>
      <p>Price: ${price}</p>
    </div>
  )
}

export default Card
