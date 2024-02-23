import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  getCartQuantity: () => {},
  getCartTotal: () => {},
  getCartItems: () => {},
  resetCart: () => {}
});

function cartReducer (state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state];
    const existingCartItemIndex = updatedItems.findIndex(item => item.id === action.payload);
    const existingCartItem = updatedItems[existingCartItemIndex];

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

    return updatedItems;
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

  if (action.type === 'RESET') {
    return [];
  }
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

  function handleResetCart () {
    cartDispatch({
      type: 'RESET'
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

  function getItems () {
    return cartState.map(item => {
      const { name, price } = meals.find(meal => meal.id === item.id);
      return {
        name,
        price,
        id: item.id,
        quantity: item.quantity
      };
    });
  }

  const defaultContext = {
    cartItems: cartState,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    resetCart: handleResetCart,
    getCartTotal: getTotal,
    getCartQuantity: getQuantity,
    getCartItems: getItems
  };

  return (
    <CartContext.Provider value={defaultContext}>
      {children}
    </CartContext.Provider>
  );
}
