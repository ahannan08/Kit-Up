import { useState, useEffect } from 'react';

const useFetchCart = (userId) => {
  const [cartItems, setCartItems] = useState([]);
  const [userBalance, setUserBalance] = useState(1400);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:3009/api/cart/${userId}`);
        if (response.ok) {
          const data = await response.json();
          const updatedItems = data.cartItems.map(item => ({
            ...item,
            quantity: item.quantity > 0 ? item.quantity : 1, // Ensure at least quantity of 1
            totalPrice: (item.quantity > 0 ? item.quantity : 1) * item.price // Set totalPrice based on quantity and price
          }));
          setCartItems(updatedItems);
          setUserBalance(data.userBalance);
        } else {
          console.error('Failed to fetch cart items:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  return { cartItems, userBalance, loading ,setCartItems};
};

export default useFetchCart;
