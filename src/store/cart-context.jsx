import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  getCartQuantity: () => {},
  getCartTotal: () => {}
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

  return updatedItems;
}

export default function CartContextProvider ({ children, meals }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  function handleAddToCart (id) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: id
    });
  }

  function getTotal () {
    return cartState.reduce((total, item) => {
      const meal = meals.find(meal => meal.id === item.id);
      return total + (meal.price * item.quantity);
    }, 0);
  }

  function getQuantity () {
    return cartState.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  const defaultContext = {
    cartItems: cartState,
    addItemToCart: handleAddToCart,
    getCartTotal: getTotal,
    getCartQuantity: getQuantity
  };

  return (
    <CartContext.Provider value={defaultContext}>
      {children}
    </CartContext.Provider>
  );
}
