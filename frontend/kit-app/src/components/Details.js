import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/details.css';

const Details = (props) => {

console.log(props)
  
  const location = useLocation();
  const navigate = useNavigate();
  const { jersey } = location.state || {};

  console.log(' details of  Jersey displayed:', jersey); // Log the jersey object


  const handleAddToCart = async () => {
    try {
      if (!jersey) {
        console.error('Jersey object is undefined');
        return;
      }
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:3009/auth/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          jerseyId: jersey._id,
          quantity: 1,
          image: jersey.Image, // Pass the image
          type: jersey.type, // Pass the type
          rating: jersey.rating, // Pass the rating
          price : jersey.price
        }),
      });
  
      // Log request body
      console.log('Request body:', JSON.stringify({
        userId: userId,
        jerseyId: jersey._id,
        quantity: 1,
        image: jersey.Image,
        type: jersey.type,
        rating: jersey.rating,
        price : jersey.price
      }));
  
      if (response.ok) {
        alert('Item added to cart successfully');
      } else {
        // Log error response
        console.error('Error adding item to cart1:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding item to cart2:', error.message);
    }
  };
   
  
  return (
    <div className="jersey-details">
      <img src={jersey?.Image} alt={jersey?.club} />
      <h2>{jersey?.club}</h2>
      <p>Type: {jersey?.type}</p>
      <p>Rating: {jersey?.rating}</p>
      <p>Price: ${jersey?.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Details;
