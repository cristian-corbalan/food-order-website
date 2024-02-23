import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {}
});

function cartReducer (state, action) {
  const updatedItems = [...state];

  if (action.type === 'ADD_ITEM') {
    const existingCartItemIndex = state.findIndex(item => item.id === action.payload);
    const existingCartItem = state[existingCartItemIndex];
    console.log('=>(cart-context.jsx:14) existingCartItem', existingCartItem);

    if (existingCartItem) {
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity++
      };
    } else {
      updatedItems.push({
        id: action.payload,
        quantity: 1
      });
    }
  }

  console.log(updatedItems);
  return updatedItems;
}

export default function CartContextProvider ({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  function handleAddToCart (id) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: id
    });
  }

  const defaultContext = {
    cartItems: cartState,
    addItemToCart: handleAddToCart
  };

  return (
    <CartContext.Provider value={defaultContext}>
      {children}
    </CartContext.Provider>
  );
}
