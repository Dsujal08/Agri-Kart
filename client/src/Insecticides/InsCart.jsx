import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [statusTab, setStatusTab] = useState(false);

  // ✅ Get total quantity of all items
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  // ✅ Load cart data on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("carts");
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("❌ Error loading cart from localStorage:", error);
    }
  }, []);

  // ✅ Sync cart data with localStorage whenever `items` change
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(items));
  }, [items]);

  // ✅ Add or update item in the cart
  const addToCart = (product) => {
    setItems((prevItems) => {
      const updatedCart = [...prevItems];
      const itemIndex = updatedCart.findIndex((item) => item.productId === product.productId);

      if (itemIndex !== -1) {
        // If item exists, update quantity
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity + product.quantity,
        };
      } else {
        // If item does not exist, add to cart
        updatedCart.push({ ...product, quantity: Math.max(1, product.quantity) });
      }

      return updatedCart;
    });
  };

  // ✅ Change quantity of an item or remove it if quantity is 0
  const changeQuantity = (productId, quantity) => {
    setItems((prevItems) => {
      return quantity > 0
        ? prevItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
        : prevItems.filter((item) => item.productId !== productId);
    });
  };

  // ✅ Remove an item completely
  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  // ✅ Clear the entire cart
  const clearCart = () => {
    setItems([]);
  };

  // ✅ Toggle cart visibility
  const toggleStatusTab = () => setStatusTab((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
        statusTab,
        toggleStatusTab,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
