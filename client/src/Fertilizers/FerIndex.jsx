import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

// ✅ Get initial cart state (Handles corrupt data safely)
const getInitialCartState = () => {
  try {
    return {
      items: JSON.parse(localStorage.getItem("carts")) || [],
      statusTab: false,
    };
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return { items: [], statusTab: false };
  }
};

// ✅ Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { productId, name, price, image, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.productId === productId);

      const updatedItems =
        existingItemIndex >= 0
          ? state.items.map((item, index) =>
              index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
            )
          : [...state.items, { productId, name, price, image, quantity }];

      return { ...state, items: updatedItems };
    }

    case "CHANGE_QUANTITY": {
      const { productId, quantity } = action.payload;

      // ✅ Remove item if quantity is 0
      const updatedItems =
        quantity > 0
          ? state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            )
          : state.items.filter((item) => item.productId !== productId);

      return { ...state, items: updatedItems };
    }

    case "REMOVE_FROM_CART":
      return { ...state, items: state.items.filter((item) => item.productId !== action.payload) };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_STATUS_TAB":
      return { ...state, statusTab: !state.statusTab };

    default:
      return state;
  }
};

// ✅ Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialCartState);

  // ✅ Sync state with localStorage (only when `items` change)
  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook for Cart
export const useCart = () => useContext(CartContext);
