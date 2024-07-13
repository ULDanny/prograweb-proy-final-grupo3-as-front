import React, { useState } from 'react';
import { items } from '../../data/items';

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(items.map((item) => ({...item, quantity: 1 })));
  const [savedItems, setSavedItems] = useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, savedItems, setSavedItems }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };