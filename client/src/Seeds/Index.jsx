import React, { createContext, useContext, useReducer, useEffect, useState } from "react";

const CartContext = createContext();

// ✅ Safe Initial Cart State with LocalStorage
const getInitialCartState = () => {
  try {
    return {
      items: JSON.parse(localStorage.getItem("carts")) || [],
      statusTab: false,
      lastState: null, // For Undo Functionality
    };
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return { items: [], statusTab: false, lastState: null };
  }
};

// ✅ Reducer Function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { productId, name, price, image, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      const updatedItems = existingItem
        ? state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(item.quantity + quantity, 99) } // Prevent excessive quantity
              : item
          )
        : [...state.items, { productId, name, price, image, quantity }];

      return { ...state, items: updatedItems, lastState: state.items };
    }

    case "CHANGE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((item) => item.productId !== productId), lastState: state.items };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
        lastState: state.items,
      };
    }

    case "REMOVE_FROM_CART":
      return { ...state, items: state.items.filter((item) => item.productId !== action.payload), lastState: state.items };

    case "CLEAR_CART":
      return { ...state, lastState: state.items, items: [] };

    case "TOGGLE_STATUS_TAB":
      return { ...state, statusTab: !state.statusTab };

    case "UNDO_LAST_ACTION":
      return state.lastState ? { ...state, items: state.lastState, lastState: null } : state;

    default:
      return state;
  }
};

// ✅ Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialCartState());
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ Calculate Subtotal
  useEffect(() => {
    setTotalPrice(state.items.reduce((total, item) => total + item.price * item.quantity, 0));
  }, [state.items]);

  // ✅ Sync cart with LocalStorage efficiently
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook for Cart Access
export const useCart = () => useContext(CartContext);
