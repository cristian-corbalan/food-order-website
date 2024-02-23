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

  if (action.type === 'UPDATE_QUANTITY') {
    const { id, amount } = action.payload;

    const updatedItems = [...state];
    const updatedItemIndex = updatedItems.findIndex(item => item.id === id);
    const updatedItem = { ...updatedItems[updatedItemIndex] };

    updatedItem.quantity += amount;

    if (updatedItem.quantity === 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return updatedItems;
  }

  return updatedItems;
}

export default function CartContextProvider ({ children, meals }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  function handleAddItemToCart (id) {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: id
    });
  }

  function handleUpdateCartItemQuantity (id, amount) {
    cartDispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, amount }
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
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    getCartTotal: getTotal,
    getCartQuantity: getQuantity
  };

  return (
    <CartContext.Provider value={defaultContext}>
      {children}
    </CartContext.Provider>
  );
}
